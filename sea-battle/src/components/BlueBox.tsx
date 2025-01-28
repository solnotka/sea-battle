import { Box, Text } from "grommet"
import { ReactNode } from "react"

export const BlueBox = ({ children } : { children: ReactNode }) => {
    return (<Box
        background={"rgb(6, 2, 49)"}
        color="white"
        alignSelf="center"
        margin={{top: "medium"}}
        pad="15px"
        style={{ borderRadius: "10px" }}
    >
        <Text>{children}</Text>
    </Box>
)}