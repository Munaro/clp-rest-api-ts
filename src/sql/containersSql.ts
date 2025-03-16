import { Prisma } from "@prisma/client"

export const containersSql = {
    get: () => {
        return Prisma.sql`
SELECT tb_containers.id internalId,
       tb_containers.uniqueIdentifier containerId,
       strftime('%d/%m/%Y %H:%M:%S', datetime(tb_containers.receivedDate / 1000, 'unixepoch', 'localtime'))  receivedDate,       
       tb_containers.weight containerWeight,
       tb_containers_status.description status,       
       tb_locations.zone storedZone,
       tb_locations.street storedStreet,
       tb_locations."column" storedColumn,
       tb_locations.position storedPosition              
  FROM tb_containers
  JOIN tb_containers_status ON (tb_containers_status.id = tb_containers.statusId)
  JOIN tb_locations         ON (tb_locations.id         = tb_containers.locationId)        
        `
    }

}