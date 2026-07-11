import { Product } from "../../models/Product";

export interface ProductServiceI {
    addProduct(product: Product): void;

    deleteProduct(id: string): void;
    
    findById(id: string): Product | undefined;
    
    updateProduct(id: string, data: Partial<Product>): void;

    findByName(keyword: string): Product[];

    getAllProducts(): Product[];

    printProducts(): void;

}