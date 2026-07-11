import { Product } from "../Product";

export interface OrderItemI {
    getPrice(): number;
    getQuantity(): number;
    setQuantity(quantity: number): void;
    getProduct(): Product;
    setProduct(product: Product): void;
    getTotal(): number;
    toString(): string;
}