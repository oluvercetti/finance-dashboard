import React from 'react'

import {
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
    Input,
} from "../uiComponents"
import { Control, FieldPath } from "react-hook-form"
import { z } from 'zod';
import { authFormSchema } from '@/lib/models';

const formSchema = authFormSchema(true);
interface FormFieldProps {
    control: Control<z.infer<typeof formSchema>>;
    name: FieldPath<z.infer<typeof formSchema>>;
    label: string;
    placeholder?: string;
    type?: string;
    formId?: string;
}
const AuthCustomInput = ({ control, name, label, placeholder, type = "text", formId }: FormFieldProps) => {
    return (
        <FormField control={control} name={name}
            render={({ field }) => (
                <div className='form-item'>
                    <FormLabel htmlFor={name} className='form-label'>{label}</FormLabel>
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
                        <FormMessage className='form-message mt-2' />
                    </div>
                </div>
            )} />
    )
}

export default AuthCustomInput