import { Product } from "../Product";
import { OrderItemI } from "./type";
export class OrderItem implements OrderItemI {
    private price: number;
    constructor(
        private product: Product, 
        private quantity: number) 
    {
        this.price = product.getPrice();
    }

    getPrice(): number {
        return this.price;
    }

    getProduct(): Product {
        return this.product;
    }

    setProduct(product: Product): void {
        this.product = product;
        this.price = product.getPrice();
    }

    getQuantity(): number {
        return this.quantity;
    }

    setQuantity(quantity: number): void {
        this.quantity = quantity;
    }

    getTotal(): number {
        return this.price * this.quantity;
    }

    toString(): string {
        return `Product: ${this.product.getName()} | Price: ${this.price} | Quantity: ${this.quantity} | Total: ${this.getTotal()}`;
    }

}