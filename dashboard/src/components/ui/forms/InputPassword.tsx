import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import BaseInput from "./BaseInput";
import type { IBaseInputProps } from "../../../types/forms";

const InputPassword: React.FC<IBaseInputProps> = (props) => {
    const [show, setShow] = useState(false);

    return (
        <div className="relative">
            <BaseInput
                {...props}
                type={show ? "text" : "password"}
            />

            <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-9 text-gray-400"
            >
                {show ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
        </div>
    );
};

export default InputPassword;
