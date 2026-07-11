import { OrderServiceI } from "./type";
import { Order, OrderStatus } from "../../models/Order";
import { Customer } from "../../models/Customer";
import { OrderItem } from "../../models/OrderItem";
import { ProductService } from "../ProductService";

export class OrderService implements OrderServiceI {
    private orders: Order[] = [];

    constructor(private productService: ProductService) {
        this.productService = productService;
    }

    createOrder(customer: Customer): Order {
        const order = new Order(customer);
        this.orders.push(order);
        return order;
    }
    
    addProduct(orderId: string, productId: string, quantity: number): void {
        const order = this.findOrder(orderId);
        if(!order) {
            throw new Error(`Order with id ${orderId} not found!!`);
        }

        const product = this.productService.findById(productId);
        if(!product) {
            throw new Error(`Product with id ${productId} not found in order ${orderId}!!`);
        }

        const orderItem = new OrderItem(product, quantity);
        order.addItem(orderItem);
    }

    removeProduct(orderId: string, productId: string): void {
        const order = this.findOrder(orderId);
        if(!order) {
            throw new Error(`Order with id ${orderId} not found!!`);
        }
        order.removeItem(productId);
    }

    checkout(orderId: string): void {
        const order = this.findOrder(orderId);
        if(!order) {
            throw new Error(`Order with id ${orderId} not found!!`);
        }

        if(order.getStatus() !== OrderStatus.NEW) {
            throw new Error(`Order with id ${orderId} is not in a state where it can be checked out!!`);
        }

        order.setStatus(OrderStatus.PAID);

    }

    cancelOrder(orderId: string): void {
        const order = this.findOrder(orderId);
        if(!order) {
            throw new Error(`Order with id ${orderId} not found!!`);
        }

        if(order.getStatus() === OrderStatus.PAID) {
            throw new Error(`Order with id ${orderId} has already been paid and cannot be cancelled!!`);
        }
        order.setStatus(OrderStatus.CANCELLED);
    }

    findOrder(orderId: string): Order | undefined {
        return this.orders.find(o => o.getId() === orderId); 
    }

    getOrders(): Order[] {
        return [...this.orders];
    }

    printOrders(): void {
        this.orders.forEach(o => {
            console.log("Order Details:");
            console.log(`OrderId: ${o.getId()} | Customer: ${o.getCustomer().getName()} | CreatedAt: ${o.getCreatedAt()} | Status: ${o.getStatus()} | Total: ${o.calculateTotal()}`);
        });
    }

}