export class MappedSet<K, V> {

    private _map: Map<K, Set<V>>;

    public constructor() {
        this._map = new Map<K, Set<V>>();
    }

    public add(key: K, value: V): void {
        let valueSet: Set<V>;

        if (this._map.has(key)) {
            valueSet = this._map.get(key);
        } else {
            valueSet = new Set<V>();
            this._map.set(key, valueSet);
        }

        valueSet.add(value);
    }

    public getKeys(): IterableIterator<K> {
        return this._map.keys();
    }

    public getKeysAsSet(): Set<K> {
        const keys: IterableIterator<K> = this._map.keys();
        let scopeIdSet: Set<K> = new Set<K>();
        for (let refId of keys) {
            scopeIdSet.add(refId);
        }
        return scopeIdSet;
    }

    public getKeysAsArray(): Array<K> {
        const keys: IterableIterator<K> = this._map.keys();
        let scopeIdArray: Array<K> = new Array<K>();
        for (let refId of keys) {
            scopeIdArray.push(refId);
        }
        return scopeIdArray;
    }

    public getValues(key: K): Set<V> {
        return this._map.get(key);
    }

    public hasElements(): boolean {
        return this._map.size > 0;
    }

    public debugOut(): void {
        console.log("MappedSet:");
        const keys = this.getKeys();
        for (let key of keys) {
            console.log("    key: " + key);
            const values = this.getValues(key);
            for (let value of values) {
                console.log("        " + value.toString());
            }
        }
    }

}