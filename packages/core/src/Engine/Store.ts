export enum StoreAction {
  Create = 'CREATE',
  Set = 'SET'
}

class Store {
  db:{[prop: string]: any} = {};
  listeners: any[] = [];

  set<T>(prop: string, val: T) {
    const prevVal = this.db[prop];
    this.db = {
      ...this.db,
      [prop]: val
    }

    Object.freeze(this.db);
    this._onChange(prevVal === undefined ? StoreAction.Create : StoreAction.Set, prop, val, prevVal);
  }

  get(prop: string) {
    return this.db[prop as string];
  }

  listen(listener: any) {
    this.listeners.push(listener)
  }

  _onChange(action: StoreAction, prop: string, newVal: any, prevVal: any) {
    this.listeners.forEach(listener => {
      listener({action, prop, val: newVal, previousVal: prevVal})
    })
  }

}

export default Store;