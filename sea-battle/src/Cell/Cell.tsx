import { Box, BoxExtendedProps } from "grommet";
import { CELL_STATE, GAME_STATE, IField } from "../interfaces";
import { getBackgroundColor, getSelectedColor, getStartedColor, shootOnClick } from "./cellUtils";
import { Close } from "grommet-icons";

interface ICell extends BoxExtendedProps {
    field: IField,
    cell: CELL_STATE,
    rowIndex: number,
    columnIndex: number,
    addFunction: (row: number, column: number) => void,
    startedCell: number[],
    isCellSelected: boolean,
}
export const Cell = ({ field, cell, rowIndex, columnIndex, addFunction, startedCell, isCellSelected, ...props }: ICell) => {

    return (
        <Box
            className="field-item"
            key={rowIndex * 10 + columnIndex}
            onClick={() => {
                if (field.gameState === GAME_STATE.ADD_SHIP) {
                    addFunction(rowIndex, columnIndex)
                } else if (field.gameState === GAME_STATE.REMOVE_SHIP) {
                    field.removeShip(rowIndex, columnIndex)
                } else if (field.gameState === GAME_STATE.SHOOT) {
                    shootOnClick(field, cell, rowIndex, columnIndex)
                } else
                    console.log(field.gameState)
            }}
            style={{
                backgroundColor:
                    field.gameState === GAME_STATE.ADD_SHIP && !!getStartedColor(field.field, rowIndex, columnIndex, startedCell) ?
                        getStartedColor(field.field, rowIndex, columnIndex, startedCell) :
                        field.gameState === GAME_STATE.ADD_SHIP && isCellSelected ?
                            getSelectedColor(field.field, rowIndex, columnIndex) :
                            getBackgroundColor(cell, field.gameState)
            }}
            {...props}
        >
            {cell === CELL_STATE.EMPTY_KNOWN && <Close size="35px" />}
        </Box>
    )
}