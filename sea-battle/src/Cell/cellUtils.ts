import { checkForOne, checkSpace, getCheckParams } from "../Field/utils"
import { CELL_STATE, GAME_STATE, ICoord, IField } from "../interfaces"

export const getBackgroundColor = (cell: CELL_STATE, gameState: GAME_STATE) => {
    return (
        cell === CELL_STATE.WOUNDED ? "rgb(200, 10, 54)" :
            cell === CELL_STATE.DROWNED ? "rgb(77, 59, 64)" :
                (cell === CELL_STATE.OCCUPIED || cell === CELL_STATE.EMPTY) && gameState === GAME_STATE.SHOOT ? "rgb(172, 211, 222)" :
                    cell === CELL_STATE.OCCUPIED ? "rgb(6, 2, 49)" :
                        "white"
    )
}

export const getStartedColor = (field: number[][], row: number, column: number, targetCell: number[]) => {
    const isSelected = row === targetCell[0] && column === targetCell[1];
    const isSpace = checkForOne(field, row, column);

    if (isSpace && isSelected) {
        return "rgb(37, 174, 97)"
    } else return undefined
}

export const getSelectedColor = (field: number[][], row: number, column: number) => {
    const isSpace = checkForOne(field, row, column);

    if (isSpace) {
        return "rgba(37, 174, 97, 0.5)"
    } else return "rgba(214, 29, 29, 0.5)"
}

export const getPreviewColor = (field: number[][], start: ICoord, end: ICoord) => {
    const [minRow, minCol, size, direction] = getCheckParams(start.x, start.y, end.x, end.y);
    const isSpace = minRow !== -1 && checkSpace(field, minRow, minCol, size, direction);
    if (isSpace) {
        return "rgba(37, 174, 97, 0.5)"
    } else return "rgba(214, 29, 29, 0.5)"
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

    return false;
}

export const background = (
    field: IField,
    cell: CELL_STATE,
    rowIndex: number,
    columnIndex: number,
    startedCell: number[],
    selectedCell: number[],
    isCellInPreview: boolean,
) => {
    if (field.gameState === GAME_STATE.ADD_SHIP) {
        if (isCellInPreview) {
            return getPreviewColor(
                field.field,
                { x: startedCell[0], y: startedCell[1] },
                { x: selectedCell[0], y: selectedCell[1] }
            )
        } else if (!!getStartedColor(field.field, rowIndex, columnIndex, startedCell)) {
            return getStartedColor(field.field, rowIndex, columnIndex, startedCell)
        } else if (selectedCell[0] === rowIndex && selectedCell[1] === columnIndex && cell !== CELL_STATE.OCCUPIED) {
            return getSelectedColor(field.field, rowIndex, columnIndex)
        }
    }
    return getBackgroundColor(cell, field.gameState)
}