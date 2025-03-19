import { Prisma } from '@prisma/client';
import { TContainersChangePosition } from '../@types/TContainers';
import prismaClient from '../prisma';
import { movementsSql } from '../sql/movementsSql';

export const movementsService = {
    changePosition: async ({
        containerId,
        toLocationId
    }: TContainersChangePosition) => {
        await prismaClient.$transaction(async (tx) => {
            const containerInfo = await tx.tb_containers.findFirst({
                where: {
                    id: containerId
                }
            });

            if (!containerInfo) {
                throw new Error("Container não encontrado!")
            };

            if (!toLocationId) {
                await tx.tb_container_movements.create({
                    data: {
                        fromLocationId: containerInfo.locationId,
                        containerId,
                        toLocationId: null
                    }
                });
    
                await tx.tb_containers.update({
                    data: {
                        locationId: null,
                        statusId: 3
                    },
                    where: {
                        id: containerId
                    }
                });
            } else {
                const destinationInfo = await tx.tb_locations.findFirst({
                    where: {
                        id: toLocationId
                    }
                });
    
                if (!destinationInfo) {
                    throw new Error("Localização não encontrada!")
                };
    
                if (containerInfo.weight > destinationInfo.maxCapacity) {
                    throw new Error(`Peso máximo de destino (${destinationInfo.maxCapacity} KG) não suporta o peso do container (${containerInfo.weight} KG)!`)
                };
    
                const checkLocation = await tx.tb_containers.findFirst({
                    where: {
                        locationId: toLocationId
                    }
                });
    
                if (checkLocation) {
                    throw new Error(`A localização selecionada já está sendo utilizada pelo container de id ${checkLocation.uniqueIdentifier}.`);
                };
                
                if (containerInfo.locationId === toLocationId) {
                    throw new Error("Container já está nesta localização.")
                }
    
                await tx.tb_container_movements.create({
                    data: {
                        fromLocationId: containerInfo.locationId,
                        containerId,
                        toLocationId
                    }
                });
    
                await tx.tb_containers.update({
                    data: {
                        locationId: toLocationId
                    },
                    where: {
                        id: containerId
                    }
                });
            }            
        })
    },
    getMovements: async (id: number) => {
        const containerMovements = await prismaClient.$queryRaw(movementsSql.getLogMovements(id));

        return containerMovements;
    }
}