import { computed, makeObservable, observable } from "mobx";
import { CELL_STATE, IField, SHIP_DIRECTION } from "../interfaces";
import { checkLineForShooting, checkSpace, getShipCount } from "./utils";

export class FieldStore implements IField {

    field = Array.from(Array(10), () => { return (Array(10).fill(0)); });
    game = false;
    shotCount = 0;

    constructor() {
        makeObservable(this,
            {
                field: observable,
                game: observable,
                shotCount: observable,
                shipCount: computed,
                deadShipCount: computed,
            })
    }

    get shipCount() {

        return getShipCount(this.field, [CELL_STATE.OCCUPIED, CELL_STATE.WOUNDED])
    }

    get deadShipCount() {

        return getShipCount(this.field, [CELL_STATE.DROWNED])
    }

    addShip(size: number) {
        let direction = Math.random() < 0.5 ? SHIP_DIRECTION.VERTICAL : SHIP_DIRECTION.HORIZONTAL;
        let row = Math.floor(Math.random() * 10);
        let column = Math.floor(Math.random() * 10);
        let isSpace = checkSpace(this.field, row, column, size, direction);

        //Это чтобы случайно не упасть в бесконечный цикл. За 50 повторений обычно получается поставить все корабли
        let safeCounter = 0;

        // Это если сразу не сгенерится нормальная координата
        while (!isSpace) {
            row = Math.floor(Math.random() * 10);
            column = Math.floor(Math.random() * 10);
            isSpace = checkSpace(this.field, row, column, size, direction);
            safeCounter++;
            if (safeCounter >= 100) {
                console.log(`Не удалось разместить корабль размера ${size} с параметрами ${direction}, ${row}, ${column}`);
                return;
            }
        }

        // Тут я считаю, что все хорошо и можно добавлять корабль
        if (direction === SHIP_DIRECTION.VERTICAL) {
            for (let i = row; i < row + size; i++) {
                this.field[i][column] = CELL_STATE.OCCUPIED;
            }

        } else if (direction === SHIP_DIRECTION.HORIZONTAL) {
            for (let i = column; i < column + size; i++) {
                this.field[row][i] = CELL_STATE.OCCUPIED;
            }
        }
        return this.field;
    }

    addShipByUser(startRow : number, startCol : number, endRow : number, endCol : number) {
        let size = 0;
        let direction = SHIP_DIRECTION.VERTICAL;
        const minRow = startRow <= endRow ? startRow : endRow;
        const minCol = startCol <= endCol ? startCol : endCol

        if (startRow !== endRow && startCol !== endCol) {
            return
        } else if (startRow === endRow && startCol === endCol) {
            size = 1;
        } else if (startRow === endRow && startCol !== endCol) {
            size = Math.abs(endCol - startCol) + 1;
            direction = SHIP_DIRECTION.HORIZONTAL
        }else if (startRow !== endRow && startCol === endCol) {
            size = Math.abs(endRow - startRow) + 1;
            direction = SHIP_DIRECTION.VERTICAL
        }

        if (checkSpace(this.field, minRow, minCol, size, direction)) {
            if (direction === SHIP_DIRECTION.VERTICAL) {
                for (let i = minRow; i < minRow + size; i++) {
                    this.field[i][minCol] = CELL_STATE.OCCUPIED;
                }
    
            } else if (direction === SHIP_DIRECTION.HORIZONTAL) {
                for (let i = minCol; i < minCol + size; i++) {
                    this.field[minRow][i] = CELL_STATE.OCCUPIED;
                }
            }
        }
    }

    removeShip(row: number, column: number) {
        if (this.field[row][column] === CELL_STATE.OCCUPIED) {
            this.field[row][column] = CELL_STATE.EMPTY;

            const handleLine = (row: number, column: number, rowDirection: boolean, forward: boolean) => {

                for (
                    let i = rowDirection ? column : row;
                    forward ? i < 10 : i >= 0;
                    forward ? i++ : i--
                ) {
                    if ((rowDirection && i === column) || (!rowDirection && i === row)) {
                        continue;
                    } else if ((rowDirection && this.field[row][i] === CELL_STATE.EMPTY) ||
                        (!rowDirection && this.field[i][column] === CELL_STATE.EMPTY)) {
                        break;
                    } else if (rowDirection) {
                        this.field[row][i] = CELL_STATE.EMPTY;
                    } else if (!rowDirection) {
                        this.field[i][column] = CELL_STATE.EMPTY;
                    }
                }
            }

            for (let boo of [true, false]) {
                for (let lean of [true, false]) {
                    handleLine(row, column, boo, lean)
                }
            }

        }
    }

    shootShip(row: number, column: number) {

        if (this.field[row][column] === CELL_STATE.OCCUPIED) {
            this.field[row][column] = CELL_STATE.WOUNDED;
        }

        let wounds = [[row, column]];

        for (let boo of [true, false]) {
            for (let lean of [true, false]) {
                let newWounds = checkLineForShooting(this.field, row, column, boo, lean)
                if (!newWounds) {
                    return;
                } else wounds = wounds.concat(newWounds)
            }
        }

        wounds.forEach((item) => {
            let [rowIndex, colIndex] = item;
            this.field[rowIndex][colIndex] = CELL_STATE.DROWNED;

            for (
                let r = rowIndex - 1; r <= rowIndex + 1; r++
            ) {
                for (
                    let c = colIndex - 1; c <= colIndex + 1; c++
                ) {
                    if (r < 0 || r > 9 || c < 0 || c > 9) {
                        continue
                    } else if (this.field[r][c] === CELL_STATE.EMPTY) {
                        this.field[r][c] = CELL_STATE.EMPTY_KNOWN;
                    }
                }
            }
        })

    }


    //Эта функция у меня добавляет сразу все корабли. Для каждого нужно передать размер
    changeField(arr: number[]) {
        this.clearField()
        arr.map((item) => this.addShip(item));

        return this.field;
    }

    clearField() {
        this.field = Array.from(Array(10), () => { return (Array(10).fill(0)); });
    }

}

export const currentField = new FieldStore()
