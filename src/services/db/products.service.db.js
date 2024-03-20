export default class ProductsService {
    constructor(serv) {
        this.serv = serv;
    }

    async createProduct(product) {
        try {
            const newProduct = await this.serv.create(product);
            return newProduct;
        } catch (error) {
            throw error;
        }
    }

     async getProducts() {
        try {
            const products = await this.serv.get();
            return products;
        } catch (error) {
            throw error;
        }
    }

        async getPaginatedProducts(filter) {
            try {
                const pagesData = await this.serv.getPaginated(filter);
                pagesData.status = "success";

                pagesData.products = pagesData.docs;
                delete pagesData.docs;

                return pagesData;
            } catch (error) {
                throw error;
            }
        }

        async getProductsById(pid) {
            try {
                const product = await this.serv.get({_id :pid});
                return product;
            } catch (error) {
                throw error;
            }
        }

        async updateProduct(pid, productUpdates) {
            try {
                const updatedProduct = await this.serv.get({ _id:pid}, productUpdates);
                return updatedProduct;
            } catch (error) {
                throw error;
            }
        }

}


