import { call, getReturnDataSize, returnDataCopy } from "../utils/env";
import { printMemHex, print32, printString } from "../utils/debug";
import { u256 } from '../../node_modules/bignum/assembly/integer/u256';
import StringMemory from "./utils/StringMemory";
import { toAddressPointer } from "./utils/toAddress";
import { debug } from "./Debug";

let KECCAK_ADDRESS = u256.fromU64(9);

class System {
    keccak256(value: string): ArrayBuffer {
        let ptrAddress = toAddressPointer(KECCAK_ADDRESS);
        const valueMem = new StringMemory(value);

        debug.print('Well fuuuuuu ');
        debug.print(value);
        printString(valueMem.pointer, valueMem.length);

        // Calls the system contract for Keccak256
        let returnCode = call(8000000, ptrAddress, 0, valueMem.pointer, valueMem.length);

        // 1 Means the code execution has failed.
        if (returnCode === 1) {
            return new ArrayBuffer(0);
        }

        let returnDataSize = getReturnDataSize();
        let ptrDataCopy = __alloc(returnDataSize, idof<ArrayBuffer>());
        returnDataCopy(ptrDataCopy, 0, returnDataSize);

        let resultBuffer = changetype<ArrayBuffer>(ptrDataCopy);

        return resultBuffer;
    }
}

export let system: System = new System();