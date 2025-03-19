type TContainersChangePosition = {
    containerId:  number;
    toLocationId: number | null;   
}

type TContainersUpdate = {
    containerId: number;
    statusId:    number;   
}


export type {
    TContainersUpdate,
    TContainersChangePosition
}
