import { currentField } from "./Field/Field";
import { Box } from 'grommet'
import { observer } from "mobx-react-lite";
import { Close } from 'grommet-icons'
import { CELL_STATE } from "./interfaces";

export const FieldView = observer(() => {

    const fieldHead = ["А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К"];
    const fieldLeft = ["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const onGame = (i: number, rowIndex : number, columnIndex : number) => {
        if (i === CELL_STATE.EMPTY) {
            currentField.field[rowIndex][columnIndex] = CELL_STATE.EMPTY_KNOWN;
            currentField.shotCount++;
        } else if (i === CELL_STATE.OCCUPIED) {
            currentField.shootShip(rowIndex, columnIndex);
            currentField.shotCount++;
        }
    }
    
    return (
        <Box direction="row">
            <Box>
                {fieldLeft.map((item, index) => {
                    return (
                        <Box
                            className="field-item field-left"
                            key={index}
                            style={{
                                borderTop: index === 0 ? 0 : "1px solid rgb(6, 2, 49)",
                                borderBottom: index === (fieldLeft.length - 1) ? 0 : "1px solid rgb(6, 2, 49)",
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
                                    style={{
                                        borderRight: index === (fieldHead.length - 1) ? 0 : "1px solid rgb(6, 2, 49)",
                                    }}
                                >
                                    {item}
                                </Box>
                            )
                        })}
                </Box>
                {
                    currentField.field.map((item, rowIndex) => {
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
                                            onClick={() =>
                                                currentField.game ?
                                                    onGame(i, rowIndex, columnIndex) :
                                                    currentField.removeShip(rowIndex, columnIndex)
                                            }
                                            style={{ backgroundColor: 
                                                i === CELL_STATE.WOUNDED ? "rgb(200, 10, 54)" :
                                                i === CELL_STATE.DROWNED ? "rgb(77, 59, 64)" :
                                                ((i === CELL_STATE.OCCUPIED || i === CELL_STATE.EMPTY) && currentField.game) ? "rgb(172, 211, 222)" :
                                                i === CELL_STATE.OCCUPIED ? "rgb(6, 2, 49)" : 
                                                "white" }}
                                        >
                                            {i === CELL_STATE.EMPTY_KNOWN && <Close size="35px"/>}
                                            </Box>
                                    )
                                })}
                            </Box>
                        )
                    })}
            </Box >
        </Box >
    )
})