import { IBattle, PLAYER } from "../interfaces"
import { isCoordInArray } from "../utils/utilsForField";

export class OpponentBot {
    shotCells: any[] = [];
    battle: IBattle;
    intervalId?: NodeJS.Timer;

    constructor(battle: IBattle) {
        this.battle = battle;
    }

    start() {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(() => this.shot(), 1000);
    }

    stop() {
        clearInterval(this.intervalId);
    }

    shot = () => {
        if (!this.battle.isGameStarted) return;

        const freeCells = this.battle.userField.notShooted;
        const wounds = this.battle.userField.wounds

        let xs = -1;
        let ys = -1;

        if (wounds.length > 0) {

            let wound = wounds[Math.floor(Math.random() * wounds.length)]

            while (xs < 0 || xs > 9 || ys < 0 || ys > 9) {
                
                const coords = [
                    { x: wound.x, y: wound.y - 1 },
                    { x: wound.x, y: wound.y + 1 },
                    { x: wound.x - 1, y: wound.y },
                    { x: wound.x + 1, y: wound.y }
                ]
                    .filter((item) => isCoordInArray(item, freeCells))

                if (coords.length > 0) {
                    const coord = coords[Math.floor(Math.random() * coords.length)]

                    xs = coord.x;
                    ys = coord.y;
                    break;

                } else wound = wounds[Math.floor(Math.random() * wounds.length)]
            }
        } else {
            const randomCoord = freeCells[Math.floor(Math.random() * freeCells.length)];

            xs = randomCoord.x;
            ys = randomCoord.y;
        }


        try {
            this.battle.shoot(PLAYER.OPPONENT, xs, ys);
        } catch (e) {
            console.error(e);
        }
    }
}