export default class Messages {
    constructor() { 
        this.data = [];
    }

    get = async () => {
        return await this.data;
    };

    create = async (newMessage) => {
        this.data.push(newMessage);
        return newMessage;
    };

    modify = async (id, message) => {
        const messageIndex = this.data.findIndex((currmessage) => currmessage.id === id);
        this.data.slice(messageIndex, 1, message);
        return message;
    } ;  

    delete = async (id) => {
        const messageIndex = this.data.findIndex((currmessage) => currmessage.id === id);
        const TemporalMessage = this.data[messageIndex];
        this.data.slice(messageIndex, 1);
        return TemporalMessage;
    };
}
