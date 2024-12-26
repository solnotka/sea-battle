import { computed, makeObservable, observable } from "mobx";
import { CELL_STATE, IField } from "../interfaces";
import { checkLineForShooting, checkSpace, getShipCount } from "./utils";

export class Field implements IField {

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
        let direction = Math.random() < 0.5 ? "vertical" : "horizontal";
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
        if (direction === "vertical") {
            for (let i = row; i < row + size; i++) {
                this.field[i][column] = CELL_STATE.OCCUPIED;
            }

        } else if (direction === "horizontal") {
            for (let i = column; i < column + size; i++) {
                this.field[row][i] = CELL_STATE.OCCUPIED;
            }
        }
        return this.field;
    }

    removeShip(row: number, column: number) {
        if (this.field[row][column] === CELL_STATE.OCCUPIED) {
            this.field[row][column] = CELL_STATE.EMPTY;

            const handleLineForRemove = (row: number, column: number, rowDirection: boolean, forward: boolean) => {

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
                    handleLineForRemove(row, column, boo, lean)
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
                let r = (rowIndex === 0 ? rowIndex : rowIndex - 1);
                r <= (rowIndex === 9 ? rowIndex : rowIndex + 1);
                r++
            ) {
                for (
                    let c = (colIndex === 0 ? colIndex : colIndex - 1);
                    c <= (colIndex === 9 ? colIndex : colIndex + 1);
                    c++
                ) {
                    if (this.field[r][c] === CELL_STATE.EMPTY) {
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

export const currentField = new Field()
