import { FormControlLabel, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import React, { useEffect, useState } from 'react';
import * as Yup from "yup";
import M from "materialize-css";
import CustomSelect from "../../components/Select";
import CustomEditSelect from "../../components/SelectEdit";
import MaxWidthDialog from '../../components/AlertDialogBox';
import EditTextField from "../../components/assignEditTextField";
import RadioEdit from "../../components/RadioEdit";
import AssignTextField from '../../components/assignTextField';
import getYear from "date-fns/getYear";
import RadioField from '../../components/RadioField';
require("dotenv").config();
// 84918833670
export class Collect_feedback {
    constructor() {
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.recipient_role = "";
    }
}
export default function AssignSurvey() {
    const range = (start, end) => {
        return new Array((end + 1) - start).fill().map((d, i) => i + start);
    };
    const years = range(1800, getYear(new Date()));
    const [showEdit, setShowEdit] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [count, setcount] = useState(0);
    const BaseURL = process.env.REACT_APP_Base_URL;
    const backend_url = process.env.REACT_APP_Base_URL_Backend;

    const managerid = localStorage.getItem("manager_id");
    const companyid = localStorage.getItem("companyId");
    let feedback_data;
    const token = localStorage.getItem("manager_jwt");
    let [radioValue, setradioValue] = useState('individual_contributer');
    let [radioValue1, setradioValue1] = useState('Yes');
    const [selectedUser, setSelectedUser] = useState({});
    const [getEmployeesData, setEmolyeesData] = useState('');
    const [exitEmployeeId, setExitRmployeeId] = useState('');
    const [getHeadquaterdata, setgetHeadquaterdata] = useState('');
    const [getYOEdata, setYOEdata] = useState('');
    const [getgenderdata, setGenderdata] = useState('');
    const [getfeedbackMonthdata, setfeedbackMonth] = useState('');
    const [getfeedbackEditMonthdata, setfeedbackEditMonth] = useState('');
    const [getWorkingPresenceIDName, setWorkingPresenceIDName] = useState('');
    const [getyear_of_experienceIDName, setyear_of_experienceIDName] = useState('');
    const [feedbackIdName, setFeedbackIdName] = useState('');
    const [getfeeddata, setgetfeeddata] = useState('');
    const [getLocationIdName, setLocationIdName] = useState('');
    const [Errordisplay, setErrordisplay] = useState('');

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', type: '' })
    const onInputChange = (e) => {
        setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
    };
    const WorkingPresence = [
        { label: 'Virtual / Remote', value: 1 },
        { label: 'Hybrid ', value: 2 },
        { label: 'In the Office', value: 3 },
    ]
    const Quaterly = [
        { label: 'Jan-Mar', value: 1 },
        { label: 'Apr-Jun', value: 2 },
        { label: 'Jul-Sept', value: 3 },
        { label: 'Oct- Dec', value: 4 },
    ]
    const Monthly = [
        { label: 'Jan', value: 1 },
        { label: 'Feb', value: 2 },
        { label: 'Mar', value: 3 },
        { label: 'Apr', value: 4 },
        { label: 'May', value: 5 },
        { label: 'Jun', value: 6 },
        { label: 'Jul', value: 7 },
        { label: 'Aug', value: 8 },
        { label: 'Sep', value: 9 },
        { label: 'Oct', value: 10 },
        { label: 'Nev', value: 11 },
        { label: 'Dec', value: 12 },
    ]
    const Semi_Annually = [
        { label: 'Jan-Jun', value: 1 },
        { label: 'Jul-Dec', value: 2 },
    ]
    const Annually = [
        { label: 'Jan-Dec', value: 1 },
    ]
    const Gender = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
    ]
    const Relationship = [
        { label: 'Client', value: 'Client' },
        { label: 'Peer To Peer', value: 'Peer To Peer' },
        { label: 'Senior', value: 'Senior' },
        { label: 'Direct Report', value: 'Direct Report' },
    ]

    const getFeedback = async () => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'multipart/form-data')
        myHeaders.append("Authorization", token);
        let res = await fetch(BaseURL + `/feedback`,
            {
                method: "get",
                headers: myHeaders
            }
        );
        let response = await res.json();
        let result = response.data;
        feedback_data = result;
        setgetfeeddata(result);
    }
    const getHeadquaters = async () => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'multipart/form-data')
        myHeaders.append("Authorization", token);
        let res = await fetch(BaseURL + `/country`,
            {
                method: "get",
                headers: myHeaders
            }
        );
        let response = await res.json();
        let result = response.data;
        setgetHeadquaterdata(result);
    }
    const getYOE = async () => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'multipart/form-data')
        myHeaders.append("Authorization", token);
        let res = await fetch(BaseURL + `/year_of_experience`,
            {
                method: "get",
                headers: myHeaders
            }
        );
        let response = await res.json();
        let result = response.data;
        setYOEdata(result);
    }
    const getEmployyes = async () => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'multipart/form-data')
        myHeaders.append("Authorization", token);
        let res = await fetch(BaseURL + `/employeedetails/manager/${managerid}`,
            {
                method: "get",
                headers: myHeaders
            }
        );
        let response = await res.json();
        let result = response.data;
        console.log(result);
        setEmolyeesData(result);
    }

    const checkMail = async (defValue) => {
        // var myHeaders = new Headers();
        // myHeaders.append('Content-Type', 'multipart/form-data')
        // myHeaders.append("Authorization", token);
        // let res = await fetch(
        //     backend_url + `masters/collect_feedback/email/${defValue}`,
        //     {
        //         method: "get",
        //         headers: myHeaders
        //     }
        // );


        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const res = fetch(`http://localhost:9000/masters/collect_feedback/email/${defValue}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // setlistRecord(result.data);
                console.log(result.data[0])
                // setfirst_name(result.data[0].first_name)
                // setlast_name(result.data[0].last_name)
            })

        // let response = await res.json();
        // console.log(response)
        // const respLength = response.data.length;
        // console.log(respLength)
        // return respLength;
    }

    useEffect(() => {
        console.log(showEdit, showAdd)
        getEmployyes()
        getHeadquaters()
        getFeedback()
        getYOE()
    }, []);

    const HandleStatus = (val) => {
        setradioValue(val);
    }
    const HandleEditStatus = (val) => {
        console.log(val);
        setSelectedUser({
            employee_first_name: selectedUser.employee_first_name,
            employee_last_name: selectedUser.employee_last_name,
            employee_email: selectedUser.employee_email,
            employee_gender: selectedUser.employee_gender,
            status: selectedUser.status,
            role: selectedUser.role,
            best_classified: val,
            service_external_client: selectedUser.service_external_client,
            feedback_frequency: selectedUser.feedback_frequency,
            feedback_year: selectedUser.feedback_year,
            feedback_month: selectedUser.feedback_month,
            location: selectedUser.location,
            year_of_experience: selectedUser.year_of_experience,
            working_presence: selectedUser.working_presence,
            collect_feedback: [new Collect_feedback()],
        })
    }
    const HandleEditStatus1 = (val) => {
        console.log(val);
        setSelectedUser({
            employee_first_name: selectedUser.employee_first_name,
            employee_last_name: selectedUser.employee_last_name,
            employee_email: selectedUser.employee_email,
            employee_gender: selectedUser.employee_gender,
            status: selectedUser.status,
            role: selectedUser.role,
            best_classified: selectedUser.best_classified,
            service_external_client: val,
            feedback_frequency: selectedUser.feedback_frequency,
            feedback_year: selectedUser.feedback_year,
            feedback_month: selectedUser.feedback_month,
            location: selectedUser.location,
            year_of_experience: selectedUser.year_of_experience,
            working_presence: selectedUser.working_presence,
            collect_feedback: [new Collect_feedback()],
        })
    }

    const HandleStatus1 = (val) => {
        setradioValue1(val);
    }
    const handleChangeEmployee = (val) => {
        setExitRmployeeId(val)
        const fetchData = async () => {
            const token = localStorage.getItem("manager_jwt");
            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'multipart/form-data')
            myHeaders.append("Authorization", token);
            let res = await fetch(
                BaseURL + `/employeedetails/${val}`,
                {
                    method: "get",
                    headers: myHeaders
                }
            );
            let response = await res.json();
            let result = response.data;
            console.log(result);
            result.map((item, key) => {
                const feedBackYear = [];
                feedBackYear[0] = item.feedback_year;
                setSelectedUser({
                    employee_first_name: item.first_name,
                    employee_last_name: item.last_name,
                    employee_email: item.user_email,
                    employee_gender: item.gender,
                    status: item.status,
                    role: item.role,
                    best_classified: item.best_classified,
                    service_external_client: item.service_external_client,
                    feedback_frequency: item.feedback_frequency,
                    feedback_year: feedBackYear,
                    feedback_month: item.feedback_month,
                    location: item.location,
                    year_of_experience: item.year_of_experience,
                    working_presence: item.working_presence,
                    collect_feedback: [new Collect_feedback()],
                })
                const fetchFeedbackIdName = async () => {
                    const employee = await getAllFeedbackApi(item.feedback_frequency)
                    setFeedbackIdName(employee)
                    employee.map(val => {
                        console.log("feed_freq" + val.id);
                        getFeedbackMonth(val.id)
                        getEditFeedbackMonth(val.id, item.feedback_month);
                    })
                };
                const fetchGenderIdName = async () => {
                    const employee = await getAllGenderApi(item.gender)
                    setGenderdata(employee)
                };
                const fetchLocationIdName = async () => {
                    const employee = await getAllLocationApi(item.location)
                    setLocationIdName(employee)
                };
                const fetchWorkingPresenceIdName = async () => {
                    const employee = await getAllWorkingPresenceApi(item.working_presence)
                    console.log(employee);
                    setWorkingPresenceIDName(employee)
                };
                const fetchyear_of_experienceIdName = async () => {
                    const employee = await getAllyear_of_experienceApi(item.year_of_experience)
                    console.log(employee);
                    setyear_of_experienceIDName(employee)
                };
                fetchFeedbackIdName();
                fetchGenderIdName();
                fetchLocationIdName();
                fetchWorkingPresenceIdName();
                fetchyear_of_experienceIdName();
            });
            // setloading(0);
        };
        fetchData();
        console.log(selectedUser);
        setShowEdit(true);
    }


    const getAllFeedbackApi = async (defValue) => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'multipart/form-data')
        myHeaders.append("Authorization", token);
        let res = await fetch(
            BaseURL + `/feedback/${defValue}`,
            {
                method: "get",
                headers: myHeaders
            }
        );
        let response = await res.json();
        const empResult = response.data;
        return empResult;
    }
    const getAllyear_of_experienceApi = async (defValue) => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'multipart/form-data')
        myHeaders.append("Authorization", token);
        let res = await fetch(
            BaseURL + `/year_of_experience/${defValue}`,
            {
                method: "get",
                headers: myHeaders
            }
        );
        let response = await res.json();
        const empResult = response.data;
        return empResult;
    }
    const getAllLocationApi = async (defValue) => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'multipart/form-data')
        myHeaders.append("Authorization", token);
        let res = await fetch(
            BaseURL + `/country/${defValue}`,
            {
                method: "get",
                headers: myHeaders
            }
        );
        let response = await res.json();
        const empResult = response.data;
        return empResult;
    }
    const getAllGenderApi = async (defValue) => {
        let resp;
        (Gender.map(data => {
            if (data.value === defValue) {
                resp = data;
            }
        }
        ))
        return resp;
    }
    const getAllWorkingPresenceApi = async (defValue) => {
        let resp;
        (WorkingPresence.map(data => {
            if (data.value === defValue) {
                resp = data;
            }
        }
        ))
        return resp;
    }

    function handleAdd() {
        setShowAdd(true)
    }

    const getFeedbackMonth = (val) => {
        console.log("feed_freq" + val);
        getfeeddata.map(data => {
            if (data.id == val) {
                console.log("feed_round" + data.feedback_rounds);
                switch (data.feedback_rounds) {
                    case 1:
                        setfeedbackMonth(Annually);
                        break;
                    case 2:
                        setfeedbackMonth(Semi_Annually);
                        break;
                    case 4:
                        setfeedbackMonth(Quaterly);
                        break;
                    case 12:
                        setfeedbackMonth(Monthly);
                        break;
                    default:
                        setfeedbackMonth(Annually);
                        break;
                }
            }
        })
    }
    const getEditFeedbackMonth = (val, defval) => {
        getfeeddata.map(item => {
            if (item.id == val) {
                console.log("feed_round" + item.feedback_rounds);
                switch (item.feedback_rounds) {
                    case 1:
                        {
                            let resp;
                            (Annually.map(data => {
                                if (data.value === defval) {
                                    resp = data;
                                }
                            }
                            ))
                            setfeedbackEditMonth(resp);
                        }
                        break;
                    case 2:
                        {
                            let resp;
                            (Semi_Annually.map(data => {
                                if (data.value === defval) {
                                    resp = data;
                                }
                            }
                            ))
                            setfeedbackEditMonth(resp);
                        }
                        break;
                    case 4:
                        {
                            let resp;
                            (Quaterly.map(data => {
                                if (data.value === defval) {
                                    resp = data;
                                }
                            }
                            ))
                            setfeedbackEditMonth(resp);
                        } break;
                    case 12:
                        {
                            let resp;
                            (Monthly.map(data => {
                                if (data.value === defval) {
                                    resp = data;
                                }
                            }
                            ))
                            setfeedbackEditMonth(resp);
                        } break;
                    default:
                        {
                            let resp;
                            (Annually.map(data => {
                                if (data.value === defval) {
                                    resp = data;
                                }
                            }
                            ))
                            setfeedbackEditMonth(resp);
                        }
                        break;
                }
            }
        })
    }

    const initialValues = {
        employee_first_name: "",
        employee_last_name: "",
        employee_email: "",
        employee_gender: "",
        feedback_frequency: "",
        feedback_year: "",
        feedback_month: "",
        location: "",
        year_of_experience: "",
        working_presence: "",
        collect_feedback: [new Collect_feedback()],
    };

    const validate = Yup.object({
        employee_first_name: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed. ").required('First Name is required').min(2, "First Name must be minimum 2 characters long").max(15, "First Name must be 2 to 15 characters long."),
        employee_last_name: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed. ").required('Last Name is required').min(2, "Last Name must be minimum 2 characters long").max(15, "last Name must be 2 to 15 characters long."),
        employee_email: Yup.string().email().required('E-mail is Required').matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Please enter a valid e-mail."),
        feedback_frequency: Yup.number()
            .required("Feedback Frequency is required"),
        feedback_year: Yup.number()
            .required("Feedback Year is required"),
        feedback_month: Yup.number()
            .required("Feedback Month is required"),
        location: Yup.string()
            .required("Location is required"),
        year_of_experience: Yup.string()
            .required("Approximate years of experience  is required"),
        working_presence: Yup.string()
            .required("Working Presence is required"),
        employee_gender: Yup.string()
            .required("Gender is required"),
        collect_feedback: Yup.array()
            .of(
                Yup.object().shape({
                    firstName: Yup.string().required("First Name is required"),
                    lastName: Yup.string().required("Last Name is required"),
                    recipient_role: Yup.string().required("Ralationship is required"),
                    email: Yup.string()
                        .email("Invalid e-mail")
                        .required("Please enter e-mail"),
                })
            )
            .min(1, "Need at least a collect_feedback"),
    });

    const OnSubmitForm = async (values) => {
        var checkMailExist = await checkMail(values.collect_feedback[0].email);
        console.log(checkMailExist);
        // if (checkMailExist == 0) {
        //     console.log(values);
        //     var myHeaders = new Headers();
        //     myHeaders.append("Content-Type", "application/json");
        //     myHeaders.append("Authorization", token);
        //     var raw = JSON.stringify({
        //         first_name: values.employee_first_name,
        //         last_name: values.employee_last_name,
        //         user_email: values.employee_email,
        //         gender: values.employee_gender,
        //         status: 'Pending',
        //         role: 4,
        //         company_id: companyid,
        //         manager_id: managerid,
        //         feedback_frequency: values.feedback_frequency,
        //         feedback_year: values.feedback_year,
        //         feedback_month: values.feedback_month,
        //         best_classified: radioValue,
        //         service_external_client: radioValue1,
        //         location: values.location,
        //         working_presence: values.working_presence,
        //         year_of_experience: values.year_of_experience,
        //     })
        //     var requestOptions = {
        //         method: "POST",
        //         headers: myHeaders,
        //         body: raw,
        //         redirect: "follow",
        //     };
        //     fetch(BaseURL + `/employeedetails`, requestOptions)
        //         .then((response) => response.json())
        //         .then((resData) => {
        //             let count = 0;
        //             console.log(resData);
        //             let letest_Employee_Id = resData.resultId;
        //             if (resData.status == 200) {
        //                 values.collect_feedback.map((item, key) => {
        //                     let feedback_collected = item;
        //                     var myHeaders = new Headers();
        //                     myHeaders.append("Content-Type", "application/json");
        //                     myHeaders.append("Authorization", token);
        //                     var raw = JSON.stringify({
        //                         first_name: feedback_collected.firstName,
        //                         last_name: feedback_collected.lastName,
        //                         status: 'Pending',
        //                         recipient_role: feedback_collected.recipient_role,
        //                         user_email: feedback_collected.email,
        //                         employee_id: letest_Employee_Id,
        //                         manager_id: managerid,
        //                         company_id: companyid,
        //                         role: 5,
        //                     })
        //                     var requestOptions = {
        //                         method: "POST",
        //                         headers: myHeaders,
        //                         body: raw,
        //                         redirect: "follow",
        //                     };
        //                     console.log(requestOptions)
        //                     fetch(BaseURL + `/collect_feedback`, requestOptions)
        //                         .then((response) => response.json())
        //                         .then((resData) => {
        //                             console.log(resData);
        //                             setcount(prevState => prevState + 1);
        //                             console.log(resData.status)
        //                             if (resData.status == 200) {

        //                                 console.log("collected Feedback" + (key + 1));
        //                                 if (values.collect_feedback.length === (key + 1)) {
        //                                     console.log("All feedback collected");
        //                                     setConfirmDialog({
        //                                         isOpen: true,
        //                                         title: 'Alert',
        //                                         subTitle: "Survey Submitted Successfully",
        //                                     })
        //                                 }
        //                             }
        //                         })
        //                         .catch((error) => console.log("error", error));
        //                 })

        //             }
        //         })
        //         .catch((error) => console.log("error", error));
        // } else {
        //     console.log(`already exist`)
        //     setErrordisplay(`E-mail already exist`)

        // }
    };

    const OnSubmitEditForm = async (values) => {
        console.log(values.collect_feedback[0].email)
        var checkMailExist = await checkMail(values.collect_feedback[0].email);

        console.log(checkMailExist);
        if (checkMailExist == 0) {
            setErrordisplay("")

            console.log(values);
            let counter = 0;
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
            var raw = JSON.stringify({
                first_name: values.employee_first_name,
                last_name: values.employee_last_name,
                user_email: values.employee_email,
                gender: values.employee_gender,
                status: 'Pending',
                role: 4,
                company_id: companyid,
                manager_id: managerid,
                feedback_frequency: values.feedback_frequency,
                feedback_year: values.feedback_year,
                feedback_month: values.feedback_month,
                best_classified: radioValue,
                service_external_client: radioValue1,
                location: values.location,
                working_presence: values.working_presence,
                year_of_experience: values.year_of_experience,
            })
            var requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };
            console.log(exitEmployeeId);
            fetch(BaseURL + `/employeedetails/${exitEmployeeId}`, requestOptions)
                .then((response) => response.json())
                .then((resData) => {
                    console.log(resData);
                    if (resData.status == 200) {
                        values.collect_feedback.map((item, key) => {
                            let feedback_collected = item;
                            var myHeaders = new Headers();
                            myHeaders.append("Content-Type", "application/json");
                            myHeaders.append("Authorization", token);
                            var raw = JSON.stringify({
                                first_name: feedback_collected.firstName,
                                last_name: feedback_collected.lastName,
                                status: 'Pending',
                                recipient_role: feedback_collected.recipient_role,
                                user_email: feedback_collected.email,
                                employee_id: exitEmployeeId,
                                manager_id: managerid,
                                company_id: companyid,
                                role: 5,
                            })
                            var requestOptions = {
                                method: "POST",
                                headers: myHeaders,
                                body: raw,
                                redirect: "follow",
                            };
                            console.log(requestOptions)
                            fetch(BaseURL + `/collect_feedback`, requestOptions)
                                .then((response) => response.json())
                                .then((resData) => {
                                    console.log(resData);
                                    if (resData.status == 200) {
                                        console.log("collected Feedback" + (key + 1));
                                        if (values.collect_feedback.length === (key + 1)) {
                                            console.log("All feedback collected");
                                            setConfirmDialog({
                                                isOpen: true,
                                                title: 'Alert',
                                                subTitle: "Survey Submitted Successfully",
                                            })
                                        }
                                    }
                                })
                                .catch((error) => console.log("error", error));
                        })


                    }
                })
                .catch((error) => console.log("error", error));

        } else {
            console.log(`already exist`)
            setErrordisplay(`E-mail already exist`)

        }
    };

    return (
        <div>
            <div className="section inner-content">
                <div className="section-title">
                    <h1>Launch New Survey For An Employee</h1>
                    {/* <div className="nav-wrapper inner-breadcrumb">
                        <div className="col s12 pad-l-0">
                            <a href="#!">Dashboard </a>
                            <a href="#!">Launch New Survey For An Employee</a>
                        </div>
                    </div> */}
                </div>
                {getEmployeesData ? (
                    <div className="pt-0 main-screen min-height">
                        {(!showAdd && !showEdit) ? (
                            <div className="row">
                                {getEmployeesData.length !== 0 ? (
                                    <div className="col m8 s12 padtb">
                                        <CustomSelect
                                            onChange={value => handleChangeEmployee(value)}
                                            options={getEmployeesData}
                                            Field={'employee_id'}
                                            Fieldname={'employee_id'}
                                            className='select-dropdown dropdown-trigger'
                                        />
                                    </div>) : (null)}
                                <div className="col m4 s12 padtb">
                                    <button
                                        class="waves-effect waves-light btn-large mb-1 mr-1"
                                        onClick={handleAdd}
                                    >
                                        Add Employee
                                    </button>
                                </div>
                            </div>
                        ) : (null)}
                        {showAdd && !showEdit ? (
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validate}
                                validateOnBlur={false}
                                validateOnChange={false}
                                onSubmit={(values, props) => {
                                    OnSubmitForm(values, props);
                                }}
                                render={({ values, errors, touched, handleReset, setFieldValue, formik }) => {
                                    return (
                                        <Form>
                                            {getHeadquaterdata && years && getYOEdata && getfeeddata ? (
                                                <div>
                                                    <div className="row">
                                                        <div className="col m2 s12 padtb">
                                                            <label className="label_active">Feedback Frequency</label>
                                                            <CustomSelect
                                                                search={false}
                                                                onChange={value => {
                                                                    setFieldValue('feedback_frequency', value);
                                                                    getFeedbackMonth(value);
                                                                }
                                                                }
                                                                value={values.feedback_frequency}
                                                                options={getfeeddata}
                                                                Field={'FeedBack'}
                                                                Fieldname={'feedback_frequency'}
                                                                className='select-dropdown dropdown-trigger'
                                                            />
                                                            {errors.feedback_frequency ? <div className='error'>{errors.feedback_frequency}</div> : null}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col m2 s12 padtb">
                                                            <AssignTextField
                                                                label="Employee First Name"
                                                                elementType="add"
                                                                name="employee_first_name"
                                                                type="text"
                                                            />
                                                        </div>
                                                        <div className="col m2 s12 padtb">
                                                            <AssignTextField
                                                                label="Employee Last Name"
                                                                elementType="add"
                                                                name="employee_last_name"
                                                                type="text"
                                                            />
                                                        </div>
                                                        <div className="col m2 s12 padtb">
                                                            <AssignTextField
                                                                label="Employee E-mail"
                                                                elementType="add"
                                                                name="employee_email"
                                                                type="text"
                                                            />
                                                        </div>
                                                        <div className="col m2 s12 padtb">
                                                            <label className="label_active">Gender</label>
                                                            <CustomSelect
                                                                search={false}
                                                                onChange={value => setFieldValue('employee_gender', value)}
                                                                value={values.employee_gender}
                                                                options={Gender}
                                                                Field={'employee_gender'}
                                                                Fieldname={'employee_gender'}
                                                                className='select-dropdown dropdown-trigger'
                                                            />
                                                            {errors.employee_gender ? <div className='error'>{errors.employee_gender}</div> : null}
                                                        </div>
                                                        <div className="col m2 s12 padtb">
                                                            <label className="label_active">Feedback Year</label>
                                                            <CustomSelect
                                                                search={false}
                                                                onChange={value => setFieldValue('feedback_year', value)}
                                                                value={values.feedback_year}
                                                                options={years}
                                                                Field={'FeedBackYear'}
                                                                Fieldname={'feedback_year'}
                                                                className='select-dropdown dropdown-trigger'
                                                            />
                                                            {errors.feedback_year ? <div className='error'>{errors.feedback_year}</div> : null}
                                                        </div>
                                                        {values.feedback_frequency && getfeedbackMonthdata ? (
                                                            <div className="col m2 s12 padtb">
                                                                <label className="label_active">Feedback Month</label>
                                                                <CustomSelect
                                                                    search={false}
                                                                    onChange={value => setFieldValue('feedback_month', value)}
                                                                    value={values.feedback_month}
                                                                    options={getfeedbackMonthdata}
                                                                    Field={'FeedBackMonth'}
                                                                    Fieldname={'feedback_month'}
                                                                    className='select-dropdown dropdown-trigger'
                                                                />
                                                                {errors.feedback_month ? <div className='error'>{errors.feedback_month}</div> : null}
                                                            </div>
                                                        ) : (null)
                                                        }
                                                    </div>
                                                    <div className="row">
                                                        <div className="col m2 s12 padtb">
                                                        </div>
                                                        <div className="col m4 s12 padtb">
                                                            <h6 >This Person is best classified as a</h6>
                                                        </div>
                                                        <div className="col m6 s12 redio_section">
                                                            <RadioField label="Individual Contributer" value="individual_contributer" name="Male" HandleStatus={HandleStatus} isSelectedCheck={radioValue == "individual_contributer"} />
                                                            <RadioField label="Team or Business Leader" value="team_or_business_leader" name="group1" HandleStatus={HandleStatus} isSelectedCheck={radioValue == "team_or_business_leader"} />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col m2 s12 padtb">
                                                        </div>
                                                        <div className="col m4 s12 padtb">
                                                            <h6 >Does this person directly service external clients of the organization ?</h6>
                                                        </div>
                                                        <div className="col m4 s12 redio_section">
                                                            <RadioField label="Yes" value="Yes" name="client" HandleStatus={HandleStatus1} isSelectedCheck={radioValue1 == "Yes"} />
                                                            <RadioField label="No" value="No" name="client" HandleStatus={HandleStatus1} isSelectedCheck={radioValue1 == "No"} />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col m2 s12 padtb">
                                                        </div>
                                                        <div className="col m4 s12 padtb">
                                                            <h6 >Location of individual</h6>
                                                        </div>
                                                        <div className="col m4 s12 padtb">
                                                            <CustomSelect
                                                                search={false}
                                                                onChange={value => setFieldValue('location', value)}
                                                                value={values.location}
                                                                options={getHeadquaterdata}
                                                                Field={'Headquaters'}
                                                                Fieldname={'location'}
                                                                className='select-dropdown dropdown-trigger'
                                                            />
                                                            {errors.location ? <div className='error'>{errors.location}</div> : null}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col m2 s12 padtb">
                                                        </div>
                                                        <div className="col m4 s12 padtb">
                                                            <h6 >Working Presence</h6>
                                                        </div>
                                                        <div className="col m4 s12 padtb">
                                                            <CustomSelect
                                                                search={false}
                                                                onChange={value => setFieldValue('working_presence', value)}
                                                                value={values.working_presence}
                                                                options={WorkingPresence}
                                                                Field={'working_presence'}
                                                                Fieldname={'working_presence'}
                                                                className='select-dropdown dropdown-trigger'
                                                            />
                                                            {errors.working_presence ? <div className='error'>{errors.working_presence}</div> : null}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col m2 s12 padtb">
                                                        </div>
                                                        <div className="col m4 s12 padtb">
                                                            <h6 >Approximate years of experience</h6>
                                                        </div>
                                                        <div className="col m4 s12 padtb">
                                                            <CustomSelect
                                                                search={false}
                                                                onChange={value => setFieldValue('year_of_experience', value)}
                                                                value={values.year_of_experience}
                                                                options={getYOEdata}
                                                                Field={'year_of_experience'}
                                                                Fieldname={'year_of_experience'}
                                                                className='select-dropdown dropdown-trigger'
                                                            />
                                                            {errors.year_of_experience ? <div className='error'>{errors.year_of_experience}</div> : null}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col m12 s12 padtb">
                                                            <div className="col m2 s12 padtb">
                                                            </div>
                                                            <div className="col m4 s12 padtb">
                                                                <h6 >Collect feedback from</h6>
                                                            </div>
                                                            <FieldArray
                                                                name="collect_feedback"
                                                                render={({ insert, remove, push }) => (
                                                                    <div >
                                                                        {values.collect_feedback.length > 0 &&
                                                                            values.collect_feedback.map((friend, index) => (
                                                                                <div
                                                                                    className="col m12 s12 padtb"
                                                                                    key={index}
                                                                                >
                                                                                    <div className="col m1 s12 padtb">
                                                                                    </div>
                                                                                    <div className="col m2 s12 padtb">
                                                                                        <AssignTextField
                                                                                            label="First Name"
                                                                                            elementType="add"
                                                                                            name={`collect_feedback.${index}.firstName`}
                                                                                            type="text"
                                                                                        />
                                                                                        {/* <Field
                                                                                    className="form-control"
                                                                                    name={`collect_feedback.${index}.firstName`}
                                                                                    placeholder="firstName"
                                                                                    type="text"
                                                                                /> */}
                                                                                        {/* {errors &&
                                                                                            errors.collect_feedback &&
                                                                                            errors.collect_feedback[index] &&
                                                                                            errors.collect_feedback[index].firstName &&
                                                                                            touched &&
                                                                                            touched.collect_feedback &&
                                                                                            touched.collect_feedback[index] &&
                                                                                            touched.collect_feedback[index].firstName && (
                                                                                                <div className="field-error">
                                                                                                    {errors.collect_feedback[index].firstName}
                                                                                                </div>
                                                                                            )} */}
                                                                                    </div>
                                                                                    <div className="col m2 s12 padtb">
                                                                                        <AssignTextField
                                                                                            label="Last Name"
                                                                                            elementType="add"
                                                                                            name={`collect_feedback.${index}.lastName`}
                                                                                            type="text"
                                                                                        />
                                                                                        {/* <Field
                                                                                    className="form-control"
                                                                                    name={`collect_feedback.${index}.lastName`}
                                                                                    placeholder="lastName"
                                                                                    type="text"
                                                                                />
                                                                                {errors &&
                                                                                    errors.collect_feedback &&
                                                                                    errors.collect_feedback[index] &&
                                                                                    errors.collect_feedback[index].lastName &&
                                                                                    touched &&
                                                                                    touched.collect_feedback &&
                                                                                    touched.collect_feedback[index] &&
                                                                                    touched.collect_feedback[index].lastName && (
                                                                                        <div className="field-error">
                                                                                            {errors.collect_feedback[index].lastName}
                                                                                        </div>
                                                                                    )} */}
                                                                                    </div>
                                                                                    <div className="col m2 s12 padtb">
                                                                                        <AssignTextField
                                                                                            label="E-mail"
                                                                                            elementType="add"
                                                                                            name={`collect_feedback.${index}.email`}
                                                                                            type="text"
                                                                                        />
                                                                                        {/* <Field
                                                                                    className="form-control"
                                                                                    name={`collect_feedback.${index}.role`}
                                                                                    placeholder="role"
                                                                                    type="text"
                                                                                />
                                                                                {errors &&
                                                                                    errors.collect_feedback &&
                                                                                    errors.collect_feedback[index] &&
                                                                                    errors.collect_feedback[index].role &&
                                                                                    touched &&
                                                                                    touched.collect_feedback &&
                                                                                    touched.collect_feedback[index] &&
                                                                                    touched.collect_feedback[index].role && (
                                                                                        <div className="field-error">
                                                                                            {errors.collect_feedback[index].role}
                                                                                        </div>
                                                                                    )} */}
                                                                                    </div>
                                                                                    <div className="col m2 s12 padtb">
                                                                                        {/* <AssignTextField
                                                                                            label="Relation"
                                                                                            elementType="add"
                                                                                            name={`collect_feedback.${index}.recipient_role`}
                                                                                            type="text"
                                                                                        /> */}
                                                                                        {/* <div className="col m2 s12 padtb"> */}
                                                                                        <label className="label_active">Ralationship</label>
                                                                                        <CustomEditSelect
                                                                                            search={false}
                                                                                            onChange={value => setFieldValue(`collect_feedback.${index}.recipient_role`, value)}
                                                                                            value={`values.collect_feedback.${index}.recipient_role`}
                                                                                            options={Relationship}
                                                                                            Field={`recipient_role`}
                                                                                            Fieldname={`collect_feedback.${index}.recipient_role`}
                                                                                            className='select-dropdown dropdown-trigger'
                                                                                        />
                                                                                        {/* {`errors.collect_feedback.${index}.recipient_role` ? <div className='error'>{`errors.collect_feedback.${index}.recipient_role`}</div> : null} */}
                                                                                        {errors &&
                                                                                            errors.collect_feedback &&
                                                                                            errors.collect_feedback[index] &&
                                                                                            errors.collect_feedback[index].recipient_role &&
                                                                                            touched &&
                                                                                            touched.collect_feedback &&
                                                                                            touched.collect_feedback[index] &&
                                                                                            touched.collect_feedback[index].recipient_role && (
                                                                                                <div className="error">
                                                                                                    {errors.collect_feedback[index].recipient_role}
                                                                                                </div>
                                                                                            )}
                                                                                        {/* </div> */}
                                                                                        {/* <Field
                                                                                    className="form-control"
                                                                                    name={`collect_feedback.${index}.email`}
                                                                                    placeholder="email"
                                                                                    type="email"
                                                                                />
                                                                                {errors &&
                                                                                    errors.collect_feedback &&
                                                                                    errors.collect_feedback[index] &&
                                                                                    errors.collect_feedback[index].email &&
                                                                                    touched &&
                                                                                    touched.collect_feedback &&
                                                                                    touched.collect_feedback[index] &&
                                                                                    touched.collect_feedback[index].email && (
                                                                                        <div className="field-error">
                                                                                            {errors.collect_feedback[index].email}
                                                                                        </div>
                                                                                    )} */}
                                                                                    </div>
                                                                                    {index > 0 && (
                                                                                        <div className="col m1 s12 padtb">
                                                                                            <div className="input-field assign col m12 s12 pad-r" >
                                                                                                <button
                                                                                                    type="button"
                                                                                                    className="waves-effect waves-light btn-large mb-1 mr-1"
                                                                                                    onClick={() => remove(index)}
                                                                                                >
                                                                                                    X
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>)}
                                                                                    {
                                                                                        <div className="col m2 s12 padtb">
                                                                                            <div className="input-field assign col m12 s12 pad-r" >
                                                                                                <button
                                                                                                    type="button"
                                                                                                    className="waves-effect waves-light btn-large mb-1 mr-1"
                                                                                                    onClick={() => push(new Collect_feedback())}
                                                                                                >
                                                                                                    +
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            ))}
                                                                        {/* <div className="col m2 s12 padtb">
                                                                    <div className="input-field assign col m12 s12 pad-r" >
                                                                        <button
                                                                            type="button"
                                                                            className="waves-effect waves-light btn-large mb-1 mr-1"
                                                                            onClick={() => push(new Collect_feedback())}
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </div>
                                                                </div> */}
                                                                    </div>
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="col m8 s8 pad-r center">
                                                        <button
                                                            class="waves-effect waves-light btn-large mb-1 mr-1"
                                                            type="submit"
                                                            name="action"
                                                        >
                                                            Submit
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (null)}
                                        </Form>
                                    )
                                }}
                            />
                        ) : (null)}
                        {!showAdd && showEdit && selectedUser ? (
                            <Formik
                                initialValues={selectedUser}
                                enableReinitialize
                                validationSchema={validate}
                                validateOnBlur={false}
                                validateOnChange={false}
                                onSubmit={(values, props) => {
                                    OnSubmitEditForm(values, props);
                                }}
                                render={({ values, errors, touched, handleReset, setFieldValue, formik }) => {
                                    return (
                                        <Form>
                                            {getHeadquaterdata && years && getyear_of_experienceIDName && getLocationIdName && getYOEdata && feedbackIdName && getfeeddata && selectedUser ? (
                                                <div>
                                                    {/* <div>{JSON.stringify(selectedUser)}</div> */}
                                                    <div className="row">
                                                        <div className="col m2 s12 padtb">
                                                            <label className="label_active">Feedback Frequency</label>
                                                            <CustomEditSelect
                                                                search={false}
                                                                onChange={value => {
                                                                    setFieldValue('feedback_frequency', value);
                                                                    getFeedbackMonth(value);
                                                                }}
                                                                value={values.feedback_frequency}
                                                                defValue={feedbackIdName}
                                                                options={getfeeddata}
                                                                Field={'FeedBack'}
                                                                Fieldname={'feedback_frequency'}
                                                                className='select-dropdown dropdown-trigger'
                                                            />
                                                            {errors.feedback_frequency ? <div className='error'>{errors.feedback_frequency}</div> : null}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col m2 s12 padtb">
                                                            <EditTextField
                                                                label="Employee First Name"
                                                                elementtype="edit"
                                                                name="employee_first_name"
                                                                type="text"
                                                                onInputChange={onInputChange}
                                                                value={selectedUser.employee_first_name}
                                                            />
                                                        </div>
                                                        <div className="col m2 s12 padtb">
                                                            <EditTextField
                                                                label="Employee Last Name"
                                                                elementType="add"
                                                                name="employee_last_name"
                                                                type="text"
                                                                onInputChange={onInputChange}
                                                                value={selectedUser.employee_last_name}
                                                            />
                                                        </div>
                                                        <div className="col m2 s12 padtb">
                                                            <EditTextField
                                                                label="Employee E-mail"
                                                                elementtype="edit"
                                                                name="employee_email"
                                                                type="text"
                                                                onInputChange={onInputChange}
                                                                value={selectedUser.employee_email}
                                                            />
                                                        </div>
                                                        <div className="col m2 s12 padtb">
                                                            <label className="label_active">Gender</label>
                                                            <CustomEditSelect
                                                                search={false}
                                                                onChange={value => setFieldValue('employee_gender', value)}
                                                                value={values.employee_gender}
                                                                defValue={getgenderdata}
                                                                options={Gender}
                                                                Field={'employee_gender'}
                                                                Fieldname={'employee_gender'}
                                                                className='select-dropdown dropdown-trigger'
                                                            />
                                                            {errors.employee_gender ? <div className='error'>{errors.employee_gender}</div> : null}
                                                        </div>
                                                        <div className="col m2 s12 padtb">
                                                            <label className="label_active">Feedback Year</label>
                                                            <CustomEditSelect
                                                                search={false}
                                                                onChange={value => setFieldValue('feedback_year', value)}
                                                                value={values.feedback_year}
                                                                defValue={selectedUser.feedback_year}
                                                                options={years}
                                                                Field={'FeedBackYear'}
                                                                Fieldname={'feedback_year'}
                                                                className='select-dropdown dropdown-trigger'
                                                            />
                                                            {errors.feedback_year ? <div className='error'>{errors.feedback_year}</div> : null}
                                                        </div>
                                                        {values.feedback_frequency && getfeedbackMonthdata && getfeedbackEditMonthdata ? (
                                                            <div className="col m2 s12 padtb">
                                                                <label className="label_active">Feedback Month</label>
                                                                <CustomEditSelect
                                                                    search={false}
                                                                    onChange={value => setFieldValue('feedback_month', value)}
                                                                    value={values.feedback_month}
                                                                    defValue={getfeedbackEditMonthdata}
                                                                    options={getfeedbackMonthdata}
                                                                    Field={'FeedBackMonth'}
                                                                    Fieldname={'feedback_month'}
                                                                    className='select-dropdown dropdown-trigger'
                                                                />
                                                                {errors.feedback_month ? <div className='error'>{errors.feedback_month}</div> : null}
                                                            </div>
                                                        ) : (null)
                                                        }
                                                    </div>
                                                    <div className="row">
                                                        <div className="col m2 s12 padtb">
                                                        </div>
                                                        <div className="col m4 s12 padtb">
                                                            <h6 >This Person is best classified as a</h6>
                                                        </div>
                                                        <div className="col m6 s12 redio_section">
                                                            {/* <div>{JSON.stringify(selectedUser.best_classified)}</div> */}
                                                            <RadioEdit
                                                                label="Individual Contributer"
                                                                value="individual_contributer"
                                                                name="status"
                                                                HandleStatus={HandleEditStatus}
                                                                isSelectedCheck={
                                                                    selectedUser.best_classified == "individual_contributer"
                                                                }
                                                            />
                                                            <RadioEdit
                                                                label="Team or Business Leader"
                                                                value="team_or_business_leader"
                                                                name="status1"
                                                                HandleStatus={HandleEditStatus}
                                                                isSelectedCheck={
                                                                    selectedUser.best_classified == "team_or_business_leader"
                                                                }
                                                            />
                                                            {/* <RadioField label="Individual Contributer" value="individual_contributer" name="Male" HandleStatus={HandleStatus} isSelectedCheck={radioValue == "individual_contributer"} />
                                                            <RadioField label="Team or Business Leader" value="team_or_business_leader" name="group1" HandleStatus={HandleStatus} isSelectedCheck={radioValue == "team_or_business_leader"} /> */}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col m2 s12 padtb">
                                                        </div>
                                                        <div className="col m4 s12 padtb">
                                                            <h6 >Does this person directly service external clients of the organization ?</h6>
                                                        </div>
                                                        <div className="col m4 s12 redio_section">
                                                            <RadioEdit
                                                                label="Yes"
                                                                value="Yes"
                                                                name="status3"
                                                                HandleStatus={HandleEditStatus1}
                                                                isSelectedCheck={
                                                                    selectedUser.service_external_client == "Yes"
                                                                }
                                                            />
                                                            <RadioEdit
                                                                label="No"
                                                                value="No"
                                                                name="status4"
                                                                HandleStatus={HandleEditStatus1}
                                                                isSelectedCheck={
                                                                    selectedUser.service_external_client == "No"
                                                                }
                                                            />
                                                            {/* <RadioField label="Yes" value="Yes" name="client" HandleStatus={HandleStatus1} isSelectedCheck={radioValue1 == "Yes"} />
                                                            <RadioField label="No" value="No" name="client" HandleStatus={HandleStatus1} isSelectedCheck={radioValue1 == "No"} /> */}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col m2 s12 padtb">
                                                        </div>
                                                        <div className="col m4 s12 padtb">
                                                            <h6 >Location of individual</h6>
                                                        </div>
                                                        <div className="col m4 s12 padtb">
                                                            <CustomEditSelect
                                                                search={false}
                                                                onChange={value => setFieldValue('location', value)}
                                                                defValue={getLocationIdName}
                                                                value={values.location}
                                                                options={getHeadquaterdata}
                                                                Field={'Headquaters'}
                                                                Fieldname={'location'}
                                                                className='select-dropdown dropdown-trigger'
                                                            />
                                                            {errors.location ? <div className='error'>{errors.location}</div> : null}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col m2 s12 padtb">
                                                        </div>
                                                        <div className="col m4 s12 padtb">
                                                            <h6 >Working Presence</h6>
                                                        </div>
                                                        <div className="col m4 s12 padtb">
                                                            <CustomEditSelect
                                                                search={false}
                                                                onChange={value => setFieldValue('working_presence', value)}
                                                                value={values.working_presence}
                                                                options={WorkingPresence}
                                                                defValue={getWorkingPresenceIDName}
                                                                Field={'working_presence'}
                                                                Fieldname={'working_presence'}
                                                                className='select-dropdown dropdown-trigger'
                                                            />
                                                            {errors.working_presence ? <div className='error'>{errors.working_presence}</div> : null}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col m2 s12 padtb">
                                                        </div>
                                                        <div className="col m4 s12 padtb">
                                                            <h6 >Approximate years of experience</h6>
                                                        </div>
                                                        <div className="col m4 s12 padtb">
                                                            <CustomEditSelect
                                                                search={false}
                                                                onChange={value => setFieldValue('year_of_experience', value)}
                                                                value={values.year_of_experience}
                                                                defValue={getyear_of_experienceIDName}
                                                                options={getYOEdata}
                                                                Field={'year_of_experience'}
                                                                Fieldname={'year_of_experience'}
                                                                className='select-dropdown dropdown-trigger'
                                                            />
                                                            {errors.year_of_experience ? <div className='error'>{errors.year_of_experience}</div> : null}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col m12 s12 padtb">
                                                            <div className="col m2 s12 padtb">
                                                            </div>
                                                            <div className="col m4 s12 padtb">
                                                                <h6 >Collect feedback from</h6>
                                                                {/* <div>{JSON.stringify(selectedUser)}</div> */}
                                                                {/* {values.collect_feedback ? (<div>{JSON.stringify(values.collect_feedback.length)}</div>) : (null)} */}
                                                            </div>
                                                            {values.collect_feedback ? (
                                                                <FieldArray
                                                                    name="collect_feedback"
                                                                    render={({ insert, remove, push }) => (
                                                                        <div >
                                                                            {values.collect_feedback.length > 0 &&
                                                                                values.collect_feedback.map((friend, index) => (
                                                                                    <div
                                                                                        className="col m12 s12 padtb"
                                                                                        key={index}
                                                                                    >
                                                                                        <div className="col m1 s12 padtb">
                                                                                        </div>
                                                                                        <div className="col m2 s12 padtb">
                                                                                            <AssignTextField
                                                                                                label="First Name"
                                                                                                elementType="add"
                                                                                                name={`collect_feedback.${index}.firstName`}
                                                                                                type="text"
                                                                                            />
                                                                                        </div>
                                                                                        <div className="col m2 s12 padtb">
                                                                                            <AssignTextField
                                                                                                label="Last Name"
                                                                                                elementType="add"
                                                                                                name={`collect_feedback.${index}.lastName`}
                                                                                                type="text"
                                                                                            />
                                                                                        </div>
                                                                                        <div className="col m2 s12 padtb">
                                                                                            <AssignTextField
                                                                                                label="E-mail"
                                                                                                elementType="add"
                                                                                                name={`collect_feedback.${index}.email`}
                                                                                                type="text"
                                                                                            />
                                                                                            <span>{Errordisplay}</span>
                                                                                        </div>
                                                                                        <div className="col m2 s12 padtb">
                                                                                            {/* <AssignTextField
                                                                                                label="Relation"
                                                                                                elementType="add"
                                                                                                name={`collect_feedback.${index}.recipient_role`}
                                                                                                type="text"
                                                                                            /> */}
                                                                                            <label className="label_active">Ralationship</label>
                                                                                            <CustomEditSelect
                                                                                                search={false}
                                                                                                onChange={value => setFieldValue(`collect_feedback.${index}.recipient_role`, value)}
                                                                                                value={`values.collect_feedback.${index}.recipient_role`}
                                                                                                options={Relationship}
                                                                                                Field={`recipient_role`}
                                                                                                Fieldname={`collect_feedback.${index}.recipient_role`}
                                                                                                className='select-dropdown dropdown-trigger'
                                                                                            />
                                                                                            {/* {`errors.collect_feedback.${index}.recipient_role` ? <div className='error'>{`errors.collect_feedback.${index}.recipient_role`}</div> : null} */}
                                                                                            {errors &&
                                                                                                errors.collect_feedback &&
                                                                                                errors.collect_feedback[index] &&
                                                                                                errors.collect_feedback[index].recipient_role &&
                                                                                                touched &&
                                                                                                touched.collect_feedback &&
                                                                                                touched.collect_feedback[index] &&
                                                                                                touched.collect_feedback[index].recipient_role && (
                                                                                                    <div className="error">
                                                                                                        {errors.collect_feedback[index].recipient_role}
                                                                                                    </div>
                                                                                                )}
                                                                                        </div>
                                                                                        {index > 0 && (
                                                                                            <div className="col m1 s12 padtb">
                                                                                                <div className="input-field assign col m12 s12 pad-r" >
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        className="waves-effect waves-light btn-large mb-1 mr-1"
                                                                                                        onClick={() => remove(index)}
                                                                                                    >
                                                                                                        X
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>)}
                                                                                        {
                                                                                            <div className="col m2 s12 padtb">
                                                                                                <div className="input-field assign col m12 s12 pad-r" >
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        className="waves-effect waves-light btn-large mb-1 mr-1"
                                                                                                        onClick={() => push(new Collect_feedback())}
                                                                                                    >
                                                                                                        +
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        }
                                                                                    </div>
                                                                                ))}
                                                                        </div>
                                                                    )}
                                                                />) : (null)}
                                                        </div>
                                                    </div>
                                                    <div class="col m8 s8 pad-r center">
                                                        <button
                                                            class="waves-effect waves-light btn-large mb-1 mr-1"
                                                            type="submit"
                                                            name="action"
                                                        >
                                                            Submit
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (null)}
                                        </Form>
                                    )
                                }}
                            />
                        ) : (null)}
                    </div>
                ) : (null)}
            </div>
            <MaxWidthDialog setConfirmDialog={setConfirmDialog} confirmDialog={confirmDialog} link={'/'} />
        </div >
    )
}
