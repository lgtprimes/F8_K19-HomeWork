import { Customer } from "../../models/Customer";
import { CustomerServiceI } from "./type";

export class CustomerService implements CustomerServiceI {
    private customers: Customer[] = [];

    addCustomer(customer: Customer): void {
        const existingCustomer = this.findById(customer.getId());
        if(existingCustomer) {
            throw new Error(`Customer with id ${customer.getId()} already exists!!`);
        }
        this.customers.push(customer);
    }
    
    updateCustomer(id: string, data: Partial<Customer>): void {
        const existingCustomer = this.findById(id);
        if(!existingCustomer) {
            throw new Error(`Customer with id ${id} not found!!`);
        }
        Object.assign(existingCustomer, data);
    }

    deleteCustomer(id: string): void {
        this.customers = this.customers.filter(c => c.getId() !== id);
    }

    findById(id: string): Customer | undefined {
        return this.customers.find(c => c.getId() === id);
    }

    findByPhone(phone: string): Customer | undefined {
        return this.customers.find(c => c.getPhone() === phone);
    }

    getAllCustomers(): Customer[] {
        return this.customers;
    }

    printCustomers(): void {
        this.customers.forEach(c => {
            console.log(c.toString());
        })
    }

}