import { Router } from 'express';
import { createHouse, getHouses, getHouseById, searchHouses } from "../controllers/houseController";
import upload from '../middleware/upload';

const router = Router();

router.get("/houses", getHouses);
router.get("/houses/search", searchHouses);
router.get('/houses/:id', getHouseById);

router.post('/houses', upload.array('images', 15), createHouse);

export default router;