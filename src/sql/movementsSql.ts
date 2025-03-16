import { Prisma } from "@prisma/client"

export const movementsSql = {    
    getLogMovements: (id: number) => {
        return Prisma.sql`
   SELECT strftime('%d/%m/%Y %H:%M:%S', datetime(tb_container_movements.movedAt / 1000, 'unixepoch', 'localtime')) movedAt,
   		 (COALESCE(locationFrom.id, 0) > 0) haveFrom,
   		  locationFrom.zone fromZone,
	      locationFrom.street fromStreet,
          locationFrom."column" fromColumn,
          locationFrom.position fromPosition,
         (COALESCE(locationTo.id, 0) > 0) haveTo,
   		  locationTo.zone toZone,
	      locationTo.street toStreet,
          locationTo."column" toColumn,
          locationTo.position toPosition
     FROM tb_container_movements
LEFT JOIN tb_locations locationFrom ON (locationFrom.id = tb_container_movements.fromLocationId)
LEFT JOIN tb_locations locationTo   ON (locationTo.id   = tb_container_movements.toLocationId)
    WHERE tb_container_movements.containerId = ${id}
    ORDER BY tb_container_movements.id desc
        `
    }
}