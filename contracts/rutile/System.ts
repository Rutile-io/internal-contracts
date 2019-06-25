import { call, getReturnDataSize, returnDataCopy } from "../utils/env";
import { printMemHex, print32, printString } from "../utils/debug";
import { reverseBytes } from '../utils/reverseBytes';
import { debug } from "./Debug";
import { u256 } from '../../node_modules/bignum/assembly/integer/u256';
import StringMemory from "./utils/StringMemory";
import toAddress, { toAddressPointer } from "./utils/toAddress";

let KECCAK_ADDRESS = u256.fromU64(9);

class System {
    keccak256(value: string): void {
        let ptrAddress = toAddressPointer(KECCAK_ADDRESS);
        const valueMem = new StringMemory(value);

        let returnCode = call(8000000, ptrAddress, 0, valueMem.pointer, valueMem.length);

        if (returnCode === 1) {
            return;
        }

        let returnDataSize = getReturnDataSize();
        let ptrDataCopy = __alloc(returnDataSize, 0);

        returnDataCopy(ptrDataCopy, 0, returnDataSize);

        printMemHex(ptrDataCopy, returnDataSize);
    }
}

export let system: System = new System();