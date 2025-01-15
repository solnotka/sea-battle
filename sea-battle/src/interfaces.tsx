import { PLAYER } from "./Battle"

export interface IField {
    field: number[][],
    gameState: GAME_STATE
    shotCount: number
    shipCount: Record<number | string, number>,
    deadShipCount: Record<number | string, number>,
    addShip: (size: number) => void,
    shoot: (row: number, column: number) => void,
    addShipByUser: (startRow : number, startCol : number, endRow : number, endCol : number) => void,
    removeShip: (row: number, column: number) => void,
    shootShip: (row: number, column: number) => void,
    changeField: (arr: number[]) => void,
    clearField: () => void,
}

export interface IBattle {
    userField: IField,
    opponentField: IField,
    isGameStarted: boolean,
    shoot: (player: PLAYER, row: number, col: number) => void
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