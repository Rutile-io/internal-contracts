import { system } from "./System";

class RvmArray {
    private length: number = 0;
    private prefix: string;

    constructor(prefix: string) {
        this.prefix = prefix;
        this.init();
    }

    private init() {
        system.keccak256(this.prefix);
    }

    push(item: string | number) {
        this.length += 1;
    }

    pop() {
        this.length -= 1;
    }
}