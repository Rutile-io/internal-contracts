import { getCallValue, log, finish, revert } from "../utils/env";
import { print32, printMemHex, print64 } from "../utils/debug";
import { reverseBytes, reverseBytes64 } from "../utils/reverseBytes";

const MINIMUM_DEPOSIT = 32;

/**
 * Registers the address as a staker allowing them to create milestones
 *
 * @export
 */
export function registerAsValidator(): void {
    // Make sure the call value is enough to stake.
    let ptrCallValue = <i32>memory.allocate(8);
    getCallValue(ptrCallValue);
    let callValue = reverseBytes64(load<i64>(ptrCallValue));

    // Make sure the minimum deposit is reached
    if (callValue < MINIMUM_DEPOSIT) {
        revert(0, 0);
    }

    finish(0, 0);
}