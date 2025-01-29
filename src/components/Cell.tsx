import { Box, BoxExtendedProps } from "grommet";
import { CELL_STATE, IField } from "../interfaces";
import { getBackgroundColor } from "../utils/utilsForCell";
import { Close, StatusGoodSmall } from "grommet-icons";

interface ICell extends BoxExtendedProps {
    field: IField,
    cell: CELL_STATE,
    rowIndex: number,
    columnIndex: number,
    startedCell: number[],
    selectedCell: number[],
    isCellInPreview: boolean,
}
export const Cell = ({ field, cell, rowIndex, columnIndex, startedCell, selectedCell, isCellInPreview, ...props }: ICell) => {

    return (
        <Box
            align="center"
            justify="center"
            className="field-item"
            key={rowIndex * 10 + columnIndex}
            style={{ backgroundColor: getBackgroundColor(field, cell, rowIndex, columnIndex, startedCell, selectedCell, isCellInPreview) }}
            {...props}
        >
            {cell === CELL_STATE.EMPTY_KNOWN ?
                <StatusGoodSmall color="black" size="5px" /> :
                cell === CELL_STATE.EMPTY_KNOWN_HOORAY ?
                    <Close size="35px" /> : ""
            }
        </Box>
    )
}