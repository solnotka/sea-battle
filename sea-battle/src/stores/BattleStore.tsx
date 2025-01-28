import { makeObservable, observable, computed } from "mobx";
import { FieldStore } from "./FieldStore";
import { IBattle, PLAYER, WINNER } from "../interfaces";
import { isFieldCorrect } from "../utils/utilsForField";

export class BattleStore implements IBattle {
    userField = new FieldStore();
    opponentField = new FieldStore();
    isGameStarted = false;
    moveCount = 0

    // Кто стреляет
    player: PLAYER = PLAYER.USER;

    constructor() {
        makeObservable(this,
            {
                userField: observable,
                opponentField: observable,
                isGameStarted: observable,
                player: observable,
                winner: computed,
                moveCount: observable,
            });
    }

    get winner() {
        if (isFieldCorrect(this.userField.deadShipCount)) {
            return WINNER.OPPONENT
        } else if (isFieldCorrect(this.opponentField.deadShipCount)) {
            return WINNER.USER
        } else return WINNER.NO_WINNER
    }

    shoot = (player: PLAYER, row: number, col: number) => {
        if(this.player === player) {
            switch(player) {
                case PLAYER.OPPONENT:                    
                    if(this.userField.shoot(row, col)) {
                        this.player = PLAYER.OPPONENT;
                    } else {
                        this.player = PLAYER.USER;
                        this.moveCount++
                    }
                break;    

                case PLAYER.USER:
                    if(this.opponentField.shoot(row, col)) {
                        this.player = PLAYER.USER;
                    } else {
                        this.player = PLAYER.OPPONENT;
                    }
                break;
            }
        }
    }
}

export const currentBattle = new BattleStore();