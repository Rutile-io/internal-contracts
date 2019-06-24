import { getCallValue, log, finish, revert, storageLoad, getCaller, storageStore } from "../utils/env";
import { print32, printMemHex, print64 } from "../utils/debug";
import { reverseBytes, reverseBytes64 } from "../utils/reverseBytes";
import { storage } from '../rutile/Storage';
import { debug } from '../rutile/Debug';

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

    // Load the current amount of slots in
    let ptrSender = <i32>memory.allocate(32);
    getCaller(ptrSender);
    let ptrSenderSlots = <i32>memory.allocate(4);
    storageLoad(ptrSender, ptrSenderSlots);
    let senderSlots = load<i32>(ptrSenderSlots);

    senderSlots += 1

    // Add the slot to the current address
    store<i32>(ptrSenderSlots, senderSlots);
    printMemHex(ptrSenderSlots, 4);

    storageStore(ptrSender, ptrSenderSlots, 32, 4);

    // Return the amount of slots the address is assigned to
    finish(ptrSenderSlots, 4);
}