import "allocator/arena"
import { reverseBytes } from '../utils/reverseBytes'
import { registerAsValidator } from "./validator";
import '../utils/env';
import { getCallDataSize, revert, callDataCopy } from "../utils/env";
import { print32 } from "../utils/debug";

export function main(): void {
    // Make sure a function is being called
    if (getCallDataSize() < 4) {
        revert(0, 0);
    }

    let ptrSelector = <i32>memory.allocate(4);
    callDataCopy(ptrSelector, 0, 4);
    let selector = reverseBytes(load<i32>(ptrSelector));

    // For now we are going to use fake selectors
    switch(selector) {
        case 0x00000001:
            registerAsValidator();
            break;
        default:
            revert(0, 0);
    }
}