# Level 2, Project 1: The Notifier System

## The Scenario

You are working on a weather monitoring application. There's a `WeatherStation` class that periodically checks the temperature. When the temperature changes, it needs to notify different parts of the application.

Currently, it directly calls an `EmailNotifier` and an `SmsNotifier`.

## The Problem

The engineering team now wants to add a `PushNotifier` to send notifications to our mobile app. Looking at the code in `src/weather-station.ts`, you can see that adding a new notifier would require modifying the `WeatherStation` class directly. This makes the `WeatherStation` brittle and tightly coupled to the specific notifier classes.

## Your Goal

Your task is to refactor this system using the **Observer design pattern**.

**Key Requirements:**

1.  Decouple the `WeatherStation` (the "Subject") from the concrete notifiers (the "Observers").
2.  The `WeatherStation` should be able to notify any number of notifiers without knowing their specific classes.
3.  Make it easy to add new notifiers (like a `PushNotifier`) to the system in the future without changing the `WeatherStation`'s code.