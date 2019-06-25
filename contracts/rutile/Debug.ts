import { printString } from '../utils/debug';
import StringMemory from '../rutile/utils/StringMemory';

export class Debug {
    print(message: string): void {
        const strMemory = new StringMemory(message);
        printString(strMemory.pointer, strMemory.length);
    }
}

export let debug: Debug = new Debug();