import { makeObservable, observable } from "mobx";
import { IField } from "./interfaces";

export class Field implements IField {

    field

    constructor() {
        this.field = Array.from(Array(10), () => { return (Array(10).fill(0)); });
        makeObservable(this, 
            {field: observable})
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
            if (safeCounter >= 50) {
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
        console.log(`Добавлен корабль размера ${size}. Параметры: ${direction}, ${row}, ${column}`);
        return this.field;
    }

    //Это проверка, что корабль есть куда ставить
    checkSpace(row: number, column: number, size: number, direction: string) {

        // Тут я втупую проверяю квадратик 9×9 вокруг нужной клетки. Если все хорошо, он должен быть весь из нулей. Это чуть избыточно, но лучше ничего не придумалось
        let checkForOne = (row: number, column: number) => {
            if ((row > 0 && column > 0 && this.field[row - 1][column - 1] === 1) ||
                (row > 0 && this.field[row - 1][column] === 1) ||
                (row > 0 && column < 9 && this.field[row - 1][column + 1] === 1)  ||
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
    setField(arr: number[]) {
        arr.map((item) => this.addShip(item));

        return this.field;
    }

}

export const map = new Field()
