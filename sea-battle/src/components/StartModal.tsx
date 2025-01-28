import { Box, Text } from "grommet"
import { PrimaryButton } from "./PrimaryButton"

export const StartModal = ( { onClick } : { onClick : () => void} ) => {
    return (
        <Box gap="medium">
            <Text>Вот сколько кораблей должно быть на поле:</Text>
            <Box style={{ marginLeft: "25px" }}>
                <Text>Кораблей на поле: 10</Text>
                <Text>Кораблей размера 4: 1</Text>
                <Text>Кораблей размера 3: 2</Text>
                <Text>Кораблей размера 2: 3</Text>
                <Text>Кораблей размера 1: 4</Text>
            </Box>
            <Text>Поставьте корабли правильно — и сможете начать игру.</Text>
            <PrimaryButton
                label="Закрыть окно"
                onClick={onClick}
                style={{ alignSelf: "center" }}
            />
        </Box>
    )
}