import { FormControlLabel, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import M from "materialize-css";
import CustomSelect from "../../components/SelectEdit";
import MaxWidthDialog from '../../components/AlertDialogBox';
require("dotenv").config();

export default function GeneralManagerSetting() {
    const BaseURL = process.env.REACT_APP_Base_URL;
    const id = localStorage.getItem("manager_id");
    let [showremind, setshowremind] = useState(false);
    let [selectedUser, setSelectedUser] = useState({});
    let [reminderIdlabel, setreminderIdlabel] = useState('');
    let [notificationIdlabel, setnotificationIdlabel] = useState('');
    let [extensionIdlabel, setextensionIdlabel] = useState('');
    let [resultLength, setresultLength] = useState('');
    let [generalmanagerid, setGenerealmanagerid] = useState('');
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', type: '' })
    const onInputChange = (e) => {
        setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
    };
    const ReminderOption = [
        { label: 'No ongoing reminders', value: 1 },
        { label: 'Just enough', value: 2 },
        { label: 'Don’t be shy', value: 3 },
    ]
    const NotificationOption = [
        { label: 'At the end of the survey period', value: 1 },
        { label: 'As responses are received', value: 2 },
        { label: 'Daily through the survey period', value: 3 },
    ]
    const ExtensionOption = [
        { label: 'No Extension', value: 0 },
        { label: 'By 1 week with a reminder sent out', value: 1 },
        { label: 'By 2 weeks with a reminder sent out', value: 2 },
    ]

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("manager_jwt");
            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'multipart/form-data')
            myHeaders.append("Authorization", token);
            let res = await fetch(BaseURL + `/company/general_managers/${id}`,
                {
                    method: "get",
                    headers: myHeaders
                }
            );
            let response = await res.json();
            let result = response.data;
            setresultLength(result.length);
            console.log(result);
            result.map((item, key) => {
                setGenerealmanagerid(item.id);
                setSelectedUser({
                    reminder_setting_manager: item.reminder_setting_manager,
                    notification_setting_menager: item.notification_setting_menager,
                    extension_survey_period: item.extension_survey_period
                })
                ReminderOption.map((items, key) => {
                    if (item.reminder_setting_manager === items.value) {
                        setreminderIdlabel(items)
                    }
                })
                NotificationOption.map((items, key) => {
                    if (item.notification_setting_menager === items.value) {
                        setnotificationIdlabel(items)
                    }
                })
                ExtensionOption.map((items, key) => {
                    if (item.extension_survey_period === items.value) {
                        setextensionIdlabel(items)
                    }
                })
            })
        }
        fetchData();
    }, []);
    const initialValues = {
        reminder_setting_manager: "",
        notification_setting_menager: "",
        extension_survey_period: "",
    };
    const validate = Yup.object({
        reminder_setting_manager: Yup.number().required('required'),
        notification_setting_menager: Yup.number().required('required'),
        extension_survey_period: Yup.number().required('required'),
    });
    const OnSubmitForm = (values) => {
        console.log(values);
        var myHeaders = new Headers();
        const token = localStorage.getItem("manager_jwt");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", token);
        let manager_id = id;
        var raw = JSON.stringify({
            reminder_setting_manager: values.reminder_setting_manager,
            notification_setting_menager: values.notification_setting_menager,
            extension_survey_period: values.extension_survey_period,
            manager_id: manager_id,
        })
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch(BaseURL + `/company/general_managers`, requestOptions)
            .then(response => response.json())
            .then(resData => {
                if (resData.status === 200) {
                    setConfirmDialog({
                        isOpen: true,
                        title: 'Alert',
                        subTitle: "General Settings Added Successfully",
                    })
                    console.log("Records Submitted");
                }
            })
            .catch(error => console.log('error', error));
    };
    const OnSubmitEditForm = (values) => {
        console.log(values);
        console.log(generalmanagerid);
        var myHeaders = new Headers();
        const token = localStorage.getItem("manager_jwt");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", token);
        var raw = JSON.stringify({
            reminder_setting_manager: values.reminder_setting_manager,
            notification_setting_menager: values.notification_setting_menager,
            extension_survey_period: values.extension_survey_period,
        })
        var requestOptions = {
            method: 'put', 
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch(BaseURL + `/company/general_managers/${generalmanagerid}`, requestOptions)
            .then(response => response.json())
            .then(resData => {
                console.log(resData);
                if (resData.status === 200) {
                    setConfirmDialog({
                        isOpen: true,
                        title: 'Alert',
                        subTitle: "General Settings Updated Successfully",
                    })
                    console.log("Records Submitted");
                }
            })
            .catch(error => console.log('error', error));
    }
    return (
        <div>
            <div className="section inner-content">
                <div className="section-title">
                    <h1>General Manager settings</h1>
                    {/* <div className="nav-wrapper inner-breadcrumb">
                        <div className="col s12 pad-l-0">
                            <a href="#!">Dashboard </a>
                            <a href="#!">General Manager Settings</a>
                        </div>
                    </div> */}
                </div>
                {(resultLength === 0) ? (
                    <div className="pt-0 main-screen">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validate}
                            validateOnBlur={false}
                            validateOnChange={false}
                            onSubmit={(values, props) => {
                                OnSubmitForm(values, props);
                            }}
                        >
                            {formik => (
                                <Form>
                                    <div>
                                        <div className="row">
                                            <div className="col m2 s12 padtb">
                                            </div>
                                            <div className="col m4 s12 padtb">
                                                <h6 >Reminder Setting (For the survey recipients)
                                                    {/* <span onClick={setshowremind(showremind = !showremind)}> <b>?</b> </span> */}
                                                </h6>
                                                {showremind ? (
                                                    <div>
                                                        <ul>
                                                            <li>Just enough : 2 week</li>
                                                            <li>Don’t be shy : 1 week</li>
                                                        </ul>
                                                    </div>
                                                ) : (null)}
                                            </div>
                                            <div className="col m4 s12 padtb">
                                                <CustomSelect
                                                    search={false}
                                                    onChange={value => formik.setFieldValue('reminder_setting_manager', value)}
                                                    value={formik.values.reminder_setting_manager}
                                                    defValue={reminderIdlabel}
                                                    options={ReminderOption}
                                                    Field={'reminder_setting_manager'}
                                                    Fieldname={'reminder_setting_manager'}
                                                    className='select-dropdown dropdown-trigger'
                                                />
                                                {formik.errors.reminder_setting_manager ? <div className='error'>{formik.errors.reminder_setting_manager}</div> : null}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col m2 s12 padtb">
                                            </div>
                                            <div className="col m4 s12 padtb">
                                                <h6 >Notification Setting for the Manager</h6>
                                            </div>
                                            <div className="col m4 s12 padtb">
                                                <CustomSelect
                                                    search={false}
                                                    onChange={value => formik.setFieldValue('notification_setting_menager', value)}
                                                    value={formik.values.notification_setting_menager}
                                                    defValue={notificationIdlabel}
                                                    options={NotificationOption}
                                                    Field={'notification_setting_menager'}
                                                    Fieldname={'notification_setting_menager'}
                                                    className='select-dropdown dropdown-trigger'
                                                />
                                                {formik.errors.notification_setting_menager ? <div className='error'>{formik.errors.notification_setting_menager}</div> : null}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col m2 s12 padtb">
                                            </div>
                                            <div className="col m4 s12 padtb">
                                                <h6 >Extension for the Survey period</h6>
                                            </div>
                                            <div className="col m4 s12 padtb">
                                                <CustomSelect
                                                    search={false}
                                                    onChange={value => formik.setFieldValue('extension_survey_period', value)}
                                                    value={formik.values.extension_survey_period}
                                                    defValue={extensionIdlabel}
                                                    options={ExtensionOption}
                                                    Field={'extension_survey_period'}
                                                    Fieldname={'extension_survey_period'}
                                                    className='select-dropdown dropdown-trigger'
                                                />
                                                {formik.errors.extension_survey_period ? <div className='error'>{formik.errors.extension_survey_period}</div> : null}
                                            </div>
                                        </div>
                                        <div class="input-field col m8 s8 pad-r center">
                                            <button
                                                class="waves-effect waves-light btn-large mb-1 mr-1"
                                                type="submit"
                                                name="action"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                ) : (
                    <div className="pt-0 main-screen">
                        <Formik
                            initialValues={selectedUser}
                            enableReinitialize
                            validateOnBlur={false}
                            validateOnChange={false}
                            validationSchema={validate}
                            onSubmit={(values, props) => {
                                OnSubmitEditForm(values, props);
                            }}
                        >
                            {formik => (
                                <Form>
                                    {reminderIdlabel && notificationIdlabel && extensionIdlabel ? (
                                        <div>
                                            <div className="row">
                                                <div className="col m2 s12 padtb">
                                                </div>
                                                <div className="col m4 s12 padtb">
                                                    <h6 >Reminder Setting (For the survey recipients)</h6>
                                                </div>
                                                <div className="col m4 s12 padtb">
                                                    <CustomSelect
                                                        search={false}
                                                        onChange={value => formik.setFieldValue('reminder_setting_manager', value)}
                                                        value={formik.values.reminder_setting_manager}
                                                        defValue={reminderIdlabel}
                                                        options={ReminderOption}
                                                        Field={'reminder_setting_manager'}
                                                        Fieldname={'reminder_setting_manager'}
                                                        className='select-dropdown dropdown-trigger'
                                                    />
                                                    {formik.errors.reminder_setting_manager ? <div className='error'>{formik.errors.reminder_setting_manager}</div> : null}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col m2 s12 padtb">
                                                </div>
                                                <div className="col m4 s12 padtb">
                                                    <h6 >Notification Setting for the Manager</h6>
                                                </div>
                                                <div className="col m4 s12 padtb">
                                                    <CustomSelect
                                                        search={false}
                                                        onChange={value => formik.setFieldValue('notification_setting_menager', value)}
                                                        value={formik.values.notification_setting_menager}
                                                        defValue={notificationIdlabel}
                                                        options={NotificationOption}
                                                        Field={'notification_setting_menager'}
                                                        Fieldname={'notification_setting_menager'}
                                                        className='select-dropdown dropdown-trigger'
                                                    />
                                                    {formik.errors.notification_setting_menager ? <div className='error'>{formik.errors.notification_setting_menager}</div> : null}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col m2 s12 padtb">
                                                </div>
                                                <div className="col m4 s12 padtb">
                                                    <h6 >Extension for the Survey period</h6>
                                                </div>
                                                <div className="col m4 s12 padtb">
                                                    <CustomSelect
                                                        search={false}
                                                        onChange={value => formik.setFieldValue('extension_survey_period', value)}
                                                        value={formik.values.extension_survey_period}
                                                        defValue={extensionIdlabel}
                                                        options={ExtensionOption}
                                                        Field={'extension_survey_period'}
                                                        Fieldname={'extension_survey_period'}
                                                        className='select-dropdown dropdown-trigger'
                                                    />
                                                    {formik.errors.extension_survey_period ? <div className='error'>{formik.errors.extension_survey_period}</div> : null}
                                                </div>
                                            </div>
                                            <div class="input-field col m8 s8 pad-r center">
                                                <button
                                                    class="waves-effect waves-light btn-large mb-1 mr-1"
                                                    type="submit"
                                                    name="action"
                                                >
                                                    Update
                                                </button>
                                            </div>
                                        </div>
                                    ) : (null)}
                                </Form>
                            )}
                        </Formik>
                    </div>
                )}
            </div>
            <MaxWidthDialog setConfirmDialog={setConfirmDialog} confirmDialog={confirmDialog} link={'/'} />
        </div>
    )
}
