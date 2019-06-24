import { printString } from '../utils/debug';

export class Debug {
    print(message: string): void {
        printString(message.toUTF8(), message.lengthUTF8 - 1);
    }
}

export let debug: Debug = new Debug();