import { TContainersUpdate } from '../@types/TContainers';
import prismaClient from '../prisma';
import { tb_containers } from '@prisma/client';
import { containersSql } from '../sql/containersSql';

export const containersService = {
    create: async ({
        origin,
        weight,
        statusId,
        locationId,
        uuid,
        uniqueIdentifier
    }: Omit<tb_containers, 'id' | 'receivedDate'>) => {
        await prismaClient.$transaction(async (tx) => {
            const container = await tx.tb_containers.create({
                data: {
                    origin,
                    receivedDate: new Date(),
                    weight,
                    statusId,
                    locationId,
                    uuid,
                    uniqueIdentifier
                }
            })
            await tx.tb_container_movements.create({
                data: {
                    containerId: container.id,
                    fromLocationId: null,
                    toLocationId: locationId,
                    movedAt: new Date(),
                }
            })
        })
    },
    update: async ({
        containerId,
        statusId
    }: TContainersUpdate) => {
        await prismaClient.tb_containers.update({
            data: {
                statusId
            },
            where: {
                id: containerId
            }
        });
    },
    get: async () => {
        const containers = await prismaClient.$queryRaw(containersSql.get());

        return containers;
    },
    getData: async () => {
        const [status] = await prismaClient.$transaction(
            [
                prismaClient.tb_containers_status.findMany()
            ]
        );

        return {
            status
        }
    }
}