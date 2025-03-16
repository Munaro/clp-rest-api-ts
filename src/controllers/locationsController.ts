import { Request, Response } from 'express';
import handleErrors from '../utils/handleErrors';
import { locationsService } from '../services/locationsService';

export const locationsController = {
    get: async (req: Request, res: Response) : Promise<any> => {
        try {
            const isEmpty = req.query.isEmpty;
            
            const data = await locationsService.get(!!isEmpty);

            return res.json(data).end();
        } catch (error) {
            handleErrors(error, res);
        }
    }
}