import { Box } from 'grommet'
import { observer } from "mobx-react-lite";
import { GAME_STATE, IBattle, IField } from "../interfaces";
import { Cell } from "./Cell";
import { useState } from "react";
import { checkForOne } from "../utils/utilsForField";
import { isCellInCoords } from '../utils/utilsForCell';
import { PLAYER } from '../interfaces';

const fieldHead = ["А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К"];
const fieldLeft = ["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export const Field = observer(({ viewField, battle, player }:
    { viewField: IField, battle?: IBattle, player?: PLAYER }
) => {
    const [selectedCell, setSelectedCell] = useState([-1, -1])
    const [startedCell, setStartedCell] = useState([-1, -1]);

    const isStart = !startedCell.includes(-1);

    const onClickHandler = (row: number, column: number) => {
        if (viewField.gameState === GAME_STATE.ADD_SHIP) {
            if (!isStart && checkForOne(viewField.field, row, column)) {
                setStartedCell([row, column]);
            } else if (isStart) {
                viewField.addShipByUser(startedCell[0], startedCell[1], row, column);
                setStartedCell([-1, -1])
            }
        } else if (viewField.gameState === GAME_STATE.REMOVE_SHIP) {
            viewField.removeShip(row, column)
        } else if (viewField.gameState === GAME_STATE.SHOOT && battle && player === battle.player) {
            battle.shoot(player, row, column);
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
                                            cell={cell}
                                            rowIndex={rowIndex}
                                            columnIndex={columnIndex}
                                            startedCell={startedCell}
                                            selectedCell={selectedCell}
                                            isCellInPreview={
                                                isCellInCoords(
                                                    { x: rowIndex, y: columnIndex },
                                                    { x: startedCell[0], y: startedCell[1] },
                                                    { x: selectedCell[0], y: selectedCell[1] }
                                                )}
                                            onMouseOver={() => setSelectedCell([rowIndex, columnIndex])}
                                            onClick={() => onClickHandler(rowIndex, columnIndex)}
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