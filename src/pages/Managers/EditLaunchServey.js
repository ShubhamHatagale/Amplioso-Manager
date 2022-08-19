import { FormControlLabel, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import { useHistory, useParams, useLocation } from "react-router-dom";
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
// export class Collect_feedback {
//     constructor() {
//         this.id = ""
//         this.first_name = "";
//         this.last_name = "";
//         this.user_email = "";
//         this.role = "";
//         this.status = "";
//         this.employee_id = "";
//         this.is_deleted = "";
//         this.createdAt = "";
//         this.updatedAt = "";
//     }
// }
export class Collect_feedback {
    constructor() {
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.recipient_role = "";
    }
}
export default function EditAssignSurvey() {
    const location = useLocation();
    const range = (start, end) => {
        return new Array((end + 1) - start).fill().map((d, i) => i + start);
    };
    const years = range(1800, getYear(new Date()));
    const [showEdit, setShowEdit] = useState(false);
    const [count, setcount] = useState(0);
    const BaseURL = process.env.REACT_APP_Base_URL;
    const Empid = location.state.detail;
    const managerid = localStorage.getItem("manager_id");
    const companyid = localStorage.getItem("companyId");
    const token = localStorage.getItem("manager_jwt");
    let [comid, setcomid] = useState("");
    let FeedBackData;
    let [radioValue, setradioValue] = useState('individual_contributer');
    let [radioValue1, setradioValue1] = useState('Yes');
    const [selectedUser, setSelectedUser] = useState({});
    const [getfeedbackMonthdata, setfeedbackMonth] = useState('');
    const [getfeedbackEditMonthdata, setfeedbackEditMonth] = useState('');
    const [CollectedUser, setCollectedUser] = useState({});
    const [getEmployeesData, setEmolyeesData] = useState('');
    const [getCollectedFeedback, setCollectedFeedback] = useState('');
    const [exitEmployeeId, setExitRmployeeId] = useState('');
    const [getHeadquaterdata, setgetHeadquaterdata] = useState('');
    const [getYOEdata, setYOEdata] = useState('');
    const [getgenderdata, setGenderdata] = useState('');
    const [getWorkingPresenceIDName, setWorkingPresenceIDName] = useState('');
    const [getyear_of_experienceIDName, setyear_of_experienceIDName] = useState('');
    const [feedbackIdName, setFeedbackIdName] = useState('');
    const [getfeeddata, setgetfeeddata] = useState('');
    const [getLocationIdName, setLocationIdName] = useState('');
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', type: '' })
    const onInputChange = (e) => {
        setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
    };
    const WorkingPresence = [
        { label: 'Virtual/ Remote/ from Home', value: 1 },
        { label: 'Hybrid (Partially virtual, Partially in the Office)', value: 2 },
        { label: 'In the Office', value: 3 },
    ]
    const Monthly = [
        { label: 'Jan-Feb', value: 1 },
        { label: 'Feb-Mar', value: 2 },
        { label: 'Mar-Apr', value: 3 },
        { label: 'Apr-May', value: 4 },
        { label: 'May-Jun', value: 5 },
        { label: 'Jun-Jul', value: 6 },
        { label: 'Jul-Aug', value: 7 },
        { label: 'Aug-Sep', value: 8 },
        { label: 'Sep-Oct', value: 9 },
        { label: 'Oct-Nev', value: 10 },
        { label: 'Nev-Dec', value: 11 },
        { label: 'Dec-Jan', value: 12 },
    ]
    const Quaterly = [
        { label: 'Jan-Mar', value: 1 },
        { label: 'Apr-Jun', value: 2 },
        { label: 'Jul-Sept', value: 3 },
        { label: 'Oct- Dec', value: 4 },
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
        FeedBackData = result;
        setgetfeeddata(result);
        getEmployyes();
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
        console.log(Empid + "-------------")
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'multipart/form-data')
        myHeaders.append("Authorization", token);
        let resp = await fetch(BaseURL + `/collect_feedback/employee/${Empid}`,
            {
                method: "get",
                headers: myHeaders
            }
        );
        let responsefeed = await resp.json();
        let feedresult = responsefeed.data;
        console.log(feedresult);
        setCollectedFeedback(feedresult);
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'multipart/form-data')
        myHeaders.append("Authorization", token);
        let res = await fetch(BaseURL + `/employeedetails/${Empid}`,
            {
                method: "get",
                headers: myHeaders
            }
        );
        let response = await res.json();
        let result = response.data;
        console.log(result);
        setEmolyeesData(result);
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
                collect_feedback: feedresult,
            })
            const fetchFeedbackIdName = async () => {
                const employee = await getAllFeedbackApi(item.feedback_frequency);
                setFeedbackIdName(employee);
                console.log(employee);
                employee.map(val => {
                    console.log("feed_freq : : " + val.id);
                    fetchFeedbackMonth(val.id);
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
        })


    }

    useEffect(() => {
        getFeedback();
        if (location.state.type == "Edit") {
            setShowEdit(true);
        }
        setcomid(location.state.detail);
        console.log(showEdit)
    }, []);

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


    const fetchFeedbackMonth = async (val) => {
        console.log("feed_freq : " + val);
        
        console.log(FeedBackData);
        FeedBackData.map(data => {
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

    const getEditFeedbackMonth = async (val, defval) => {
        
        console.log(FeedBackData);
        FeedBackData.map(item => {
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
        new_collect_feedback: [new Collect_feedback()],
    };

    const newvalidate = Yup.object({
       
        new_collect_feedback: Yup.array()
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
        new_collect_feedback: Yup.array()
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

    const OnSubmitForm = (values) => {
        console.log(values.new_collect_feedback);
        values.new_collect_feedback.map((item, key) => {
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
                employee_id: comid,
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
                        if (values.new_collect_feedback.length === (key + 1)) {
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
        });
    }


    const OnSubmitEditForm = (values) => {
        console.log(values);
        //     let counter = 0;
        //     var myHeaders = new Headers();
        //     myHeaders.append("Content-Type", "application/json");
        //     myHeaders.append("Authorization", token);
        //     var raw = JSON.stringify({
        //         first_name: values.employee_first_name,
        //         last_name: values.employee_last_name,
        //         user_email: values.employee_email,
        //         company_id: companyid,
        //         manager_id: id,
        //         feedback_frequency: values.feedback_frequency,
        //         feedback_year: values.feedback_year,
        //         feedback_month: values.feedback_month,
        //         best_classified: selectedUser.best_classified,
        //         service_external_client: selectedUser.service_external_client,
        //         location: values.location,
        //         working_presence: values.working_presence,
        //         year_of_experience: values.year_of_experience,
        //         gender: values.employee_gender
        //     })
        //     var requestOptions = {
        //         method: "PUT",
        //         headers: myHeaders,
        //         body: raw,
        //         redirect: "follow",
        //     };
        //     console.log(exitEmployeeId);
        //     fetch(BaseURL + `/employeedetails/${exitEmployeeId}`, requestOptions)
        //         .then((response) => response.json())
        //         .then((resData) => {
        //             console.log(resData);
        //             if (resData.status == 200) {
        //                 values.collect_feedback.map((item, key) => {
        //                     let feedback_collected = item;
        //                     var myHeaders = new Headers();
        //                     myHeaders.append("Content-Type", "application/json");
        //                     myHeaders.append("Authorization", token);
        //                     var raw = JSON.stringify({
        //                         first_name: feedback_collected.firstName,
        //                         last_name: feedback_collected.lastName,
        //                         user_email: feedback_collected.email,
        //                         employee_id: exitEmployeeId,
        //                         recipient_role: feedback_collected.recipient_role,
        //                         status: "Pending"
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
        // };
    }

    return (
        <div>
            <div className="section inner-content">
                <div className="section-title">
                    <h1>View Launch Survey</h1>
                </div>
                <div className="pt-0 main-screen">
                    {showEdit ? (
                        <Formik
                            initialValues={selectedUser}
                            enableReinitialize
                            validationSchema={validate}
                            validateOnBlur={false}
                            validateOnChange={true}
                            onSubmit={(values, props) => {
                                OnSubmitEditForm(values, props);
                            }}
                            render={({ values, errors, touched, handleReset, setFieldValue, formik }) => {
                                return (
                                    <Form>
                                        {getfeeddata && selectedUser && years && selectedUser.feedback_year ? (
                                            <div>
                                                <div className="row">
                                                    <div className="col m6 s6 padtb">
                                                        <h6>Self Assessment</h6>
                                                    </div>
                                                </div>
                                            
                                                <div className="row">
                                                    <div className="col m2 s12 padtb">
                                                        <EditTextField
                                                            label="Employee First Name"
                                                            elementtype="View"
                                                            name="employee_first_name"
                                                            type="text"
                                                            onInputChange={onInputChange}
                                                            value={selectedUser.employee_first_name}
                                                            disabled
                                                        />
                                                    </div>
                                                    <div className="col m2 s12 padtb">
                                                        <EditTextField
                                                            label="Employee Last Name"
                                                            elementType="View"
                                                            name="employee_last_name"
                                                            type="text"
                                                            onInputChange={onInputChange}
                                                            value={selectedUser.employee_last_name}
                                                            disabled
                                                        />
                                                    </div>
                                                    <div className="col m2 s12 padtb">
                                                        <EditTextField
                                                            label="Employee E-mail"
                                                            elementtype="View"
                                                            name="employee_email"
                                                            type="text"
                                                            onInputChange={onInputChange}
                                                            value={selectedUser.employee_email}
                                                            disabled
                                                        />
                                                    </div>
                                                    {/* <div className="col m2 s12 padtb">
                                                        <label>Gender</label>
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
                                                    </div> */}
                                                    <div className="col m2 s12 padtb">
                                                        <label className="label_active">Feedback Year</label>
                                                        <CustomEditSelect
                                                            disable={true}
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
                                                                disable={true}
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
                                                    <div className="col m2 s12 padtb">
                                                        <div className="status-box">{selectedUser.status}</div>
                                                    </div>
                                                </div>
                                              
                                                <div className="row">
                                                    <div className="col m12 s12 padtb">
                                                        <div className="col m4 s12 padtb">
                                                            <h6 >Collect feedback from</h6>
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
                                                                                    {/* <div className="col m1 s12 padtb">
                                                                                        <div>{JSON.stringify(friend)}</div>
                                                                                    </div> */}
                                                                                    <div className="col m2 s12 padtb">
                                                                                        {/* <AssignTextField
                                                                                            label="First Name"
                                                                                            elementType="add"
                                                                                            name={`collect_feedback.${index}.firstName`}
                                                                                            type="text"
                                                                                        /> */}
                                                                                        <EditTextField
                                                                                            label="First Name"
                                                                                            elementtype="View"
                                                                                            name={`collect_feedback.${index}.first_name`}
                                                                                            type="text"
                                                                                            onInputChange={onInputChange}
                                                                                            value={friend.first_name}
                                                                                            disabled
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col m2 s12 padtb">
                                                                                        {/* <AssignTextField
                                                                                            label="Last Name"
                                                                                            elementType="add"
                                                                                            name={`collect_feedback.${index}.last_name`}
                                                                                            type="text"
                                                                                        /> */}
                                                                                        <EditTextField
                                                                                            label="Last Name"
                                                                                            elementtype="View"
                                                                                            name={`collect_feedback.${index}.last_name`}
                                                                                            type="text"
                                                                                            onInputChange={onInputChange}
                                                                                            value={friend.last_name}
                                                                                            disabled
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col m2 s12 padtb">
                                                                                        {/* <AssignTextField
                                                                                            label="E-mail"
                                                                                            elementType="add"
                                                                                            name={`collect_feedback.${index}.user_email`}
                                                                                            type="text"
                                                                                        /> */}
                                                                                        <EditTextField
                                                                                            label="E-mail"
                                                                                            elementtype="View"
                                                                                            name={`collect_feedback.${index}.user_email`}
                                                                                            type="text"
                                                                                            onInputChange={onInputChange}
                                                                                            value={friend.user_email}
                                                                                            disabled
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col m2 s12 padtb">
                                                                                        {/* <AssignTextField
                                                                                            label="Role"
                                                                                            elementType="add"
                                                                                            name={`collect_feedback.${index}.role`}
                                                                                            type="text"
                                                                                        /> */}
                                                                                        {/* <EditTextField
                                                                                            label="Relation"
                                                                                            elementtype="View"
                                                                                            name={`collect_feedback.${index}.recipient_role`}
                                                                                            type="text"
                                                                                            onInputChange={onInputChange}
                                                                                            value={friend.recipient_role}
                                                                                            disabled
                                                                                        /> */}
                                                                                        <label className="label_active">Ralationship</label>
                                                                                        <CustomEditSelect
                                                                                            search={false}
                                                                                            disable={true}
                                                                                            defValue={friend.recipient_role}
                                                                                            onChange={value => setFieldValue(`collect_feedback.${index}.recipient_role`, value)}
                                                                                            value={`values.collect_feedback.${index}.recipient_role`}
                                                                                            options={Relationship}
                                                                                            Field={`recipient_role`}
                                                                                            Fieldname={`collect_feedback.${index}.recipient_role`}
                                                                                            className='select-dropdown dropdown-trigger'
                                                                                        />
                                                                                        {/* {`errors.collect_feedback.${index}.recipient_role` ? <div className='error'>{`errors.collect_feedback.${index}.recipient_role`}</div> : null} */}
                                                                                    </div>
                                                                                    <div className="col m2 s12 padtb">
                                                                                        <div className="status-box">{friend.status}</div>
                                                                                    </div>
                                                                                    {/* {index > 0 && (
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
                                                                                        </div>)
                                                                                    }
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
                                                                                    } */}
                                                                                </div>
                                                                            ))}
                                                                    </div>
                                                                )}
                                                            />) : (null)}
                                                    </div>
                                                </div>
                                                {/* <div class="col m8 s8 pad-r center">
                                                    <button
                                                        class="waves-effect waves-light btn-large mb-1 mr-1"
                                                        type="submit"
                                                        name="action"
                                                    >
                                                        Submit
                                                    </button>
                                                </div> */}
                                            </div>
                                        ) : (null)}
                                    </Form>
                                )
                            }}
                        />
                    ) : (null)}
                    {/* <div>
                        <div>{JSON.stringify(selectedUser)}</div>
                    </div> */}
                    {showEdit ? (
                        <Formik
                            initialValues={initialValues}
                            validationSchema={newvalidate}
                            onSubmit={(values, props) => {
                                OnSubmitForm(values, props);
                            }}
                            render={({ values, errors, touched, handleReset, setFieldValue, formik }) => {
                                return (
                                    <Form>
                                        <div>
                                            <div className="row">
                                                <div className="col m12 s12 ">
                                                    <FieldArray
                                                        name="new_collect_feedback"
                                                        render={({ insert, remove, push }) => (
                                                            <div >
                                                                {values.new_collect_feedback.length > 0 &&
                                                                    values.new_collect_feedback.map((friend, index) => (
                                                                        <div
                                                                            className="col m12 s12 padtb"
                                                                            key={index}
                                                                        >
                                                                            <div className="col m2 s12 padtb">
                                                                                <AssignTextField
                                                                                    label="First Name"
                                                                                    elementType="add"
                                                                                    name={`new_collect_feedback.${index}.firstName`}
                                                                                    type="text"
                                                                                />
                                                                            </div>
                                                                            <div className="col m2 s12 padtb">
                                                                                <AssignTextField
                                                                                    label="Last Name"
                                                                                    elementType="add"
                                                                                    name={`new_collect_feedback.${index}.lastName`}
                                                                                    type="text"
                                                                                />
                                                                            </div>
                                                                            <div className="col m2 s12 padtb">
                                                                                <AssignTextField
                                                                                    label="E-mail"
                                                                                    elementType="add"
                                                                                    name={`new_collect_feedback.${index}.email`}
                                                                                    type="text"
                                                                                />
                                                                            </div>
                                                                            <div className="col m2 s12 padtb">
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
                                    </Form>
                                )
                            }}
                        />
                    ) : (null)}
                </div>
            </div>
            <MaxWidthDialog setConfirmDialog={setConfirmDialog} confirmDialog={confirmDialog} link={'/view_all_surveys'} />
        </div >
    )
}
