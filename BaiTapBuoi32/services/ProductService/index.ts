import { Product } from "../../models/Product";
import { ProductServiceI } from "./type";

export class ProductService implements ProductServiceI {
    private products: Product[] = [];

    addProduct(product: Product): void {
        const existingProduct = this.findById(product.getId());
        if(existingProduct) {
            throw new Error(`Product with id ${product.getId()} already exists!!`);
        }
        this.products.push(product);
    }

    deleteProduct(id: string): void {
        this.products = this.products.filter(p => p.getId() !== id)
    }

    findById(id: string): Product | undefined {
        return this.products.find(p => p.getId() === id)
    }

    updateProduct(id: string, data: Partial<Product>): void {
        const product = this.findById(id);
        if(!product) {
            throw new Error(`Product with id ${id} not found!!`);
        }
        Object.assign(product, data);
    }

    findByName(keyword: string): Product[] {
        return this.products.filter(p => p.getName().toLowerCase().includes(keyword.toLowerCase()));
    }

    getAllProducts(): Product[] {
        return this.products;
    }

    printProducts(): void {
        this.products.forEach(p => {
            console.log(p.toString());
        })
    }

}