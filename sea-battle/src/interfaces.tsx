export interface IField {
    field: number[][],
    game: boolean
    shotCount: number
    shipCount: Record<number | string, number>,
    deadShipCount: Record<number | string, number>,
    addShip: (size: number) => void,
    removeShip: (row: number, column: number) => void,
    shootShip: (row: number, column: number) => void,
    changeField: (arr: number[]) => void,
    clearField: ()=> void,
}

export enum CELL_STATE {
    EMPTY = 0,
    OCCUPIED = 1,
    EMPTY_KNOWN = 0.5,
    WOUNDED = -1,
    DROWNED = -2
}