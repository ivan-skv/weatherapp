export default class EventEmitter {
  private listeners: { [x: string]: Array<(...args: any[]) => void>; }
  constructor() {
    this.listeners = {};
  }

  addListener(event: string, callback: (...args: any) => void): void {
    const listeners = Array.isArray(this.listeners[event]) ? this.listeners[event] : [];
    this.listeners[event] = listeners;
    if (listeners.indexOf(callback) === -1) {
      listeners.push(callback)
    }
  }

  off(event?: string, callback?: (...args: any[]) => void): void {
    if (!event) {
      const events = Object.keys(this.listeners);
      for (const e of events) {
        this.listeners[e].length = 0;
        delete this.listeners[e]
      }
      return;
    }
    if (!callback) {
      if (!Array.isArray(this.listeners[event])) {
        return;
      }
      this.listeners[event].length = 0;
      delete this.listeners[event]
      return;
    }
    if (!Array.isArray(this.listeners[event])) {
      return;
    }
    const index = this.listeners[event].indexOf(callback);
    if (index !== -1) {
      this.listeners[event].splice(index, 1)
    }
  }

  emit(event: string, ...args: any[]): void {
    const listeners = this.listeners[event]
    if (!Array.isArray(listeners)) {
      return;
    }
    for (const callback of listeners) {
      callback(...args)
    }
  }
}
