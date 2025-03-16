import { Request, Response } from 'express';
import handleErrors from '../utils/handleErrors';
import { movementsService } from '../services/movementsService';

export const movementsController = {
    changePosition: async (req: Request, res: Response): Promise<any> => {
        try {
            const {
                containerId,
                toLocationId
            } = req.body;

            await movementsService.changePosition({
                containerId,
                toLocationId
            });

            return res.status(200).end();
        } catch (error) {
            handleErrors(error, res);
        }
    },    
    getMovements: async (req: Request, res: Response): Promise<any> => {
        try {
            const id = req.params.id;

            if (isNaN(Number(id))) {
                throw new Error("ID inválido!")
            };

            const data = await movementsService.getMovements(Number(id));

            return res.json(data).end();
        } catch (error) {
            handleErrors(error, res);
        }
    }
}