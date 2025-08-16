const SidebarButton = ({ children, variant }) => {
    const getVariantClasses = () => {
        if (variant === "unselected") {
            return "text-brand-dark-blue"
        }
        if (variant === "selected") {
            return "bg-[#e6f7f8] text-brand-primary"
        }
    }

    return (
        <a
            href="#"
            className={`rounded-log flex items-center gap-2 px-6 py-3 ${getVariantClasses()}`}
        >
            {children}
        </a>
    )
}

export default SidebarButton
