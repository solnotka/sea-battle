import { Box } from "grommet";
import { observer } from "mobx-react-lite";
import { Field } from "./Field";
import { currentBattle, PLAYER } from "../stores/BattleStore";
import { Info } from "./Info";
import { useEffect } from "react";
import { IBattle } from "../interfaces";

class OpponentBot {
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

        const x = Math.ceil(Math.random() * 10);
        const y = Math.ceil(Math.random() * 10);

        try {
            this.battle.shoot(PLAYER.USER, x, y);
        } catch (e) {
            console.error(e);
        }

        this.shotCells.push({ x, y });
    }
}

export const Battle = observer(() => {
    useEffect(() => {
        const opponentBot = new OpponentBot(currentBattle);
        opponentBot.start();

        return () => opponentBot.stop();
    }, []);

    return (
        <Box direction="row" gap="large">
            <Box direction="row" gap="large">
                <Box align="center">
                    <p className="battle">Поле игрока</p>
                    <Field
                        viewField={currentBattle.userField}
                    // battle={currentBattle}
                    // player={PLAYER.USER}
                    />
                    <Info field={currentBattle.userField} dead />
                </Box>
            </Box>
            <Box align="center">
                <p className="battle">Поле оппонента</p>
                <Field
                    viewField={currentBattle.opponentField}
                    battle={currentBattle}
                    player={PLAYER.OPPONENT}
                />
                <Info field={currentBattle.opponentField} dead />
            </Box>

        </Box>
    )
})