import { computed, makeObservable, observable } from "mobx";
import { IField } from "../interfaces";
import { checkSpace, getShipCount } from "./utils";

export class Field implements IField {

    field = Array.from(Array(10), () => { return (Array(10).fill(0)); });
    game = false

    // Значения полей:
    // 0 — пусто
    // 1 — занято
    // 0.5 — выстрел по пустой клетке
    // –1 — ранен
    // —2 — убит

    constructor() {
        makeObservable(this,
            {
                field: observable,
                game: observable,
                shipCount: computed,
                deadShipCount: computed,
            })
    }

    get shipCount() {

        return getShipCount(this.field, [1, -1])
    }

    get deadShipCount() {

        return getShipCount(this.field, [-2])
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
                this.field[i][column] = 1;
            }

        } else if (direction === "horizontal") {
            for (let i = column; i < column + size; i++) {
                this.field[row][i] = 1;
            }
        }
        return this.field;
    }

    removeShip(row: number, column: number) {
        if (this.field[row][column] === 1) {
            this.field[row][column] = 0;

            if (column < 9) {
                for (let i = column + 1; i < 10; i++) {
                    if (this.field[row][i] === 0) {
                        break
                    } else this.field[row][i] = 0
                }
            }

            if (column > 0) {
                for (let i = column - 1; i >= 0; i--) {
                    if (this.field[row][i] === 0) {
                        break
                    } else this.field[row][i] = 0
                }
            }

            if (row < 9) {
                for (let i = row + 1; i < 10; i++) {
                    if (this.field[i][column] === 0) {
                        break
                    } else this.field[i][column] = 0
                }
            }

            if (row > 0) {
                for (let i = row - 1; i >= 0; i--) {
                    if (this.field[i][column] === 0) {
                        break
                    } else this.field[i][column] = 0
                }
            }

        }
    }

    shootShip(row: number, column: number) {

        if (this.field[row][column] === 1) {
            this.field[row][column] = -1;

        }

        let wounds = [[row, column]];

        if (column < 9) {
            for (let i = column + 1; i < 10; i++) {
                if (this.field[row][i] === 0 || this.field[row][i] === 0.5) {
                    break
                } else if (this.field[row][i] === -1) {
                    wounds.push([row, i])
                } else if (this.field[row][i] === 1) {
                    return;
                }
            }
        }

        if (column > 0) {
            for (let i = column - 1; i >= 0; i--) {
                if (this.field[row][i] === 0 || this.field[row][i] === 0.5) {
                    break
                } else if (this.field[row][i] === -1) {
                    wounds.push([row, i])
                } else if (this.field[row][i] === 1) {
                    return;
                }
            }
        }

        if (row < 9) {
            for (let i = row + 1; i < 10; i++) {
                if (this.field[i][column] === 0 || this.field[i][column] === 0.5) {
                    break
                } else if (this.field[i][column] === -1) {
                    wounds.push([i, column])
                } else if (this.field[i][column] === 1) {
                    return;
                }
            }
        }

        if (row > 0) {
            for (let i = row - 1; i >= 0; i--) {
                if (this.field[i][column] === 0 || this.field[i][column] === 0.5) {
                    break
                } else if (this.field[i][column] === -1) {
                    wounds.push([i, column])
                } else if (this.field[i][column] === 1) {
                    return;
                }
            }
        }

        wounds.forEach((item) => {
            let [rowIndex, colIndex] = item;
            this.field[rowIndex][colIndex] = -2;

            if (rowIndex > 0 && colIndex > 0 && this.field[rowIndex - 1][colIndex - 1] === 0) {
                this.field[rowIndex - 1][colIndex - 1] = 0.5;
            }
            if (rowIndex > 0 && this.field[rowIndex - 1][colIndex] === 0) {
                this.field[rowIndex - 1][colIndex] = 0.5;
            }
            if (rowIndex > 0 && colIndex < 9 && this.field[rowIndex - 1][colIndex + 1] === 0) {
                this.field[rowIndex - 1][colIndex + 1] = 0.5;
            }
            if (colIndex > 0 && this.field[rowIndex][colIndex - 1] === 0) {
                this.field[rowIndex][colIndex - 1] = 0.5;
            }
            if (colIndex < 9 && this.field[rowIndex][colIndex + 1] === 0) {
                this.field[rowIndex][colIndex + 1] = 0.5;
            }
            if (rowIndex < 9 && colIndex > 0 && this.field[rowIndex + 1][colIndex - 1] === 0) {
                this.field[rowIndex + 1][colIndex - 1] = 0.5;
            }
            if (rowIndex < 9 && this.field[rowIndex + 1][colIndex] === 0) {
                this.field[rowIndex + 1][colIndex] = 0.5;
            }
            if (rowIndex < 9 && colIndex < 9 && this.field[rowIndex + 1][colIndex + 1] === 0) {
                this.field[rowIndex + 1][colIndex + 1] = 0.5;
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
