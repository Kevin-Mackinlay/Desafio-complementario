import express from "express";
const app = express();
const PORT = 8080;

app.get("/", (req, res) =>{
    res.send("hola mundo")
});

let products = [
  {
    id: 1,
    title: "Nokia",
    price:"50.000",
    thumbnail:"",
  },
  {
    id: 2,
    title: "Samsung",
    price:"89.000",
    thumbnail:"",
  },
  {
    id: 3,
    title: "LG",
    price:"67.000",
    thumbnail:"",
  },
  {
    id: 4,
    title: "Apple",
    price:"120.000",
    thumbnail:"",
  },
];

app.get("/products", (req, res) =>{
    let temporalProducts = products;
    const {limit} = req.query;
    if (limit){
        temporalProducts = temporalProducts.slice(0, +limit);
    }
    res.json({
        msg:"Lista de productos",
        data: temporalProducts,
    })
    
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

