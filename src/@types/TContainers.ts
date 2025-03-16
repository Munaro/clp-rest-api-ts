type TContainersChangePosition = {
    containerId:  number;
    toLocationId: number;   
}

type TContainersUpdate = {
    containerId: number;
    statusId:    number;   
}


export type {
    TContainersUpdate,
    TContainersChangePosition
}
