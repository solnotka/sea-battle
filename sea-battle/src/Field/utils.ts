// Это чтобы проверить квадратик 9×9 вокруг нужной клетки
export const checkForOne = (field: number[][], row: number, column: number) => {
    if ((row > 0 && column > 0 && field[row - 1][column - 1] === 1) ||
        (row > 0 && field[row - 1][column] === 1) ||
        (row > 0 && column < 9 && field[row - 1][column + 1] === 1) ||
        (column > 0 && field[row][column - 1] === 1) ||
        (field[row][column] === 1) ||
        (column < 9 && field[row][column + 1] === 1) ||
        (row < 9 && column > 0 && field[row + 1][column - 1] === 1) ||
        (row < 9 && field[row + 1][column] === 1) ||
        (row < 9 && column < 9 && field[row + 1][column + 1] === 1)) {
        return false;
    }
    return true;
};

export const checkSpace = (field: number[][], row: number, column: number, size: number, direction: string) => {

    //Общая проверка для всех квадратиков, на которые должен встать корабль
    if (direction === "horizontal") {
        for (let i = column; i < column + size; i++) {
            if (i > 9) {
                return false;
            }
            if (!checkForOne(field, row, i)) {
                return false;

            }
        }
    } else if (direction === "vertical") {
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

                        while ( newRow >= 0 && ind.includes(field[newRow][col]))  {
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