import { Product } from "./models/Product";
import { ProductService } from "./services/ProductService";
import { Customer } from "./models/Customer";
import { CustomerService } from "./services/CustomerService";
import { OrderService } from "./services/OrderService";

const productService = new ProductService();
const customerService = new CustomerService();
const orderService = new OrderService(productService);

const p1 = new Product("Iphone 17 promax", 36000000, 1200);
const p2 = new Product("Iphone 17 pro", 30000000, 1000);

productService.addProduct(p1);
productService.addProduct(p2);

const c1 = new Customer("Nguyen Van A", "0123456789", "123 ABC Street");
customerService.addCustomer(c1);

const order1 = orderService.createOrder(c1);
orderService.addProduct(order1.getId(), p1.getId(), 2);
orderService.addProduct(order1.getId(), p2.getId(), 1);

order1.printInvoice();

orderService.checkout(order1.getId());

orderService.printOrders();

