export interface IField {
    field: number[][],
    addShip: (size: number) => void,
    removeShip: (row: number, column: number) => void,
    checkSpace: (row: number, column: number, size: number, direction: string) => void,
    changeField: (arr: number[]) => void,
    clearField: ()=> void
    shipCount: number
}