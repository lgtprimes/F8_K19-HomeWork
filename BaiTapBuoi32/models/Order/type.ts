import { Customer } from "../Customer";
import { OrderItem } from "../OrderItem"
export interface OrderI {
    getId(): string;
    getItems(): OrderItem[];
    getCreatedAt(): Date;
    getStatus(): string;
    setStatus(status: string): void;
    getCustomer(): Customer;
    addItem(item: OrderItem): void;
    removeItem(productId: string): void;
    calculateTotal(): number;
    printInvoice(): void;
}