import { Box } from "grommet";
import { currentField } from "./Field";
import { observer } from "mobx-react-lite";

export const Info = observer(() => {
    return (
        <Box
            className="info"
            alignSelf="start"
            background="white"
            border={{ color: "rgb(6, 2, 49)", size: "small" }}
            gap="small"
            margin={{ left: "140px", top: "large"}}
            pad="medium"
            round="small"
        >
            {currentField.shipCountReport.map((item, index) => {
                return (
                    <Box key={index}>
                        {item}
                    </Box>
                )
            })}
        </Box>
    )
})