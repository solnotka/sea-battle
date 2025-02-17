import { ButtonExtendedProps } from "grommet";

export interface IField {
    field: number[][],
    gameState: GAME_STATE
    shotCount: number
    shipCount: IShipMap,
    deadShipCount: IShipMap,
    wounds: { x: number, y: number }[] | [],
    notShooted: { x: number, y: number }[] | [],
    addShip: (size: number) => void,
    addShipByUser: (startRow : number, startCol : number, endRow : number, endCol : number) => void,
    removeShip: (row: number, column: number) => void,
    shoot: (row: number, column: number) => void,
    shootShip: (row: number, column: number) => void,
    changeField: (arr: number[]) => void,
    clearField: () => void,
}

export interface IBattle {
    userField: IField,
    opponentField: IField,
    isGameStarted: boolean,
    player: PLAYER,
    winner: WINNER,
    moveCount: number,
    shoot: (player: PLAYER, row: number, col: number) => void
}

export interface IShipMap {
    "all" : number,
    [key : string] : number,
}

export interface ICoord {
    x: number;
    y: number;
}

export interface IButton extends ButtonExtendedProps{
    onClick: ()=>void,
    label: string, 
    size?: string
}

export enum CELL_STATE {
    EMPTY = 0,
    OCCUPIED = 1,
    EMPTY_KNOWN = 0.5,
    EMPTY_KNOWN_HOORAY = 0.6,
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

export enum PLAYER {
    USER = 'USER',
    OPPONENT = 'OPPONENT',
}

export enum WINNER {
    NO_WINNER = "NO_WINNER",
    USER = "USER",
    OPPONENT = "OPPONENT",
}
