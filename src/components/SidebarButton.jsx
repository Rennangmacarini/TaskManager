import PropTypes from "prop-types"
import { tv } from "tailwind-variants"

const SidebarButton = ({ children, color }) => {
    const sidebar = tv({
        base: "rounded-log flex items-center gap-2 px-6 py-3",
        variant: {
            color: {
                selected: "bg-[#e6f7f8] text-brand-primary",
                unselected: "text-brand-dark-blue",
            },
        },
    })

    return (
        <a href="#" className={sidebar({ color })}>
            {children}
        </a>
    )
}

SidebarButton.propTypes = {
    children: PropTypes.node.isRequired,
    color: PropTypes.oneOf(["selected", "unselected"]),
}

export default SidebarButton
