import React, { useState } from 'react';
import { ErrorMessage, useField } from 'formik';

const RadioEdit = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  let [radioValue, setradioValue] = useState('');
  if (props.elementtype == 'View') {
    return (
      <p className="mb-1 redio_btn">
        <label>
          <input name={field.name} type="radio" value={props.value}
            onChange={() => {
              { setradioValue(props.value) }
              props.HandleStatus(props.value)
            }}
            checked={props.isSelectedCheck}
            disabled
          />
          <span htmlFor={props.name}>{label}</span>
        </label>
      </p>
    )
  } else
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
      </p>
    )
}
export default RadioEdit;