import { CELL_STATE, SHIP_DIRECTION } from "../interfaces";


// Это чтобы проверить квадратик 9×9 вокруг нужной клетки
export const checkForOne = (field: number[][], row: number, column: number) => {
    for (
        let rowInd = row - 1; rowInd <= row + 1; rowInd++
    ) {
        for (
            let colInd = column - 1; colInd <= column + 1; colInd++
        ) {
            if (rowInd < 0 || rowInd > 9 || colInd < 0 || colInd > 9) {
                continue
            } else if (field[rowInd][colInd] === CELL_STATE.OCCUPIED) {
                return false
            }
        }
    }
    return true;
};

export const getCheckParams = (startRow: number, startCol: number, endRow: number, endCol: number) => {
    let size = 0;
    let direction = SHIP_DIRECTION.VERTICAL;
    const minRow = startRow <= endRow ? startRow : endRow;
    const minCol = startCol <= endCol ? startCol : endCol

    if (startRow !== endRow && startCol !== endCol) {
        return [-1, 0, 1, SHIP_DIRECTION.VERTICAL]
    } else 
    if (startRow === endRow && startCol === endCol) {
        size = 1;
    } else if (startRow === endRow && startCol !== endCol) {
        size = Math.abs(endCol - startCol) + 1;
        direction = SHIP_DIRECTION.HORIZONTAL
    }else if (startRow !== endRow && startCol === endCol) {
        size = Math.abs(endRow - startRow) + 1;
        direction = SHIP_DIRECTION.VERTICAL
    }
    return [minRow, minCol, size, direction]
}

export const checkSpace = (field: number[][], row: number, column: number, size: number, direction: SHIP_DIRECTION) => {

    //Общая проверка для всех квадратиков, на которые должен встать корабль
    if (direction === SHIP_DIRECTION.HORIZONTAL) {
        for (let i = column; i < column + size; i++) {
            if (i > 9) {
                return false;
            }
            if (!checkForOne(field, row, i)) {
                return false;

            }
        }
    } else if (direction === SHIP_DIRECTION.VERTICAL) {
        for (let i = row; i < row + size; i++) {
            if (i > 9) {
                return false;
            }
            if (!checkForOne(field, i, column)) {
                return false;
            }
        }
    }
    return true;
}

export const getShipCount = (field: number[][], ind: number[]) => {

    let shipMap: Record<number | string, number> = {};
    let count = 0;
    let size = 0;

    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            if (ind.includes(field[row][col])) {

                // Если это вертикальный корабль и ниже он продолжается, то его пока пропускаем. Обработаем на последней клеточке
                if (row < 9 && ind.includes(field[row + 1][col])) {
                    continue
                } else {
                    // Тут обрабатываем вертикальные корабли на их последних клеточках
                    if (row > 0 && ind.includes(field[row - 1][col])) {
                        count++

                        let verticalSize = 1;
                        let newRow = row - 1

                        while (newRow >= 0 && ind.includes(field[newRow][col])) {
                            verticalSize++
                            newRow--
                        }


                        if (shipMap[verticalSize]) {
                            shipMap[verticalSize]++
                        } else shipMap[verticalSize] = 1

                        // Тут у нас единички и горизонтальные корабли
                    } else {

                        size++

                        // Проверяем, что корабль заканчивается на этой клеточке
                        if (col === 9 || !ind.includes(field[row][col + 1])) {
                            count++

                            if (shipMap[size]) {
                                shipMap[size]++
                            } else shipMap[size] = 1

                            size = 0;
                        }
                    }

                }
            }
        }
    }
    shipMap["all"] = count
    return shipMap
}

export const checkLineForShooting = (field: number[][], row: number, column: number, rowDirection: boolean, forward: boolean) => {

    let lineWounds = []

    for (
        let i = rowDirection ? column : row;
        forward ? i < 10 : i >= 0;
        forward ? i++ : i--
    ) {
        if ((rowDirection && i === column) || (!rowDirection && i === row)) {
            continue;
        } else if ((rowDirection && [CELL_STATE.EMPTY, CELL_STATE.EMPTY_KNOWN].includes(field[row][i])) ||
            (!rowDirection && [CELL_STATE.EMPTY, CELL_STATE.EMPTY_KNOWN].includes(field[i][column]))) {
            return lineWounds;
        } else if (rowDirection && field[row][i] === CELL_STATE.WOUNDED) {
            lineWounds.push([row, i])
        } else if (!rowDirection && field[i][column] === CELL_STATE.WOUNDED) {
            lineWounds.push([i, column])
        } else if ((rowDirection && field[row][i] === CELL_STATE.OCCUPIED) ||
            (!rowDirection && field[i][column] === CELL_STATE.OCCUPIED)) {
            return null
        }
    }
    return lineWounds
}