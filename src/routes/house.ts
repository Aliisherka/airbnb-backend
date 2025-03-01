import { Router } from 'express';
import { getHouses } from "../controllers/houseController";

const router = Router();

router.get("/houses", getHouses);

export default router;