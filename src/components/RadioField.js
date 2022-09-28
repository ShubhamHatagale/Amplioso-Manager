import React, { useState } from 'react';
import { ErrorMessage, useField } from 'formik';

const RadioField = ({ label, ...props }) => {
  console.log("getFieldProps",props)

  const [field, meta] = useField(props);
  let [radioValue, setradioValue] = useState('');

  console.log("getFieldProps",props)

  console.log("getFieldProps",field)
  console.log("getFieldProps",field.isSelectedCheck)
  console.log("getFieldProps",field.value)
  console.log("getFieldProps",field.name)


  return (
    <p className="mb-1 redio_btn">
      <label>
        <input name={field.name} type="radio" value={props.value}
          onChange={() => {
            { setradioValue(props.value) }
            props.HandleStatus(props.value)
          }}
          checked={props.isSelectedCheck}
        />
        <span htmlFor={props.name}>{label}</span>
      </label>
      <ErrorMessage component="div" name={field.name} className="error" />
    </p>
  )
}
export default RadioField;