import { ProductManager } from "./ProductManager.js";
import { _dirname } from "./utils.js";

let myFirstStore = new ProductManager("./products.json");
myFirstStore.getProducts().then((data) => console.log(data));

myFirstStore.addProduct("Nokia", "celular modelo x24", 30.0, "sin imagen", "01", 8);
myFirstStore.addProduct("Samsung", "celular modelo j12", 50.0, "sin imagen", "02", 11);
myFirstStore.addProduct("LG", "celular modelo f34", 70.0, "sin imagen", "03", 12);
