import { X } from "lucide-react";
import { useEffect } from "react";

interface Props {
    children: React.ReactNode;
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    removeParent?: () => void
}


const PrimaryModal = ({ children, active, setActive , removeParent}: Props) => {

    useEffect(() => {
        if (active) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [active]);

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center
        bg-black-solid/30 backdrop-blur-md
        ${active ? "opacity-100 visible" : "opacity-0 invisible"}
        transition-opacity duration-300`}
        >
            {active && (
                <div className="relative bg-black-base border border-gray-base
                   rounded-xl shadow-lg
                    max-h-[90vh] max-w-[95vw] md:max-w-[90vw]
                    overflow-y-auto"
                >
                    <button
                        onClick={() => {
                            setActive(false);
                            removeParent?.()
                        }}
                        className="cursor-pointer absolute right-4 top-4 hover:text-primary-muted transition-colors"
                    >
                        <X />
                    </button>

                    <div className="p-4 min-w-sm">{children}</div>
                </div>
            )}
        </div>
    );
};

export default PrimaryModal;