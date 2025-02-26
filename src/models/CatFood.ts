export class CatFood {
    id: number;
    name: string;
    price: number;
    description: string;
    stock: number;
    imagePath: string;
    createdAt: string;

    constructor(id: number, name: string, price: number, description: string, stock: number, imagePath: string, createdAt: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.stock = stock;
        this.imagePath = imagePath;
        this.createdAt = createdAt;
    }
}