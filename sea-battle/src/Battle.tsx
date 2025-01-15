import { makeObservable, observable } from "mobx";
import { FieldStore } from "./Field/FieldStore";
import { GAME_STATE, IBattle } from "./interfaces";

export enum PLAYER {
    USER = 'USER',
    OPPONENT = 'OPPONENT',
}

export class Battle implements IBattle {
    userField = new FieldStore();
    opponentField = new FieldStore();
    isGameStarted = false

    // В кого стреляем
    shootOrder: PLAYER = PLAYER.OPPONENT;

    constructor() {
        makeObservable(this,
            {
                userField: observable,
                opponentField: observable,
                isGameStarted: observable,

            });
        this.opponentField.gameState = GAME_STATE.SHOOT;
    }

    shoot = (player: PLAYER, row: number, col: number) => {
        if(this.shootOrder === player) {
            switch(player) {
                case PLAYER.USER:                    
                    if(this.userField.shoot(row, col)) {
                        this.shootOrder = PLAYER.USER;
                    } else {
                        this.shootOrder = PLAYER.OPPONENT;
                    }
                break;    

                case PLAYER.OPPONENT:
                    if(this.opponentField.shoot(row, col)) {
                        this.shootOrder = PLAYER.OPPONENT;
                    } else {
                        this.shootOrder = PLAYER.USER;
                    }
                break;
            }
        }
    }
}

export const currentBattle = new Battle();