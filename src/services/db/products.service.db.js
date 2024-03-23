export default class ProductsService {
    constructor(service) {
        this.service = service;
    }

    async createProduct(product) {
        try {
            const newProduct = await this.service.create(product);
            return newProduct;
        } catch (error) {
            throw error;
        }
    }

     async getProducts() {
        try {
            const products = await this.service.get();
            return products;
        } catch (error) {
            throw error;
        }
    }

        async getPaginatedProducts(filter) {
            try {
                const pagesData = await this.service.getPaginated(filter);
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
                const product = await this.service.get({_id :pid});
                return product;
            } catch (error) {
                throw error;
            }
        }

    async deleteProductById(pid) {
        try {
            const deletedProduct = await this.service.delete({ _id:pid });
            return deletedProduct;
        } catch (error) {
            throw error;
        }
    }

        async updateProduct(pid, productUpdates) {
            try {
                const updatedProduct = await this.service.get({ _id:pid}, productUpdates);
                return updatedProduct;
            } catch (error) {
                throw error;
            }
        }

}


