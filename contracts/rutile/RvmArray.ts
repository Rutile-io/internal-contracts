import { system } from "./System";
import { u256 } from '../../node_modules/bignum/assembly/integer/u256';
import { storage } from "./Storage";
import { printString, print32, printMemHex } from "../utils/debug";
import { debug } from "./Debug";
import { createTypedArray } from "./utils/createTypedArray";

class RvmArray {
    public length: i32 = 0;
    private prefix: string;
    private startNumber: u256;

    constructor(prefix: string) {
        this.prefix = prefix;
        this.init();
    }

    private init(): void {
        // First check if the current prefix is already available.

        const hash = system.keccak256(this.prefix);

        createTypedArray<Uint32Array>(hash, 4, 9);



        // debug.print('Lekker printen');
        // printMemHex(ptrBuffer, hash.byteLength);
    
        // debug.print32(hash.byteLength);
        // debug.print(hash.toString());
        // const hashu8 = changetype<Uint8Array>(hash);

        // let ui8 = load<Uint8Array>(ptrBuffer);

        // debug.print32(ui8.length);
        // debug.print32(hashu8.byteLength);

        // this.startNumber = u256.fromBytes(hash, true);
        // debug.print('Lekker crashen?');

        // // This is our starting point. The hash is our big number that
        // // represents the array. We add 1 to the hash everytime an item
        // // is added to the array (the index)
        // storage.setItem(hash.buffer.toString(), this.length.toString());
    }

    set(): void {

    }

    get(index: i32): string {
        const hashIndex = u256.add(u256.fromI32(index), this.startNumber);
        return storage.getItem(hashIndex.toString());
    }

    push(item: string): void {
        this.length += 1;
        const hashIndex = u256.add(u256.fromI32(this.length), this.startNumber);
        storage.setItem(hashIndex.toString(), item);
    }

    pop(): void {
        this.length -= 1;
    }
}

export default RvmArray;