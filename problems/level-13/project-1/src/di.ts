type Constructor<T = any> = new (...args: any[]) => T;

export class Container {
  private services = new Map<string, Constructor>();
  private singletons = new Map<string, any>();

  register(name: string, implementation: Constructor): void {
    // TODO: Register a class
  }

  resolve<T>(name: string): T {
    // TODO: Instantiate the class and recursively resolve its dependencies
    // (Simulate dependency metadata if reflection is too complex for this exercise)
    throw new Error("Not implemented");
  }
}

// Example Classes to Test With
export class Logger {
  log() { console.log("Logging..."); }
}

export class UserService {
  constructor(public logger: Logger) {}
}
