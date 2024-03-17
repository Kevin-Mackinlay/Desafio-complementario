export default class Products {
    constructor() {
        this.data = [];
    }

    get = async () => {
        return await this.data;
    };

    create = async (newProduct) => {
        this.data.push(newProduct);
        return newProduct;
    };

    modify = async (id, product) => {
        const productIndex = this.data.findIndex((currproduct) => currproduct.id === id);
        this.data.slice(productIndex, 1, product);
        return product;
    };

    delete = async (id) => {
        const productIndex = this.data.findIndex((currproduct) => currproduct.id === id);
        const TemporalProduct = this.data[productIndex];
        this.data.slice(productIndex, 1);
        return TemporalProduct;
    };
}