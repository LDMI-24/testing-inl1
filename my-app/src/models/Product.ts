export class Product {
  id: number;
  productName: string;
  productDesc: string;
  price: number;

  constructor(id: number, name: string, desc: string, price: number) {
    this.id = id;
    this.productName = name;
    this.productDesc = desc;  
    this.price = price;    
  }
}