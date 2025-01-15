import { makeObservable, observable } from "mobx";
import { FieldStore } from "./Field/FieldStore";
import { CELL_STATE, GAME_STATE, IBattle, SHIP_DIRECTION } from "./interfaces";
import { checkSpace } from "./Field/utils";

export class Battle implements IBattle {

    user = new FieldStore();
    opponent = new FieldStore();
    game = false

    constructor() {
        makeObservable(this,
            {
                user: observable,
                opponent: observable,
                game: observable,

            });
        this.opponent.gameState = GAME_STATE.SHOOT;
    }

    addShip(row: number, column: number, size: number, direction: SHIP_DIRECTION) {
        let isSpace = checkSpace(this.user.field, row, column, size, direction);

        if (isSpace) {
            if (direction === SHIP_DIRECTION.VERTICAL) {
                for (let i = row; i < row + size; i++) {
                    this.user.field[i][column] = CELL_STATE.OCCUPIED;
                }

            } else if (direction === SHIP_DIRECTION.HORIZONTAL) {
                for (let i = column; i < column + size; i++) {
                    this.user.field[row][i] = CELL_STATE.OCCUPIED;
                }
            }
        }
    }
}

export const currentBattle = new Battle();