import { forwardRef } from "react"

import InputErrorMessage from "./InputErrorMessage"
import InputLabel from "./InputLabel"

const Input = forwardRef(({ label, errorMessage, ...rest }, ref) => {
    return (
        <div className="flex flex-col space-y-1 text-left">
            <InputLabel htmlFor={rest.id}>{label}</InputLabel>
            <input
                className="roudend-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9a9c9f]"
                ref={ref}
                {...rest}
            />
            {errorMessage && (
                <InputErrorMessage>{errorMessage}</InputErrorMessage>
            )}
        </div>
    )
})

Input.displayName = "input"

export default Input
