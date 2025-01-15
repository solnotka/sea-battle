import { currentField } from "./Field/FieldStore";
import { Box } from 'grommet'
import { observer } from "mobx-react-lite";
import { GAME_STATE, IField } from "./interfaces";
import { Cell } from "./Cell/Cell";
import { useState } from "react";
import { checkForOne } from "./Field/utils";

const fieldHead = ["А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К"];
const fieldLeft = ["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export const Field = observer(({ viewField = currentField, gameState = GAME_STATE.INIT }: { viewField?: IField, gameState?: GAME_STATE }) => {

    const [selectedCell, setSelectedCell] = useState([-1, -1])

    const isCellSelected = (row: number, col: number) => {
        if (startedCell.includes(-1)) {
            return row === selectedCell[0] && col === selectedCell[1]
        } else return false
    }

    const [startedCell, setStartedCell] = useState([-1, -1]);
    const isStart = !startedCell.includes(-1);

    const addFunction = (row: number, column: number) => {
        if (!isStart && checkForOne(viewField.field, row, column)) {
            setStartedCell([row, column]);
        } else if (isStart) {
            viewField.addShipByUser(startedCell[0], startedCell[1], row, column);
            setStartedCell([-1, -1])
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
                    viewField.field.map((item, rowIndex) => {
                        return (
                            <Box
                                key={rowIndex}
                                direction="row"
                            >
                                {item.map((cell, columnIndex) => {
                                    return (
                                        <Cell
                                            field={viewField}
                                            gameState={gameState}
                                            cell={cell}
                                            rowIndex={rowIndex}
                                            columnIndex={columnIndex}
                                            addFunction={() => addFunction(rowIndex, columnIndex)}
                                            startedCell={startedCell}
                                            isCellSelected={isCellSelected(rowIndex, columnIndex)}
                                            onMouseOver={() => setSelectedCell([rowIndex, columnIndex])}
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