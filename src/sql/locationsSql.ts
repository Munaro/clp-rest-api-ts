import { Prisma } from "@prisma/client"

export const locationsSql = {
    get: (isEmpty: boolean) => {
        return Prisma.sql`
SELECT tb_locations.id,
       tb_locations."zone",
 	   tb_locations.street,
	   tb_locations."column",
	   tb_locations."level",
	   tb_locations.position,
	   tb_locations.maxCapacity	
  FROM tb_locations
  ${isEmpty ? Prisma.sql` WHERE NOT EXISTS (SELECT 1 FROM tb_containers WHERE tb_containers.locationId = tb_locations.id AND tb_containers.statusId <> 3)  ` : Prisma.empty}
`
    }
}