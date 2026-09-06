export interface signup {
    name: string,
    email: string,
    password: string
}
export interface product {
    name: string,
    price: number,
    category: string,
    image: string,
    color: string,
    description: string,
    id: number | string,
    quantity: undefined | number,
    productId?: undefined | number
}
export interface cart {
    name: string,
    price: number,
    category: string,
    image: string,
    color: string,
    description: string,
    id: number | string,
    quantity: undefined | number,
    userId: number | string,
    productId: string | number
}
export interface pricesummary {
    price: number;
    discount: number;
    tax: number;
    delivery: number;
    total: number;
}
export interface order {
    name: string;
    mobile: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    totalPrice: number;
    userId: string | number;
    id: number | undefined
}
export interface orderData {
    name: string;
    mobile: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
}