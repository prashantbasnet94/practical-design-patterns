import { Device } from "./DeviceFactory";

class MotionSensor extends Device {
    alarm() {
        this.bus.publish('SECURITY_ALERT', {
            id: this.config.id,
            name: this.config.name,
            timeStamp: Date.now(),
            status: this.status
        })
    }
}

class MobileApp extends Device {
    shutDown() {
        this.bus.publish('DEVICE_STATUS_OFF', {
            id: this.config.id,
            name: this.config.name,
            timeStamp: Date.now(),
            status: this.status
        })
    }
    powerUp() {
        this.bus.publish('DEVICE_STATUS_ON', {
            id: this.config.id,
            name: this.config.name,
            timeStamp: Date.now(),
            status: this.status
        })
    }
}