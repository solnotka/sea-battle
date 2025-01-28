import { Box } from "grommet";
import { observer } from "mobx-react-lite";
import { CELL_STATE, IField } from "../interfaces";
import { getShipCount, isFieldCorrect } from "../utils/utilsForField";

export const Info = observer(({ field, dead = false, alive = false }: { field: IField, dead?: boolean, alive?: boolean }) => {
    let shipCount = dead ? field.deadShipCount :
        alive ? getShipCount(field.field, [CELL_STATE.OCCUPIED, CELL_STATE.WOUNDED]) :
        field.shipCount

    let reportArr = dead ? [`Убито кораблей: ${shipCount["all"]}`] : [`Всего кораблей: ${shipCount["all"]}`];

    for (let key in shipCount) {
        if (key === "all") {
            continue
        } else {
            reportArr.push(`Кораблей размера ${key}: ${shipCount[key]}`)
        }
    }

    return (
        <Box
            className="info"
            alignSelf="center"
            background="white"
            border={{ color: dead ? "rgb(200, 10, 54)" : "rgb(6, 2, 49)", size: alive ? "0px" : "small"}}
            gap="small"
            margin={{ top: !alive ? "medium" : "small" }}
            pad={!alive ? "medium" : "small"}
            round="small"
            style={{ color: dead ? "rgb(200, 10, 54)" : "black" }}
        >
            {dead && <Box>Выстрелов: {field.shotCount}</Box>}
            {reportArr.map((item, index) => {
                return (
                    <Box key={index}>
                        {item}
                    </Box>
                )
            })}
            {isFieldCorrect(shipCount) && !dead && !alive ?
                <Box style={{ fontWeight: "bold" }}>Поле подходит для игры</Box> :
                !dead && !alive ?
                    <Box style={{ fontWeight: "bold", color: "red" }}>Поле не подходит для игры</Box> : ""
            }
        </Box>
    )
})