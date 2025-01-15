export interface IField {
    field: number[][],
    game: boolean
    shotCount: number
    shipCount: Record<number | string, number>,
    deadShipCount: Record<number | string, number>,
    addShip: (size: number) => void,
    addShipByUser: (startRow : number, startCol : number, endRow : number, endCol : number) => void,
    removeShip: (row: number, column: number) => void,
    shootShip: (row: number, column: number) => void,
    changeField: (arr: number[]) => void,
    clearField: () => void,
}

export interface IBattle {
    user: IField,
    opponent: IField,
    game: boolean,
}

export enum CELL_STATE {
    EMPTY = 0,
    OCCUPIED = 1,
    EMPTY_KNOWN = 0.5,
    WOUNDED = -1,
    DROWNED = -2
}

export enum GAME_STATE {
    ADD_SHIP = "ADD_SHIP",
    SHOOT = "SHOOT",
    REMOVE_SHIP = "REMOVE_SHIP",
    INIT = "INIT"
}

export enum SHIP_DIRECTION {
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical"
}