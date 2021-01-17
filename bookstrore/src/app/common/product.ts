export class Product {
    id!:number;
    sku !: string;
    name !: string;
    description !: string;
    unitPrice !: number;
    imageUrl !: string;
    active !: boolean;
    unitsInStock !: Date;
    lastUpdated !: Date;
}