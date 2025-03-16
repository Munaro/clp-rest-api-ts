import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient({
});

async function main() {
    await prismaClient.$transaction(async (tx) => {
        const alreadyExistsStatus = await tx.tb_containers_status.findMany({
            where: {
                id: {
                    in: [1, 2, 3]
                }
            }
        });
        if (!alreadyExistsStatus) {
            await tx.tb_containers_status.createMany({
                data: [
                    { id: 1, description: "Armazenado" },
                    { id: 2, description: "Movendo" },
                    { id: 3, description: "Expedido" }
                ],
            });
        };

        const alreadyExistsLocations = await tx.tb_locations.findMany({
            where: {
                id: {
                    in: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                }
            }
        });

        if (!alreadyExistsLocations) {
            await tx.tb_locations.createMany({
                data: [
                    { id: 1, zone: "A", street: 1, column: 1, level: 1, position: 1, maxCapacity: 1000 },
                    { id: 2, zone: "A", street: 1, column: 1, level: 2, position: 1, maxCapacity: 800 },
                    { id: 3, zone: "A", street: 1, column: 1, level: 3, position: 1, maxCapacity: 500 },

                    { id: 4, zone: "A", street: 1, column: 2, level: 1, position: 1, maxCapacity: 1000 },
                    { id: 5, zone: "A", street: 1, column: 2, level: 2, position: 1, maxCapacity: 800 },
                    { id: 6, zone: "A", street: 1, column: 2, level: 3, position: 1, maxCapacity: 500 },

                    { id: 7, zone: "B", street: 2, column: 1, level: 1, position: 1, maxCapacity: 800 },
                    { id: 8, zone: "B", street: 2, column: 1, level: 2, position: 1, maxCapacity: 400 },
                    { id: 9, zone: "B", street: 2, column: 1, level: 3, position: 1, maxCapacity: 200 },

                    { id: 10, zone: "B", street: 2, column: 2, level: 1, position: 1, maxCapacity: 800 },
                    { id: 11, zone: "B", street: 2, column: 2, level: 2, position: 1, maxCapacity: 400 },
                    { id: 12, zone: "B", street: 2, column: 2, level: 3, position: 1, maxCapacity: 200 },
                ]
            });
        }
    })

};
(async () => {
    await main()
})();

export default prismaClient;
