import {ProductManager} from "./ProductManager.js";

let myFirstStore = new ProductManager("./products.json");


myFirstStore.addProduct("Nokia", "celular modelo x24", 30.000, "sin imagen","01", 8 );
myFirstStore.addProduct("Samsung", "celular modelo j12", 50.000, "sin imagen","02", 11 );
myFirstStore.addProduct("LG", "celular modelo f34", 70.000, "sin imagen","03", 12 );