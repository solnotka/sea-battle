import { Button } from "grommet"
import { IButton } from "../interfaces"

export const PrimaryButton = ( { onClick, label, size="medium", ...props }: IButton ) => {
    return (
        <Button
        className = "clear-button"
        label = {label}
        primary
        hoverIndicator
        color="rgb(6, 2, 49)"
        margin="medium"
        onClick={onClick}
        {...props}
        />
    )
}