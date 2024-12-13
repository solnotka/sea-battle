import { computed, makeObservable, observable } from "mobx";
import { IField } from "./interfaces";

export class Field implements IField {

    field = Array.from(Array(10), () => { return (Array(10).fill(0)); });

    constructor() {
        makeObservable(this,
            {
                field: observable,
                shipCount: computed
            })
    }

    get shipCount() {

        let shipMap: Record<number | string, number> = {};
        let count = 0;
        let size = 0;

        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                if (this.field[row][col] === 1) {
                    // Если это вертикальный корабль и ниже он продолжается, то его пока пропускаем. Обработаем на последней клеточке
                    if (row < 9 && this.field[row + 1][col] === 1) {
                        continue
                    } else {
                        // Тут обрабатываем вертикальные корабли на их последних клеточках
                        if (row > 0 && this.field[row - 1][col] === 1) {
                            count++

                            let verticalSize = 1;
                            let newRow = row - 1

                            while (this.field[newRow][col] === 1 && newRow >= 0) {
                                verticalSize++
                                newRow--
                            }


                            if (shipMap[verticalSize]) {
                                shipMap[verticalSize]++
                            } else shipMap[verticalSize] = 1
                            // Тут у нас единички и горизонтальные корабли
                        } else {

                            size++

                            if (col === 9 || this.field[row][col + 1] === 0) {
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
        console.log(shipMap)
        return count
    }

    addShip(size: number) {
        let direction = Math.random() < 0.5 ? "vertical" : "horizontal";
        let row = Math.floor(Math.random() * 10);
        let column = Math.floor(Math.random() * 10);
        let isSpace = this.checkSpace(row, column, size, direction);

        //Это чтобы случайно не упасть в бесконечный цикл. За 50 повторений обычно получается поставить все корабли
        let safeCounter = 0;

        // Это если сразу не сгенерится нормальная координата
        while (!isSpace) {
            row = Math.floor(Math.random() * 10);
            column = Math.floor(Math.random() * 10);
            isSpace = this.checkSpace(row, column, size, direction);
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

    //Это проверка, что корабль есть куда ставить
    checkSpace(row: number, column: number, size: number, direction: string) {

        // Тут я втупую проверяю квадратик 9×9 вокруг нужной клетки. Если все хорошо, он должен быть весь из нулей. Это чуть избыточно, но лучше ничего не придумалось
        let checkForOne = (row: number, column: number) => {
            if ((row > 0 && column > 0 && this.field[row - 1][column - 1] === 1) ||
                (row > 0 && this.field[row - 1][column] === 1) ||
                (row > 0 && column < 9 && this.field[row - 1][column + 1] === 1) ||
                (column > 0 && this.field[row][column - 1] === 1) ||
                (this.field[row][column] === 1) ||
                (column < 9 && this.field[row][column + 1] === 1) ||
                (row < 9 && column > 0 && this.field[row + 1][column - 1] === 1) ||
                (row < 9 && this.field[row + 1][column] === 1) ||
                (row < 9 && column < 9 && this.field[row + 1][column + 1] === 1)) {
                return false;
            }
            return true;
        };

        //Теперь запускаю проверки для всех квадратиков, на которые должен встать корабль
        if (direction === "horizontal") {
            for (let i = column; i < column + size; i++) {
                if (i > 9) {
                    return false;
                }
                if (!checkForOne(row, i)) {
                    return false;

                }
            }
        } else if (direction === "vertical") {
            for (let i = row; i < row + size; i++) {
                if (i > 9) {
                    return false;
                }
                if (!checkForOne(i, column)) {
                    return false;
                }
            }
        }
        return true;
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
