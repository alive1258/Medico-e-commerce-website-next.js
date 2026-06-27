import type { IBaseInputProps } from "../../../types/forms";
import BaseInput from "./BaseInput";


const InputText: React.FC<IBaseInputProps> = (props) => {
    return <BaseInput {...props} type="text" />;
};

export default InputText;
