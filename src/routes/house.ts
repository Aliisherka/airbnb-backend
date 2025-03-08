import { Router } from 'express';
import { createHouse, getHouses } from "../controllers/houseController";
import upload from '../middleware/upload';

const router = Router();

router.get("/houses", getHouses);
router.post('/houses', upload.array('images', 15), createHouse);

export default router;