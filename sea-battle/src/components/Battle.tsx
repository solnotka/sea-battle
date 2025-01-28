import { Box } from "grommet";
import { observer } from "mobx-react-lite";
import { Field } from "./Field";
import { currentBattle } from "../stores/BattleStore";
import { PLAYER } from "../interfaces"
import { Info } from "./Info";
import { useEffect } from "react";
import { OpponentBot } from "../stores/OpponentBot"
import { BlueBox } from "./BlueBox";

export const Battle = observer(() => {
    
    useEffect(() => {
        const opponentBot = new OpponentBot(currentBattle);
        opponentBot.start();

        return () => opponentBot.stop();
    }, []);

    return (
        <Box >
            <BlueBox>Количество ходов: {currentBattle.moveCount}</BlueBox>
            <Box direction="row" gap="large">
                <Box direction="row" gap="large" justify="center">
                    <Info field={currentBattle.userField} dead />
                    <Box align="center">
                        <p className="battle">Поле игрока</p>
                        <Field
                            viewField={currentBattle.userField}
                            battle={currentBattle}
                            player={PLAYER.OPPONENT}
                        />
                        {currentBattle.player === PLAYER.OPPONENT ? <BlueBox>Ходит противник</BlueBox> : <BlueBox> ... </BlueBox>}
                    </Box>
                </Box>
                <Box align="center">
                    <p className="battle">Поле оппонента</p>
                    <Field
                        viewField={currentBattle.opponentField}
                        battle={currentBattle}
                        player={PLAYER.USER}
                    />
                    {currentBattle.player === PLAYER.USER ? <BlueBox>Ваш ход</BlueBox> : <BlueBox> ... </BlueBox>}
                </Box>
                <Info field={currentBattle.opponentField} dead />
            </Box>
        </Box>
    )
})