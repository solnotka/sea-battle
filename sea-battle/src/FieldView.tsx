import { useEffect } from "react";
import { map } from "./Field";
import { Box } from 'grommet'
import { observer } from "mobx-react-lite";

export const FieldView = observer (() => {
    useEffect(()=>{
        // map.setField([4, 3, 3, 2, 2, 2, 1, 1, 1, 1]);
    }, [])
    
    
    const fieldHead = ["А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К"];
    const fieldLeft = ["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
        <Box direction="row">
            <Box>
                {fieldLeft.map((item, index) => {
                    return (
                        <Box
                            className="field-item field-left"
                            key={index}
                            style = {{
                                borderTop: index===0 ? 0 : "1px solid rgb(6, 2, 49)",
                                borderBottom: index===(fieldLeft.length - 1) ? 0 : "1px solid rgb(6, 2, 49)",
                            }}
                        >
                            {item}
                        </Box>
                    )
                })}
            </Box>
            <Box
                className="field"
                direction="column"
            >
                <Box
                    direction="row">
                    {
                        fieldHead.map((item, index) => {
                            return (
                                <Box
                                    className="field-item field-top"
                                    key={index}
                                    style = {{
                                        borderRight: index===(fieldHead.length - 1) ? 0 : "1px solid rgb(6, 2, 49)",
                                    }}
                                    >
                                    {item}
                                </Box>
                            )
                        })}
                </Box>
                {
                    map.field.map((item, rowIndex) => {
                        return (
                            <Box
                                key={rowIndex}
                                direction="row"
                            >
                                {item.map((i, columnIndex) => {
                                    return (
                                        <Box
                                            className="field-item"
                                            key={rowIndex * 10 + columnIndex}
                                            style={{ backgroundColor: i ? "rgb(6, 2, 49)" : "white" }}
                                        />
                                    )
                                })}
                            </Box>
                        )
                    })}
            </Box >
        </Box >
    )
})