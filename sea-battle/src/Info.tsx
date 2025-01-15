import { Box } from "grommet";
import { observer } from "mobx-react-lite";
import { IField } from "./interfaces";

export const Info = observer(({ field, dead = false } : {field: IField, dead? : boolean} ) => {
    let shipCount = dead ? field.deadShipCount : field.shipCount
    
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
            alignSelf="center"
            background="white"
            border={{ color: dead ? "rgb(200, 10, 54)" : "rgb(6, 2, 49)", size: "small" }}
            gap="small"
            margin={{ top: "large", left: "35px" }}
            pad="medium"
            round="small"
            style={{color: dead ? "rgb(200, 10, 54)" : "black"}}
        >
            {dead && <Box>Выстрелов: {field.shotCount}</Box>}
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