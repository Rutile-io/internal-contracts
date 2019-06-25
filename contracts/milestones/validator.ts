import { getCallValue, log, finish, revert, storageLoad, getCaller, storageStore } from "../utils/env";
import { reverseBytes, reverseBytes64 } from "../utils/reverseBytes";
import { system } from '../rutile/System';

const MINIMUM_DEPOSIT = 32;
 
/**
 * Registers the address as a staker allowing them to create milestones
 *
 * @export
 */
export function registerAsValidator(): void {
    // Make sure the call value is enough to stake.
    let ptrCallValue = <i32>__alloc(8, 0);
    getCallValue(ptrCallValue);
    let callValue = reverseBytes64(load<i64>(ptrCallValue));

    // Make sure the minimum deposit is reached
    if (callValue < MINIMUM_DEPOSIT) {
        revert(0, 0);
    }

    system.keccak256('hello world');

    // Load the current amount of slots in
    let ptrSender = <i32>__alloc(32, 0);
    getCaller(ptrSender);
    let ptrSenderSlots = <i32>__alloc(4, 0);
    storageLoad(ptrSender, ptrSenderSlots);
    let senderSlots = load<i32>(ptrSenderSlots);
    senderSlots += 1

    // Add the slot to the current address
    store<i32>(ptrSenderSlots, senderSlots);
    storageStore(ptrSender, ptrSenderSlots, 32, 4);

    // Return the amount of slots the address is assigned to
    finish(ptrSenderSlots, 4);
}

export function getNextValidator(): void {
    
}