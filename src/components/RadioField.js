import React, { useState } from 'react';
import { ErrorMessage, useField } from 'formik';

const RadioField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  let [radioValue, setradioValue] = useState('');

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