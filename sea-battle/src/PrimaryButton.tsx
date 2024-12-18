import { Button } from "grommet"

export const PrimaryButton = ( { onClick, label, size="medium", ...props }: { onClick: ()=>void, label: string, size?: string  }) => {
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