import { MotionAutomation, SecurityMonitor } from './automation/SmartHomeListeners';
import { HomeHub } from './core/HomeHub';
import { DeviceFactory } from './devices/DeviceFactory';
import { SecureDecorator, LoggingDecorator } from './features/Decorators';
import { DeviceGroup } from './structure/HouseStructure';

const hub = HomeHub.getInstance()
const bus = hub.eventBus

let rawLight = DeviceFactory.create({ id: '1', type: 'light', name: 'light' }, bus)
let rawDoor = DeviceFactory.create({ id: '2', type: 'front_door', name: 'front_door' }, bus)
let rawLock = DeviceFactory.create({ id: '3', type: 'lock', name: 'lock' }, bus)

console.log('applying decorators')
const secureDoor = new SecureDecorator(rawDoor, 1234)
const secureLock = new SecureDecorator(rawLock, 1234)

console.log('appling composite pattern: building strucutre')
const livingRoom = new DeviceGroup('room-1', 'living room')
livingRoom.add(secureDoor)
livingRoom.add(secureLock)


console.log('applying observer pattern')
const securityMonitor = new SecurityMonitor(bus)
const motionMonitor = new MotionAutomation(bus)


console.log("\n>>> secnario A: User Open the door correctly")
secureDoor.turnOn()

console.log("\n>> senario B: user enters wrong pin")
const hackedDoor = new LoggingDecorator(new SecureDecorator(rawDoor, 9999))
hackedDoor.turnOn()

console.log("\n>> scenario C: Motion sensor triggered observer")
bus.publish('MOTION_DETECTED', { id: 'sensor-1', name: 'Motion', status: true, timeStamp: Date.now() })


console.log("\n>>> SCENARIO D: Master Switch (Composite)");
console.log("Turning OFF Living Room...");
livingRoom.turnOff(); // Should turn off Lamp AND Door
