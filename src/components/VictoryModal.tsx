import { Box } from "grommet"
import { IBattle } from "../interfaces"
import { Info } from "./Info"
import { PrimaryButton } from "./PrimaryButton"

export const VictoryModal = ({ battle, onClick }: { battle: IBattle, onClick: () => void }) => {
    return (
        <Box>
            <h3>Вы победили!</h3>
            <p>Игра длилась ходов: {battle.moveCount}</p>
            <p>На вашем поле осталось:</p>
            <Info alive field={battle.userField} />
            <PrimaryButton
                label="Закрыть окно"
                onClick={onClick}
                style={{ alignSelf: "center" }}
            />
        </Box>
    )
}

export const DefeatModal = ({ battle, onClick }: { battle: IBattle, onClick: () => void }) => {
    return (
        <Box>
            <h3>Победил ваш соперник</h3>
            <p>Игра длилась ходов: {battle.moveCount}</p>
            <p>Сопернику удалось сохранить:</p>
            <Info alive field={battle.opponentField} />
            <PrimaryButton
                label="Закрыть окно"
                onClick={onClick}
                style={{ alignSelf: "center" }}
            />
        </Box>
    )
}