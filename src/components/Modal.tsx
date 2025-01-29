import { ReactNode, useEffect, useRef } from "react"
import { createPortal } from "react-dom"

export const Modal = ({ children, open }: { children: ReactNode, open: boolean }) => {
    const dialog = useRef(null);

    useEffect(() => {
        if (open) {
            // @ts-ignore
            dialog.current && dialog.current.showModal()
            // @ts-ignore
        } else dialog.current && dialog.current.close()
    }
        , [open]
    )

    return createPortal(
        <dialog ref={dialog} style={{
            borderRadius: "10px",
            borderColor: "rgb(6, 2, 49)",
            borderWidth: "3px"
        }}
        >
            {children}
        </dialog>,
        document.getElementById("modal")!
    )
}