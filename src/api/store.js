export default class Store {
  constructor(key, storage) {
    this._storeKey = key;
    this._storage = storage;
  }

  getItems() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey)) || {};
    } catch (err) {
      return {};
    }
  }

  setItem(key, value) {
    const store = this.getItems();

    this._storage.setItem(
        this._storeKey,
        JSON.stringify(
            Object.assign({}, store, {
              [key]: value
            })
        )
    );
  }

  removeItem(id) {
    const store = this.getItems();
    const index = store.findIndex((it) => it.id === id);
    const renewedStore = [].concat(store.slice(0, index), store.slice(index + 1));

    this._storage.setItem(
        this._storeKey,
        JSON.stringify(renewedStore)
    );
  }

  setItems(items) {
    this._storage.setItem(
        this._storeKey,
        JSON.stringify(items)
    );
  }
}
