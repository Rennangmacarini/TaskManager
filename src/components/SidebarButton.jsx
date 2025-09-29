import PropTypes from "prop-types"
import { tv } from "tailwind-variants"

const sidebar = tv({
    base: "flex items-center gap-2 rounded-lg px-6 py-3 transition-colors",
    variants: {
        color: {
            selected: "bg-[#e6f7f8] text-brand-primary",
            unselected: "text-brand-dark-blue hover:bg-gray-100",
        },
    },
    defaultVariants: {
        color: "unselected",
    },
})

const SidebarButton = ({ children, color, href }) => {
    return (
        <a href={href} className={sidebar({ color })}>
            {children}
        </a>
    )
}

SidebarButton.propTypes = {
    children: PropTypes.node.isRequired,
    color: PropTypes.oneOf(["selected", "unselected"]),
    href: PropTypes.string.isRequired,
}

export default SidebarButton
