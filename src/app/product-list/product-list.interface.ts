export interface IProductList {
    id: number,
    name: string,
    image: string,
    price: number,
    genre: string,
    releaseDate: string
}

export interface IOrderList {
    productId: number,
    name: string,
    image: string,
    price: number,
    genre: string,
    releaseDate: string,
    id: number,
    uniqueId: number
}