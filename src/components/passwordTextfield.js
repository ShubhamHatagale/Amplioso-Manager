import React, { useState } from 'react';
import { ErrorMessage, useField } from 'formik';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff"
const PasswordTextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const [UserUsername, setUserUsername] = useState('');
    const [type, setType] = useState(true);
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
                    type={type ? "password" : "text"}
                />
            break;
        case ('add'):
            inputElement =
                <input className={` form - control shadow - none ${meta.touched && meta.error && 'is-invalid'} `}
                    {...field} {...props}
                    autoComplete="off"
                    type={type ? "password" : "text"}
                />
            break;
        case ('view'):
            inputElement = <input
                className={`form - control shadow - none ${meta.touched && meta.error && 'is-invalid'} `}
                {...field} {...props}
                autoComplete="off"
                value={`${props.value} `}
                type={type ? "password" : "text"}
            />
            break;

        default:
            inputElement = <input
                className={`form - control shadow - none ${meta.touched && meta.error && 'is-invalid'} `}
                {...field} {...props}
                autoComplete="off"
                type={type ? "password" : "text"}
            />
    }
    labelement = <label htmlFor={field.name} >{label}</label>

    return (
        <div >
            <div className="input-field col m12 s12 pad-r pass-eye">
                {inputElement}
                <label htmlFor={field.name} >{label}</label>
                <ErrorMessage component="div" name={field.name} className="error" />

            </div >
            <div onClick={() => setType(!type)} >
                {type ? <VisibilityOff style={{ position: "relative", top: "-60px", left: "508px", cursor: "pointer" }} /> : <Visibility style={{ position: "relative", top: "-60px", left: "508px", cursor: "pointer" }} />}
            </div>
        </div>
    )
}
export default PasswordTextField;