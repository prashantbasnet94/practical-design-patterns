package main

import (
	"fmt"
	"sync"
	"time"
)

// Scenario: The "Naked Map" Cache
// This simulates the flawed code that caused the OOM.

var (
	// THE PROBLEM: A map grows forever. There is no max size.
	// Even if we "delete" keys, Go maps don't always shrink memory back to OS.
	priceCache = make(map[string]float64)
	mutex      = &sync.RWMutex{}
)

func main() {
	fmt.Println("Starting Pricing Service...")
	fmt.Println("Simulating Traffic Spike...")

	// Simulate 100,000 unique requests
	// In reality, this loop would run forever until OOM.
	for i := 0; i < 100000; i++ {
		userID := fmt.Sprintf("user-%d", i)
		productID := "prod-123"
		coupon := "SAVE20"

		// The Bad Key: High Cardinality
		key := fmt.Sprintf("%s:%s:%s", productID, userID, coupon)

		getPrice(key)

		if i%10000 == 0 {
			fmt.Printf("Processed %d requests. Cache size: %d items\n", i, len(priceCache))
		}
	}
	
	fmt.Println("Final Cache Size:", len(priceCache))
	fmt.Println("Service likely crashed or is using massive RAM.")
}

func getPrice(key string) float64 {
	// 1. Check Local Cache
	mutex.RLock()
	val, exists := priceCache[key]
	mutex.RUnlock()

	if exists {
		return val
	}

	// 2. Simulate Expensive Calculation
	// time.Sleep(10 * time.Millisecond) 
	price := 99.99

	// 3. Write to Cache (FOREVER)
	mutex.Lock()
	priceCache[key] = price
	mutex.Unlock()

	return price
}
