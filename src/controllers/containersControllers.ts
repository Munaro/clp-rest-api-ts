import { Request, Response } from 'express';
import handleErrors from '../utils/handleErrors';
import { containersService } from '../services/containersService';

export const containersControllers = {
    create: async (req: Request, res: Response): Promise<any> => {
        try {
            const {
                origin,
                weight,
                statusId,
                locationId,
                uuid,
                uniqueIdentifier
            } = req.body;

            await containersService.create({
                origin,
                weight,
                statusId,
                locationId,
                uuid,
                uniqueIdentifier
            });

            return res.status(201).end();
        } catch (error) {
            handleErrors(error, res);
        }
    },
    update: async (req: Request, res: Response): Promise<any> => {
        try {
            const {
                containerId,
                statusId
            } = req.body;

            await containersService.update({
                containerId,
                statusId
            });

            return res.status(200).end();
        } catch (error) {
            handleErrors(error, res);
        }
    },
    get: async (req: Request, res: Response): Promise<any> => {
        try {
            let data;
            switch(req.query.data) {
                case 'true':
                    data = await containersService.getData();                    
                    break;
                default:
                    data = await containersService.get();
            }

            return res.json(data)
        } catch (error) {
            handleErrors(error, res);
        }
    }
}