import { Height, Widgets } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

export default ({ onChange, options, value, className, Field, defValue, disable, search }) => {
    let classes = (Field === 'employee_gender' || Field === 'FeedBackYear' || Field === 'FeedBackMonth') ? 'selectpos' : '';
    let issearch = search === true ? true : false;
    const dot = () => ({
        alignItems: "center",
        display: "flex",
    });
    const colourStyles = {
        control: (styles) => ({
            width: '103%',
            ...styles,
            border: "solid 2px #c9d4fa !important",
        }),
        valueContainer: (styles) => ({ ...styles, height: '48px' }),
        indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
        input: (styles) => ({ ...styles, ...dot() }),
        placeholder: (styles) => ({ ...styles, ...dot() }),
        singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) })
    };
    const defaultValue = () => {
        if (Field === 'Employee') {
            return (defValue.map(data => ({ label: data.number_of_employee, value: data.id })))
        }
        if (Field === 'Sector') {
            return (defValue.map(data => ({ label: data.sector_name, value: data.id })))
        }
        if (Field === 'AvgEmployee') {
            return (defValue.map(data => ({ label: data.average_employees, value: data.id })))
        }
        if (Field === 'FeedBack') {
            return (defValue.map(data => ({ label: data.feedback_frequencies, value: data.id })))
        }
        if (Field === 'Role') {
            return (defValue.map(data => ({ label: data.role, value: data.id })))
        }
        if (Field === 'Headquaters') {
            return (defValue.map(data => ({ label: data.country_name, value: data.id })))
        }
        if (Field === 'Bussiness') {
            return (defValue.map(data => ({ label: data, value: data })))
        }
        if (Field === 'reminder_setting_manager') {
            return defValue
        }
        if (Field === 'notification_setting_menager') {
            return defValue
        }
        if (Field === 'extension_survey_period') {
            return defValue
        }
        if (Field === 'employee_gender') {
            return defValue
        }
        if (Field === 'recipient_role') {
            if (defValue !== undefined) {
                return ({ label: defValue, value: defValue })
            }
            // return defValue
        }
        if (Field === 'FeedBackYear') {
            return (defValue.map(data => ({ label: data, value: data })))
        }
        if (Field === 'working_presence') {
            return defValue
        }
        if (Field === 'FeedBackMonth') {
            return defValue
        }
        if (Field === 'year_of_experience') {
            return (defValue.map(data => ({ label: data.year_of_experience, value: data.id })))
        }
    };

    const renderList = () => {
        if (Field === 'Sector') {
            return (options.map(data => ({ label: data.sector_name, value: data.id })))
        }
        if (Field === 'Bussiness') {
            return (options.map(data => ({ label: data, value: data })))
        }
        if (Field === 'Employee') {
            return (options.map(data => ({ label: data.number_of_employee, value: data.id })))
        }
        if (Field === 'AvgEmployee') {
            return (options.map(data => ({ label: data.average_employees, value: data.id })))
        }
        if (Field == 'FeedBack') {
            return (options.map(data => ({ label: data.feedback_frequencies, value: data.id })))
        }
        if (Field === 'FeedBackYear') {
            return (options.map(data => ({ label: data, value: data })))
        }
        if (Field === 'FeedBackMonth') {
            return (options.map(data => ({ label: data.label, value: data.value })))
        }
        if (Field === 'Role') {
            return (options.map(data => ({ label: data.role, value: data.id })))
        }
        if (Field === 'Headquaters') {
            return (options.map(data => ({ label: data.country_name, value: data.id })))
        }
        if (Field === 'reminder_setting_manager') {
            return (options.map(data => ({ label: data.label, value: data.value })))
        }
        if (Field === 'notification_setting_menager') {
            return (options.map(data => ({ label: data.label, value: data.value })))
        }
        if (Field === 'extension_survey_period') {
            return (options.map(data => ({ label: data.label, value: data.value })))
        }
        if (Field === 'employee_gender') {
            return (options.map(data => ({ label: data.label, value: data.value })))
        }
        if (Field === 'working_presence') {
            return (options.map(data => ({ label: data.label, value: data.value })))
        }
        if (Field === 'year_of_experience') {
            return (options.map(data => ({ label: data.year_of_experience, value: data.id })))
        }
        if (Field === 'employee_id') {
            return (options.map(data => ({ label: data.user_email, value: data.id })))
        }
        if (Field === 'recipient_role') {
            return (options.map(data => ({ label: data.label, value: data.value })))
        }
    }

    return (
        <div className={classes} >
            <Select
                className="inputselect"
                isSearchable={issearch}
                styles={colourStyles}
                defaultValue={defaultValue()}
                onChange={e => {
                    onChange(e.value)
                }}
                placeholder="Select Option"
                options={renderList()}
                isDisabled={disable}
            />
        </div >
    )
}