import type { IBaseInputProps } from "../../../types/forms";
import BaseInput from "./BaseInput";


const InputNumber: React.FC<IBaseInputProps> = (props) => {
    return (
        <BaseInput
            {...props}
            type="number"
            onChange={(value:any) => props.onChange?.(value)}
        />
    );
};

export default InputNumber;
