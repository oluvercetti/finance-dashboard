import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
} from "../uiComponents"
import { Control, FieldPath } from "react-hook-form"
import { z } from 'zod';
import { paymentFormSchema } from '@/lib/models';

const formSchema = paymentFormSchema;
interface FormFieldProps {
    control: Control<z.infer<typeof formSchema>>;
    name: FieldPath<z.infer<typeof formSchema>>;
    label: string;
    placeholder?: string;
    type?: string;
    formId?: string;
}
const PaymentCustomInput = ({ control, name, label, placeholder, type = "text", formId }: FormFieldProps) => {
    return (
        <FormField control={control} name={name}
            render={({ field }) => (
                <FormItem className="border-t border-gray-200">
                    <div className="payment-transfer_form-item py-5">
                        <FormLabel htmlFor={name} className="text-14 w-full max-w-[280px] font-medium text-gray-700">{label}</FormLabel>
                        <div className="flex w-full flex-col">
                            <FormControl>
                                <Input
                                    className='input-class'
                                    {...field}
                                    type={type}
                                    placeholder={placeholder}
                                    id={formId ?? name}
                                />
                            </FormControl>
                            <FormMessage className='text-12 text-red-500"' />
                        </div>
                    </div>
                </FormItem>
            )} />
    )
}

export default PaymentCustomInput