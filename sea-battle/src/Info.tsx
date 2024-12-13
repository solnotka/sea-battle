import { Box } from "grommet";
import { currentField } from "./Field";
import { observer } from "mobx-react-lite";

export const Info = observer(() => {
    return (
        <Box>
            Я думаю, что здесь {currentField.shipCount} кораблей
        </Box>
    )
})