import React, { useState } from 'react';
import { ErrorMessage, useField } from 'formik';

const AssignTextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const [UserUsername, setUserUsername] = useState('');
    // alert(props.editval);
    let inputElement = null;
    let labelement = null;
    switch (props.elementtype) {
        case ('edit'):
            inputElement =
                <input
                    className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
                    {...field} {...props}
                    autoComplete="off"
                    value={`${props.value}`}
                    onChange={value => {
                        let newValue = props.onInputChange(value);
                        setUserUsername({ value: newValue });
                    }}
                />
            break;
        case ('add'):
            inputElement =
                <input className={` form - control shadow - none ${meta.touched && meta.error && 'is-invalid'} `}
                    {...field} {...props}
                    autoComplete="off"
                />
            break;
        case ('view'):
            inputElement = <input
                className={`form - control shadow - none ${meta.touched && meta.error && 'is-invalid'} `}
                {...field} {...props}
                autoComplete="off"
                value={`${props.value} `}
            />
            break;
        default:
            inputElement = <input
                className={`form - control shadow - none ${meta.touched && meta.error && 'is-invalid'} `}
                {...field} {...props}
                autoComplete="off"
            />
    }
    labelement = <label htmlFor={field.name} >{label}</label>

    return (
        <div className="input-field assign col m12 s12 pad-r" >
            {inputElement}
            < label className="assign_label" htmlFor={field.name} > {label}</label >
            <ErrorMessage component="div" name={field.name} className="error" />
        </div>
    )
}
export default AssignTextField;