import {Router} from 'express';
import {CartManager} from '../classes/CartManager.js';

const router = Router();
const cartManager = new CartManager("./carts.json");

router.get("/", async (req, res) => {
    try{
        let response = await cartManager.getCarts();
        res.json({data: response});
    }catch(err){
    
        console.log(err)
    }
});


export default router;