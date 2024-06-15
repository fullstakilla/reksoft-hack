import { FormInput } from "@/shared/ui";
import { Control, FieldErrors } from "react-hook-form";

interface FourthResumeContentInterface {
    control: Control<any>;
    errors: FieldErrors<any>;
}

const FourthResumeContent = ({control, errors}: FourthResumeContentInterface) => {
    return (
        <div>
            <FormInput
                name="pdfFile"
                control={control}
                errors={errors}
                label="Импортировать PDF файл"
                type="file"
            />
        </div>
    );
};

export default FourthResumeContent;
