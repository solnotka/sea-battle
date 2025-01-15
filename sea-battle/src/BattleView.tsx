import { Box } from "grommet";
import { observer } from "mobx-react-lite";
import { Field } from "./Field";
import { currentBattle } from "./Battle";
import { Info } from "./Info";
import { PrimaryButton } from "./PrimaryButton";

export const BattleView = observer(() => {
    return (
        <Box direction="row" gap="large">
            <Box direction="row" gap="large">
                <Box>
                <PrimaryButton
                        onClick={() => {
                            currentBattle.user.addShip(Math.ceil(Math.random() * 4));
                        }}
                        label="Заполнить поле вручную"
                    />
                    <PrimaryButton
                        onClick={() => {
                            currentBattle.user.changeField([4, 3, 3, 2, 2, 2, 1, 1, 1, 1]);
                        }}
                        label="Заполнить поле автоматически"
                    />
                    <PrimaryButton
                        onClick={() => {
                            currentBattle.user.clearField()
                        }}
                        label="Очистить поле"
                    />
                </Box>
                <Box align="center">
                    <p className="battle">Поле игрока</p>
                    <Field viewField={currentBattle.user} />
                    <Box direction="row">
                        <Info field={currentBattle.user} />
                        <Info field={currentBattle.user} dead />
                    </Box>
                </Box>
            </Box>
            <Box align="center">
                <p className="battle">Поле оппонента</p>
                <Field viewField={currentBattle.opponent} />
                <Box direction="row">
                    <Info field={currentBattle.opponent} />
                    <Info field={currentBattle.opponent} dead />
                </Box>
            </Box>

        </Box>
    )
})