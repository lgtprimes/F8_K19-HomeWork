import { v7 } from "uuid";
import { Customer } from "../../models/Customer";

export class CustomerService {
    private _customers: Customer[] = [];

    create(customer: Omit<Customer, "id">): Customer {
        const newCustomer: Customer = {
            id: v7(),
            ...customer
        }
        this._customers.push(newCustomer);
        return newCustomer;
    }

    updateById(id: string, data: Partial<Omit<Customer, "id">>): Customer | null {
        const customer = this._customers.find(c => c.id === id);
        if(!customer) {
            return null;
        } 
        Object.assign(customer, data);
        return customer
    }
}