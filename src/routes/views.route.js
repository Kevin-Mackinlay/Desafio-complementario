import {Router} from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send({message:'home', data: {title: 'Home'} });
});

export default router;