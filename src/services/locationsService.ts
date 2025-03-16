import prismaClient from '../prisma';
import { locationsSql } from '../sql/locationsSql';

export const locationsService = {
    get: async (isEmpty: boolean) => {
        const locations = await prismaClient.$queryRaw(locationsSql.get(isEmpty));

        return locations;
    }
}