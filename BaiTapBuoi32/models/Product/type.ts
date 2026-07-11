export interface ProductI {
    getId(): string;
    getName(): string;
    getPrice(): number;
    getStock(): number;
    increaseStock(quantity: number) : void;
    decreaseStock(quantity: number) : void;
    toString(): string;
}