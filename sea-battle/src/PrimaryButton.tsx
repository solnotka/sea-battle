import { Button } from "grommet"

export const PrimaryButton = ( { onClick, label }: { onClick: ()=>void, label: string }) => {
    return (
        <Button
        className = "clear-button"
        label = {label}
        primary
        hoverIndicator
        size="medium"
        color="rgb(6, 2, 49)"
        margin="medium"
        onClick={onClick}
        />
    )
}