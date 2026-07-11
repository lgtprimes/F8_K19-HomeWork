import { ProductI } from "./type";
import { v7 } from "uuid";

export class Product implements ProductI {
    private id: string = v7().toString()
    
    constructor(
        private name: string,
        private price: number,
        private stock: number
    ) {}

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }

    getStock(): number {
        return this.stock;
    }

    increaseStock(quantity: number): void {
        if(quantity < 0) {
            throw new Error("Quantity cannot be negative!!");
        }
        this.stock += quantity;
    }

    decreaseStock(quantity: number): void {
        if(quantity < 0) {
            throw new Error("Quantity cannot be negative!!");
        } else if (this.stock - quantity < 0) {
            throw new Error("Insufficient stock!!");
        } else {
            this.stock -= quantity;
        }
    }

    toString(): string {
        return `ProductId: ${this.id} | Product: ${this.name} | Price: ${this.price} | Stock: ${this.stock}`;
    }

}