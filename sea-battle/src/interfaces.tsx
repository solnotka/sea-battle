export interface IField {
    field: number[][],
    addShip: (size: number) => void,
    checkSpace: (row: number, column: number, size: number, direction: string) => void,
    setField: (arr: number[]) => void,
}