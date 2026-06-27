interface Props {
    isActive?: boolean;
    setIsActive?: React.Dispatch<React.SetStateAction<boolean>>;
    color?: string;
    gradient?: string; // Optional custom gradient
}

const DEFAULT_GRADIENT = 'linear-gradient(135deg, #ffffff 0%, #777777 100%)';

export default function ToggleButton({
    isActive = false,
    setIsActive,
    color,
    gradient = DEFAULT_GRADIENT,
}: Props) {
    const hasCustomColor = !!color;
    const isColorGradient = color?.includes('gradient');

    const activeStyle = (() => {
        if (!isActive) return {};

        // Priority: custom color > custom gradient > default gradient
        if (hasCustomColor) {
            if (isColorGradient) {
                return { backgroundImage: color, border: 'none' };
            }
            return { backgroundColor: color, borderColor: color };
        }

        // No custom color provided, use gradient
        return { backgroundImage: gradient, border: 'none' };
    })();

    return (
        <div
            onClick={() => setIsActive?.(!isActive)}
            className={`w-[52px] h-7 flex items-center rounded-[99px] cursor-pointer transition-all duration-300 relative ${isActive
                    ? ''
                : "bg-neutral-800 border border-gray-base"
                }`}
            style={activeStyle}
        >
            <div
                className={`size-[18px] rounded-full flex items-center justify-center transform transition-transform duration-300 z-10 shadow-sm ${isActive
                    ? "translate-x-[27.5px] bg-linear-to-b from-white to-white/20"
                    : "translate-x-[5px] bg-linear-to-b from-white to-white/20"
                    }`}
            >
                {isActive ? (
                    <p className="text-xl duration-200" ></p>
                ) : (
                    <p className="text-xl duration-200 " ></p>
                )}
            </div>
        </div>
    );
}