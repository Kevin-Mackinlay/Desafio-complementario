import contactModel from './models/mongo/contact.schema.js';

export default class Contacts {
constructor() {

    get = async () => {
        return await contactModel.find();
    }
}

