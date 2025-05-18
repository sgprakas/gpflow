type Listener = (data: any) => void;

class FlowBus {
    private listeners = new Map<string, Set<Listener>>();

    subscribe(uniqueId: string, fn: Listener) {
      if (!this.listeners.has(uniqueId)) {
        this.listeners.set(uniqueId, new Set());
      }
      this.listeners.get(uniqueId)!.add(fn);
  
      return () => {
        this.listeners.get(uniqueId)!.delete(fn);
      };
    }
  
    emit(uniqueId: string, data: any) {
      const getListeners = this.listeners.get(uniqueId);
      if (!getListeners) return;
      for (const fn of getListeners) {
        fn(data);
      }
    }
}

const flowBus = new FlowBus();
export default flowBus;