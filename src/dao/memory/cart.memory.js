export default class Carts{
    constructor(){
        this.data = [];
    }
    get = async () => {
        return await this.data;
    };
    create = async (newCart) => {
        this.data.push(newCart);
        return newCart;
    };
    modify = async (id, cart) => {
        const cartIndex = this.data.findIndex((currcart) => currcart.id === id);
        this.data.slice(cartIndex, 1, cart);
        return cart;
    };
    delete = async (id) => {
        const cartIndex = this.data.findIndex((currcart) => currcart.id === id);
        const TemporalCart = this.data[cartIndex];
        this.data.slice(cartIndex, 1);
        return TemporalCart;
    };
    
}