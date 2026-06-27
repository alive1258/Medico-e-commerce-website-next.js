import React, { useState, useRef, useEffect, type ReactNode } from "react";

export type DropdownPosition =
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight";

type DropdownTrigger = "click" | "hover";

interface DropdownProps {
    children: ReactNode;
    position?: DropdownPosition;
    trigger?: DropdownTrigger;
    btn: ReactNode;
    maxWidth?: string;
    className?: string;
    onClose?: () => void;
    onOpen?: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({
    children,
    position = "bottom",
    trigger = "click",
    btn,
    maxWidth = "max-w-xs",
    className = "",
    onClose,
    onOpen,
}) => {
    const [visible, setVisible] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setVisible(false);
                onClose?.();
            }
        };

        // Add event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    // Close dropdown when pressing Escape key
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setVisible(false);
                onClose?.();
            }
        };

        if (visible) {
            document.addEventListener("keydown", handleEscapeKey);
        }

        return () => {
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [visible, onClose]);

    const positionClasses: Record<DropdownPosition, string> = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
        topLeft: "bottom-full right-0 mb-2",
        topRight: "bottom-full left-0 mb-2",
        bottomLeft: "top-full right-0 mt-2",
        bottomRight: "top-full left-0 mt-2",
    };

    const handleMouseEnter = (): void => {
        if (trigger === "hover") {
            setVisible(true);
            onOpen?.();
        }
    };

    const handleMouseLeave = (): void => {
        if (trigger === "hover") {
            setVisible(false);
            onClose?.();
        }
    };

    const handleClick = (e: React.MouseEvent): void => {
        e.stopPropagation(); // Prevent event from bubbling up
        if (trigger === "click") {
            const newVisibleState = !visible;
            setVisible(newVisibleState);
            if (newVisibleState) {
                onOpen?.();
            } else {
                onClose?.();
            }
        }
    };

    // Prevent click inside dropdown from closing it
    const handleDropdownClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div
            ref={dropdownRef}
            className={`relative inline-block ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Trigger */}
            <div
                className="cursor-pointer border border-gray-base p-1 px-3 rounded-lg"
                onClick={handleClick}
            >
                {btn}
            </div>

            {/* Dropdown Content */}
            {visible && (
                <div
                    className={`absolute z-50 bg-black-base rounded-lg border border-gray-base ${positionClasses[position]} ${maxWidth} overflow-hidden`}
                    onClick={handleDropdownClick}
                >
                    {children}
                </div>
            )}
        </div>
    );
};

export default Dropdown;