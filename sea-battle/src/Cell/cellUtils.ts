import { checkForOne } from "../Field/utils"
import { CELL_STATE, GAME_STATE, IField } from "../interfaces"

export const getBackgroundColor = (i: CELL_STATE, gameState: GAME_STATE) => {
    return (
        i === CELL_STATE.WOUNDED ? "rgb(200, 10, 54)" :
            i === CELL_STATE.DROWNED ? "rgb(77, 59, 64)" :
                (i === CELL_STATE.OCCUPIED || i === CELL_STATE.EMPTY) && gameState === GAME_STATE.SHOOT ? "rgb(172, 211, 222)" :
        i === CELL_STATE.OCCUPIED ? "rgb(6, 2, 49)" :
            "white"

)}

export const getStartedColor = (field : number[][], row : number, column : number, targetCell : number[]) => {
    const isSelected = row === targetCell[0] && column === targetCell[1];
    const isSpace = checkForOne(field, row, column);

    if (isSpace && isSelected) {
        return "rgb(37, 174, 97)"
    } else return undefined
}

export const getSelectedColor = (field : number[][], row : number, column : number) => {
    const isSpace = checkForOne(field, row, column);

    if (isSpace) {
        return "rgba(37, 174, 97, 0.5)"
    } else return "rgba(214, 29, 29, 0.5)"
}

// export const getPreviewColor = (field : number[][], row : number, column : number, cells : [number, number][]) => {
//     cells.forEach((item) => {
//         if (item[0] === row && item[1] == column)
//     })
// }

export interface ICoord {
    x: number;
    y: number;
}

export const isCellInCoords = (cell: ICoord, start: ICoord, end: ICoord): boolean => {
    if (cell.x === end.x && cell.x === start.x) {
        return (cell.y <= end.y && cell.y >= start.y) || 
        (cell.y >= end.y && cell.y <= start.y);
    }

    if (cell.y === end.y && cell.y === start.y) {
        return (cell.x <= end.x && cell.x >= start.x) || 
        (cell.x >= end.x && cell.x <= start.x);
    }

    // if (cell.x === end.x && cell.x === start.x) {
    //     const yStart = Math.min(start.y, end.y);
    //     const yEnd = Math.max(start.y, end.y);

    //     return cell.y <= yEnd && cell.y >= yStart;
    // }

    // if (cell.y === end.y && cell.y === start.y) {
    //     const xStart = Math.min(start.x, end.x);
    //     const xEnd = Math.max(start.x, end.x);

    //     return cell.x <= xEnd && cell.x >= xStart;
    // }

    return false;
}