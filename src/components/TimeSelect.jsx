import { forwardRef } from "react"

import InputLabel from "./InputLabel"

const TimeSelect = forwardRef((props, ref) => {
    return (
        <div className="flex flex-col gap-1 text-left">
            <InputLabel htmlFor="time">Horário</InputLabel>
            <select
                id="time"
                className="roudend-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9a9c9f]"
                {...props}
                ref={ref}
            >
                <option value="morning">Manhã</option>
                <option value="afternoon">Tarde</option>
                <option value="evening">Noite</option>
            </select>

            {props.errorMessage && (
                <p className="text-left text-xs text-red-500">
                    {props.errorMessage}
                </p>
            )}
        </div>
    )
})

TimeSelect.displayName = "TimeSelect"

export default TimeSelect
