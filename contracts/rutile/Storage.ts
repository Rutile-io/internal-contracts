import "allocator/arena";
import { storageStore, storageLoad } from "../utils/env";

export class Storage {

    /**
     * Stores a string to the given location
     *
     * @param {string} key
     * @param {string} value
     * @memberof Storage
     */
    setItem(key: string, value: string): void {
        // TODO: Key should be hashed before stored.
        storageStore(key.toUTF8(), value.toUTF8(), key.lengthUTF8 - 1, value.lengthUTF8 - 1);
    }

    /**
     * Gets the value from storage
     * TODO: Some values are much larger than 32 bytes. We should support those
     *
     * @param {string} key
     * @returns {string}
     * @memberof Storage
     */
    getItem(key: string): string {
        let ptrValue = memory.allocate(32);
        storageLoad(key.toUTF8(), ptrValue);
        
        return String.fromUTF8(ptrValue, 32);
    }
}

export let storage: Storage = new Storage();
