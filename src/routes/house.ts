import { Router } from 'express';
import { createHouse, getHouses, getHouseById, searchHouses } from "../controllers/houseController";
import { authenticate } from '../middleware/authMiddleware';
import { uploadHouseImages } from '../middleware/upload';

const router = Router();

router.get("/houses", getHouses);
router.get("/houses/search", searchHouses);
router.get('/houses/:id', getHouseById);

router.post('/houses', uploadHouseImages.array('images', 15), authenticate, createHouse);

export default router;