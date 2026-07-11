import { v7 } from "uuid";
import { OrderItem } from "../OrderItem";
import { OrderI } from "./type";
import { Customer } from "../Customer";

export enum OrderStatus {
    NEW = "NEW",
    PAID = "PAID",
    CANCELLED = "CANCELLED"
}

export class Order implements OrderI {
    private id: string = v7().toString();;
    private items: OrderItem[] = [];
    private createdAt: Date = new Date();
    private status: OrderStatus = OrderStatus.NEW;

    constructor(private customer: Customer) {}

    getId(): string {
        return this.id;
    }

    getItems(): OrderItem[] {
        return [...this.items];
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getStatus(): OrderStatus {
        return this.status;
    }

    setStatus(status: OrderStatus): void {
        this.status = status;
    }
    
    getCustomer(): Customer {
        return this.customer;
    }

    addItem(item: OrderItem): void {
        this.items.push(item);
    }

    removeItem(productId: string): void {
        this.items = this.items.filter(i => {
            const product = i.getProduct();
            return product && product.getId() !== productId;
        });
    }

    calculateTotal(): number {
        return this.items.reduce((sum, i) => {
            return sum + i.getTotal();
        }, 0);
    }

    printInvoice(): void {
        console.log("Invoice:");
        console.log(`OrderId: ${this.id}`);
        console.log(`Customer: ${this.customer.getName()}`);
        console.log(`CreatedAt: ${this.createdAt}`);
        console.log(`Status: ${this.status}`);
        this.items.forEach(i => console.log(i.toString()));
        console.log(`Total: ${this.calculateTotal()}`);
    }

}