import { CustomerI } from "./type";
import { v7 } from "uuid";

export class Customer implements CustomerI {
    private id: string = v7().toString()
    constructor(
        private name: string,
        private phone: string,
        private address: string
    ) {}

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getPhone(): string {
        return this.phone;
    }

    getAddress(): string {
        return this.address;
    }

    updatePhone(phone: string): void {
        this.phone = phone;
    }

    updateAddress(address: string): void {
        this.address = address;
    }

    toString(): string {
        return `CustomerId: ${this.id} | Name: ${this.name} | Phone: ${this.phone} | Address: ${this.address}`;
    }

}