import { Router } from "express";
import { containersControllers } from "./controllers/containersControllers";
import { locationsController } from "./controllers/locationsController";
import { movementsController } from "./controllers/movementsController";

const router = Router();

router.post('/containers', containersControllers.create);
router.put('/containers', containersControllers.update);
router.get('/containers', containersControllers.get);

router.put('/movements', movementsController.changePosition);
router.get('/movements/:id', movementsController.getMovements);

router.get('/locations', locationsController.get);

export { router };