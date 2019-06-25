import "rt"
import { reverseBytes } from '../utils/reverseBytes'
import { registerAsValidator, getNextValidator } from "./validator";
import '../utils/env';
import { getCallDataSize, revert, callDataCopy, finish } from "../utils/env";
import { print32 } from "../utils/debug";
import { debug } from "../rutile/Debug";

export function main(): void {
    // Make sure a function is being called
    if (getCallDataSize() < 4) {
        revert(0, 0);
    }

    let ptrSelector = <i32>__alloc(4, 0);
    callDataCopy(ptrSelector, 0, 4);
    let selector = reverseBytes(load<i32>(ptrSelector));

    // For now we are going to use fake selectors
    switch(selector) {
        case 0x00000001:
            registerAsValidator();
            break;
        case 0x00000002:
            getNextValidator();
            break;
        default:
            revert(0, 0);
    }
}