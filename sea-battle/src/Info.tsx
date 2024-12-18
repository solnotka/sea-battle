import { Box } from "grommet";
import { currentField } from "./Field/Field";
import { observer } from "mobx-react-lite";
import { getShipCount } from "./Field/utils";

export const Info = observer(({ dead = false } : {dead? : boolean} ) => {
    let shipCount = dead ? currentField.deadShipCount : currentField.shipCount
    
    let reportArr = dead ? [`Убито кораблей: ${shipCount["all"]}`] : [`Кораблей на поле: ${shipCount["all"]}`];

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
            alignSelf="start"
            background="white"
            border={{ color: dead ? "rgb(200, 10, 54)" : "rgb(6, 2, 49)", size: "small" }}
            gap="small"
            margin={{ left: "140px", top: "large" }}
            pad="medium"
            round="small"
            style={{color: dead ? "rgb(200, 10, 54)" : "black"}}
        >
            {dead && <Box>Выстрелов: {currentField.shotCount}</Box>}
            {reportArr.map((item, index) => {
                return (
                    <Box key={index}>
                        {item}
                    </Box>
                )
            })}
        </Box>
    )
})