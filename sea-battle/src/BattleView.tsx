import { Box } from "grommet";
import { observer } from "mobx-react-lite";
import { Field } from "./Field";
import { currentBattle, PLAYER } from "./Battle";
import { Info } from "./Info";
import { PrimaryButton } from "./PrimaryButton";
import { useEffect } from "react";
import { IBattle } from "./interfaces";

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
        if(!this.battle.isGameStarted) return;

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

export const BattleView = observer(() => {
    useEffect(() => {
        const opponentBot = new OpponentBot(currentBattle);
        opponentBot.start();

        return () => opponentBot.stop();
    }, []);

    return (
        <Box direction="row" gap="large">
            <Box direction="row" gap="large">
                <Box>
                    <PrimaryButton
                        onClick={() => {
                            currentBattle.userField.addShip(Math.ceil(Math.random() * 4));
                        }}
                        label="Заполнить поле вручную"
                    />
                    <PrimaryButton
                        onClick={() => {
                            currentBattle.userField.changeField([4, 3, 3, 2, 2, 2, 1, 1, 1, 1]);
                        }}
                        label="Заполнить поле автоматически"
                    />
                    <PrimaryButton
                        onClick={() => {
                            currentBattle.userField.clearField()
                        }}
                        label="Очистить поле"
                    />
                </Box>
                <Box align="center">
                    <p className="battle">Поле игрока</p>
                    <Field
                        viewField={currentBattle.userField}
                    // battle={currentBattle}
                    // player={PLAYER.USER}
                    />
                    <Box direction="row">
                        <Info field={currentBattle.userField} />
                        <Info field={currentBattle.userField} dead />
                    </Box>
                </Box>
            </Box>
            <Box align="center">
                <p className="battle">Поле оппонента</p>
                <Field
                    viewField={currentBattle.opponentField}
                    battle={currentBattle}
                    player={PLAYER.OPPONENT}
                />
                <Box direction="row">
                    <Info field={currentBattle.opponentField} />
                    <Info field={currentBattle.opponentField} dead />
                </Box>
            </Box>

        </Box>
    )
})