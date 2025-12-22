import { SecurityMonitor } from './SmartHomeListeners';
import { IObserver, tData } from '../devices/types';
import { EventBus } from './../core/EventBus';

/**
 * FILE: SmartHomeListeners.ts
 *
 * CONCEPT:
 * These are "Automation Scripts" or "Services" that listen to the heartbeat of the house (EventBus).
 * They don't represent a physical device, but rather the "Logic" of the home.
 */

/**
 * EXAMPLE 1: Security Monitor
 * Listens for: 'SECURITY_ALERT' (e.g., from a window sensor or smart lock failure)
 * Action: Logs to console (or theoretically calls police/sends SMS).
 */

export class SecurityMonitor implements IObserver{
    constructor(private bus: EventBus) {
        this.bus.subscribe('SECURITY_ALER', this)
    }

    update(data: tData): void {
        console.log("[SECURITY_ALERT] RECEIVED ", data)
    }
}

/**
 * EXAMPLE 2: MotionAutomation
 * Listens for: 'MOTION_DETECTED'
 * Action: Finds a specific light and turns it on.
 */

export class MotionAutomation implements IObserver{
    constructor(private bus: EventBus) {
        this.bus.subscribe('MOTION_DETECTED', this)
    }
    update(data: tData): void {
        console.log("MOTION DETECTED with data ", data)
    }
}