import { Field } from "./Field";

export const FieldView = () => {
    const fieldInit = new Field();
    const fieldArray = fieldInit.setField([4, 3, 3, 2, 2, 2, 1, 1, 1, 1])

    return (
        <table style={{ background: 'white', color: 'black', fontSize: 'large' }}>
            {fieldArray.map((item, rowIndex) => {
                return (
                    <tr key={rowIndex}>
                        {item.map((i, columnIndex) => {
                            return (
                                <td
                                    key={rowIndex * 10 + columnIndex}
                                >
                                    {i}
                                </td>
                            )
                        })}
                    </tr>
                )
            })}
        </table >
    )
}