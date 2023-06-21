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
import ManagerHeader from '../../components/ManagerComponent/ManagerHeader';
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
export default function AssignSurvey(props) {
    const range = (start, end) => {
        return new Array((end + 1) - start).fill().map((d, i) => i + start);
    };
    const [manage_mastercount, set_manage_mastercount] = useState();
    const [emp_mastercount, set_emp_mastercount] = useState();

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
    let [radioValue2, setradioValue2] = useState('Yes');

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
    const [no_of_emp, setno_of_emp] = useState(0);

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
        console.log(result)
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
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'multipart/form-data')
        myHeaders.append("Authorization", token);
        let res = await fetch(`${backend_url}/masters/collect_feedback/email/${defValue}`,
            {
                method: "get",
                headers: myHeaders
            }
        );
        let response = await res.json();
        console.log(response)
        const respLength = response.data.length;
        console.log(respLength)
        return respLength;
    }

    const checkFeedFreq = async (defValue, emp_id) => {
        // var myHeaders = new Headers();
        // myHeaders.append('Content-Type', 'multipart/form-data')
        // myHeaders.append("Authorization", token);

        console.log(defValue, emp_id)

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", token);
        var raw = JSON.stringify({
            feedFreq: defValue,
            employee_id: emp_id
        })
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        let res = await fetch(`${backend_url}/masters/collect_feedback/feedFreq`, requestOptions);

        let response = await res.json();
        console.log(response)
        const respLength = response.data.length;
        console.log(respLength)
        return respLength;
    }

    useEffect(() => {
        console.log(showEdit, showAdd)
        console.log("props", props)

        GetallRecored()
        getEmployyes()
        getHeadquaters()
        getFeedback()
        getYOE()
        get_no_man()

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


    const HandleEditStatus2 = (val) => {
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

    const HandleStatus1 = (val) => {
        // alert(val)
        setradioValue1(val);
    }

    const HandleStatus2 = (val) => {
        setradioValue2(val);
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
                    console.log(item.CompanyId.id)
                    const employee = await getAllFeedbackApi(item.CompanyId.feedback_frequency)
                    // const employee2 = await getAllFeedbackApi2(item.CompanyId.id)

                    // const employee = await get_no_emp()

                    setFeedbackIdName(employee)
                    // console.log(employee2)

                    console.log(employee)
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
        // get_no_emp()
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
        // var checkMailExist = await checkMail(values.collect_feedback[0].email);
        // console.log(checkMailExist);
        // if (checkMailExist == 0) {
        // let emp_count = await get_no_emp()
        // console.log(await get_no_emp())

        console.log(values)
        var checkMailExist = await checkMail(values.collect_feedback[0].email);
        // var checkFeedFreqExist = await checkFeedFreq(values.feedback_frequency,values.employee_id);


        // if (checkFeedFreqExist > 0) {
        //     setConfirmDialog({
        //         isOpen: true,
        // type:"message",
        //         title: 'Alert',
        //         subTitle: `Feedback Frequency Already Exist`,
        //     })
        //     return false
        // }


        console.log(no_of_emp + " <=" + emp_mastercount)
        console.log(no_of_emp <= emp_mastercount)

        if (no_of_emp <= emp_mastercount) {
            console.log("grather")
            setConfirmDialog({
                isOpen: true,
                type: "error",
                title: 'Alert',
                subTitle: `Employees Or Manager Count Should Not Be Gratherthan ${no_of_emp}`,
            })
            return false;
        }

        console.log("not grather")


        console.log(values);
        var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");
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


        var formdata = new FormData();
        formdata.append("first_name", values.employee_first_name)
        formdata.append("last_name", values.employee_last_name)
        formdata.append("user_email", values.employee_email)
        formdata.append("gender", values.employee_gender)
        formdata.append("status", 'pending')
        formdata.append("role", 4)
        formdata.append("company_id", companyid)
        formdata.append("manager_id", managerid)
        formdata.append("feedback_frequency", values.feedback_frequency)
        formdata.append("feedback_year", values.feedback_year)
        formdata.append("feedback_month", values.feedback_month)
        formdata.append("best_classified", radioValue)
        formdata.append("service_external_client", radioValue1)
        formdata.append("location", values.location)
        formdata.append("working_presence", values.working_presence)
        formdata.append("year_of_experience", values.year_of_experience)
        if (values.emp) {
            formdata.append("prof_img", values.emp[0].prof_img, values.emp[0].prof_img.name);
        }

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow",
        };
        fetch(backend_url + `/masters/employeedetails`, requestOptions)
            .then((response) => response.json())
            .then((resData) => {
                let count = 0;
                console.log(resData);
                console.log(resData.resultId);

                let letest_Employee_Id = resData.resultId;

                if (resData.status == 200) {
                    values.collect_feedback.map((item, key) => {
                        let feedback_collected = item;
                        var myHeadersForm = new Headers();
                        const token = localStorage.getItem("manager_jwt");
                        myHeadersForm.append("Authorization", token);
                        var formdata = new FormData();
                        // formdata.append('first_name', "shubham Hatagale");

                        formdata.append('first_name', feedback_collected.firstName)
                        formdata.append('last_name', feedback_collected.lastName)
                        formdata.append('status', 'Pending')
                        formdata.append('recipient_role', feedback_collected.recipient_role)
                        // if (feedback_collected.prof_img) {
                        //     formdata.append("prof_img", feedback_collected.prof_img, feedback_collected.prof_img.name);
                        // }
                        // formdata.append('prof_img', feedback_collected.prof_img,feedback_collected.prof_img.name)
                        // formdata.append('file_img', feedback_collected.file)
                        formdata.append('user_email', feedback_collected.email)
                        formdata.append('feedback_frequency', values.feedback_frequency)
                        formdata.append('feedback_year', values.feedback_year)

                        formdata.append('employee_id', letest_Employee_Id)
                        formdata.append('manager_id', managerid)
                        formdata.append('company_id', companyid)
                        formdata.append('role', 5)

                        var requestOptionsForm = {
                            method: "post",
                            headers: myHeadersForm,
                            body: formdata,
                            redirect: 'follow'
                        };


                        // console.log(formdata)
                        fetch(backend_url + `/masters/collect_feedback`, requestOptionsForm)
                            .then(responseForm => responseForm.json())
                            .then(resDataForm => {
                                // console.log(resDataForm)
                                if (resData.status == 200) {
                                    // setloading(0)
                                    setConfirmDialog({
                                        isOpen: true,
                                        type: "message",
                                        title: 'Alert',
                                        subTitle: "Survey Submitted Successfully",
                                    })
                                    console.log("Records Submitted");
                                }
                            })
                            .catch(error => console.log('error', error));
                    })



                }

                // if (resData.status == 200) {
                //     values.collect_feedback.map((item, key) => {
                //         let feedback_collected = item;
                //         var myHeaders = new Headers();
                //         myHeaders.append("Content-Type", "application/json");
                //         myHeaders.append("Authorization", token);
                //         var raw = JSON.stringify({
                //             first_name: feedback_collected.firstName,
                //             last_name: feedback_collected.lastName,
                //             status: 'Pending',
                //             recipient_role: feedback_collected.recipient_role,
                //             prof_img: feedback_collected.prof_img.name,
                //             prof_img: feedback_collected.file,
                //             user_email: feedback_collected.email,
                //             feedback_frequency: 1,
                //             employee_id: letest_Employee_Id,
                //             manager_id: managerid,
                //             company_id: companyid,
                //             role: 5,
                //         })
                //         var requestOptions = {
                //             method: "POST",
                //             headers: myHeaders,
                //             body: raw,
                //             redirect: "follow",
                //         };
                //         console.log(requestOptions)
                //         fetch(BaseURL + `/collect_feedback`, requestOptions)
                //             .then((response) => response.json())
                //             .then((resData) => {
                //                 console.log(resData);
                //                 setcount(prevState => prevState + 1);
                //                 console.log(resData.status)
                //                 if (resData.status == 200) {

                //                     console.log("collected Feedback" + (key + 1));
                //                     if (values.collect_feedback.length === (key + 1)) {
                //                         console.log("All feedback collected");
                //                         setConfirmDialog({
                //                             isOpen: true,
                // type:"message",
                //                             title: 'Alert',
                //                             subTitle: "Survey Submitted Successfully",
                //                         })
                //                     }
                //                 }
                //             })
                //             .catch((error) => console.log("error", error));
                //     })

                // }
            })
            .catch((error) => console.log("error", error));

    };



    const get_no_emp = async () => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'multipart/form-data')
        myHeaders.append("Authorization", token);
        let res = await fetch(
            BaseURL + `/company/managers/id/${managerid}`,
            {
                method: "get",
                headers: myHeaders
            }
        );
        let response = await res.json();
        let result = response.data[0].count;
        setno_of_emp(result)
        return result;


    }

    const get_no_man = async () => {
        // console.log(managerid)
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'multipart/form-data')
        myHeaders.append("Authorization", token);
        let res = await fetch(
            BaseURL + `/company/managers/id/${managerid}`,
            {
                method: "get",
                headers: myHeaders
            }
        );
        let response = await res.json();
        let result = response.data[0].count;
        // console.log(response.data.length + "output");
        // console.log(result);
        setno_of_emp(result)



        let res2 = await fetch(
            BaseURL + `/employeedetails/manager/${managerid}`,
            {
                method: "get",
                headers: myHeaders
            }
        );
        let res2ponse = await res2.json();
        let res2ult = res2ponse.data.length;
        // console.log(res2ponse.data.length + "output");
        // console.log(res2ult);

        // console.log(result + "+" + res2ult);
        // console.log(result == res2ult);
        set_emp_mastercount(res2ult);


        // console.log(result.length +"+"+ res2ult.lenght)



        let res3 = await fetch(
            BaseURL + `/employeedetails/company/${companyid}`,
            {
                method: "get",
                headers: myHeaders
            }
        );
        let res3ponse = await res3.json();
        let res3ult = res3ponse.data.length;
        // console.log(res3ponse.data.length + "output");
        // console.log(res3ult);

        // console.log(result + "+" + res3ult);


        // console.log(result.length +"+"+ res2ult.lenght)

        set_manage_mastercount(result);


    }
    const GetallRecored = async () => {
        // setloading(1);
        // console.log(get_no_emp())
        console.log(await get_no_emp())

        var myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(BaseURL + `/company/${companyid}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // setlistRecord(result.data);
                // setloading(0);
                console.log(result.data[0].number_of_employee)
                // setno_of_emp(result.data[0].number_of_employee)
            })
            .catch(error => console.log('error', error));
    }

    const OnSubmitEditForm = async (values) => {
        // alert("shub")
        // if (feedback_collected.prof_img) {
        //     formdata.append("prof_img", feedback_collected.prof_img, feedback_collected.prof_img.name);
        // }
        console.log(values)
        // console.log(values.emp[0].prof_img)

        if (values.emp) {
            console.log("prof_img", values.emp[0].prof_img, values.emp[0].prof_img.name);
        }
        // return false
        var checkMailExist = await checkMail(values.collect_feedback[0].email);
        var checkFeedFreqExist = await checkFeedFreq(values.feedback_frequency, exitEmployeeId);
        console.log(checkFeedFreqExist)
        if (checkFeedFreqExist > 0) {
            setConfirmDialog({
                isOpen: true,
                type: "error",
                title: 'Alert',
                subTitle: `Feedback Frequency Already Exist`,
            })
            return false
        }

        console.log(checkMailExist);
        if (checkMailExist == 0) {
            let emp_count = await get_no_emp()
            console.log(await get_no_emp())
            console.log(no_of_emp + " <=" + emp_mastercount)
            console.log(no_of_emp <= emp_mastercount)

            if (no_of_emp <= emp_mastercount) {
                console.log("grather")
                setConfirmDialog({
                    isOpen: true,
                    type: "error",
                    title: 'Alert',
                    subTitle: `Employees Or Manager Count Should Not Be Gratherthan ${no_of_emp}`,
                })
                return false;
            }

            console.log("not grather")



            setErrordisplay("")
            console.log(values);
            let counter = 0;
            var myHeaders = new Headers();
            // myHeaders.append("Content-Type", "application/json");
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

            var formdata = new FormData();
            formdata.append("first_name", values.employee_first_name)
            formdata.append("last_name", values.employee_last_name)
            formdata.append("user_email", values.employee_email)
            formdata.append("gender", values.employee_gender)
            formdata.append("status", 'pending')
            formdata.append("role", 4)
            formdata.append("company_id", companyid)
            formdata.append("manager_id", managerid)
            formdata.append("feedback_frequency", values.feedback_frequency)
            formdata.append("feedback_year", values.feedback_year)
            formdata.append("feedback_month", values.feedback_month)
            formdata.append("best_classified", radioValue)
            formdata.append("service_external_client", radioValue1)
            formdata.append("location", values.location)
            formdata.append("working_presence", values.working_presence)
            formdata.append("year_of_experience", values.year_of_experience)
            if (values.emp) {
                formdata.append("prof_img", values.emp[0].prof_img, values.emp[0].prof_img.name);
            }

            var requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: formdata,
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
                            var myHeadersForm = new Headers();
                            const token = localStorage.getItem("manager_jwt");
                            myHeadersForm.append("Authorization", token);
                            var formdata = new FormData();
                            // formdata.append('first_name', "shubham Hatagale");

                            formdata.append('first_name', feedback_collected.firstName)
                            formdata.append('last_name', feedback_collected.lastName)
                            formdata.append('status', 'Pending')
                            formdata.append('recipient_role', feedback_collected.recipient_role)
                            // if (feedback_collected.prof_img) {
                            //     formdata.append("prof_img", feedback_collected.prof_img, feedback_collected.prof_img.name);
                            // }
                            // formdata.append('prof_img', feedback_collected.prof_img,feedback_collected.prof_img.name)
                            // formdata.append('file_img', feedback_collected.file)
                            formdata.append('user_email', feedback_collected.email)
                            formdata.append('feedback_frequency', values.feedback_frequency)
                            formdata.append('feedback_year', values.feedback_year)
                            formdata.append('employee_id', exitEmployeeId)
                            formdata.append('manager_id', managerid)
                            formdata.append('company_id', companyid)
                            formdata.append('role', 5)

                            var requestOptionsForm = {
                                method: "post",
                                headers: myHeadersForm,
                                body: formdata,
                                redirect: 'follow'
                            };


                            console.log(formdata)
                            fetch(BaseURL + `/collect_feedback`, requestOptionsForm)
                                .then(responseForm => responseForm.json())
                                .then(resDataForm => {
                                    console.log(resDataForm)
                                    if (resData.status == 200) {
                                        // setloading(0)
                                        setConfirmDialog({
                                            isOpen: true,
                                            type: "message",
                                            title: 'Alert',
                                            subTitle: "Survey Submitted Successfully",
                                        })
                                        console.log("Records Submitted");
                                    }
                                })
                                .catch(error => console.log('error', error));
                        })




                        // values.collect_feedback.map((item, key) => {
                        //     let feedback_collected = item;
                        //     var myHeadersForm = new Headers();
                        //     const token = localStorage.getItem("manager_jwt");
                        //     myHeadersForm.append("Authorization", token);
                        //     var formdata = new FormData();
                        //     formdata.append('first_name', feedback_collected.firstName);
                        //     formdata.append('last_name', feedback_collected.lastName);
                        //     formdata.append('status', "Pending");
                        //     formdata.append('recipient_role', feedback_collected.recipient_role);
                        //     // if (feedback_collected.file) {
                        //     //     formdata.append("prof_img", feedback_collected.file, feedback_collected.prof_img.name);
                        //     // }
                        //     // formdata.append("prof_img", feedback_collected.prof_img.name);
                        //     formdata.append("file", feedback_collected.file);
                        //     formdata.append('user_email', feedback_collected.email);
                        //     formdata.append('employee_id', exitEmployeeId);
                        //     formdata.append('manager_id', managerid);
                        //     formdata.append('company_id', companyid);
                        //     formdata.append('role', 5);

                        //     var requestOptionsForm = {
                        //         method: 'POST',
                        //         headers: myHeadersForm,
                        //         body: formdata,
                        //         redirect: 'follow'
                        //     };


                        //     console.log(formdata)
                        //     fetch(`http://localhost:9000/masters/collect_feedback`, requestOptionsForm)
                        //         .then(responseForm => responseForm.json())
                        //         .then(resDataForm => {
                        //             console.log(resDataForm)
                        //             // if (resData.status == 200) {
                        //             //     // setloading(0)
                        //             //     setConfirmDialog({
                        //             //         isOpen: true,
                        // type:"message",
                        //             //         title: 'Alert',
                        //             //         subTitle: "Survey Submitted Successfully",
                        //             //     })
                        //             //     console.log("Records Submitted");
                        //             // }
                        //         })
                        //         .catch(error => console.log('error', error));
                        // })


                    }
                })
                .catch((error) => console.log("error", error));

        } else {
            console.log(`already exist`)
            setErrordisplay(`E-mail already exist`)

        }
    };




    const fileHandler = (event) => {

        if (event.target.files && event.target.files[0]) {
            console.log(event.target.files[0])
            console.log(event.target.name)
            // setFieldValue(event.target.name, event.target.files[0])
            // setImageurl(URL.createObjectURL(event.target.files[0]))
            // setimageUpload(event.target.files[0]);
        }
    };
    return (
        <div>
            {/* {console.log("props",props)} */}
            <ManagerHeader />
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
                                        {/* gggggg */}
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
                                {/* {props.data == "1" ? (
                                    <div className="row">
                                        <div className="col m2 s12 padtb">
                                        </div>
                                        <div className="col m4 s12 padtb">
                                            <h6 >Does this person Leader ?</h6>
                                        </div>
                                        <p className="mb-1 redio_btn">
                                            <label>
                                                <input name="yes" type="radio" value="yes"
                                                    checked={true}
                                                />
                                                <span htmlFor={`props.name`}>{`yes`}</span>
                                            </label>
                                            <label>
                                                <input name="yes" type="radio" value="yes"
                                                    checked={true}
                                                />
                                                <span htmlFor={`props.name`}>{`No`}</span>
                                            </label>

                                        </p>

                                    </div>
                                ) : null} */}
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
                                                        <div className="col m2 s12 padtb">
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
                                                        <div className="col m2 s12 padtb">
                                                            <h6 >Location of individual</h6>
                                                        </div>
                                                        <div className="col m2 s12 padtb">
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
                                                        <div className="col m2 s6 padtb">
                                                            <h6 >Working Presence</h6>
                                                        </div>
                                                        <div className="col m2 s6 padtb">
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
                                                        <div className="col m2 s12 padtb">
                                                            <h6 >Approximate years of experience</h6>
                                                        </div>
                                                        <div className="col m2 s12 padtb">
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
                                                        <div className="col m2 s12 padtb">
                                                        </div>
                                                        <div className="col m2 s6 padtb">
                                                            <h6 >Select Image</h6>
                                                        </div>
                                                        <div className="col m3 s6 padtb">

                                                            <div className="file-field input-field">
                                                                <div className="btn float-right">
                                                                    <span>File</span>
                                                                    <input type="file"
                                                                        // name={`collect_feedback.${index}.prof_img`}
                                                                        onChange={value => {
                                                                            setFieldValue(`emp.${0}.prof_img`, (value.target.files && value.target.files[0] ? value.target.files[0] : ""))
                                                                            setFieldValue(`emp.${0}.img_url`, (value.target.files && value.target.files[0] ? URL.createObjectURL(value.target.files[0]) : ""))
                                                                        }
                                                                        }

                                                                    />
                                                                </div>
                                                                <div className="file-path-wrapper">
                                                                    <input className="file-path validate" type="text" defaultValue="Profile" />
                                                                    <img src={values.emp ? values.emp[0].img_url : ""} className="comapnylogoimg" style={{ marginLeft: "18px" }} width="120" height="85" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="row">
                                                        <div className="col m2 s6 padtb">
                                                        </div>
                                                        <div className="col m2 s6 padtb">
                                                            <h6 >Select Image</h6>
                                                        </div>
                                                        <div className="col m2 s6 padtb">

                                                            <div className="file-field input-field">
                                                                <div className="btn float-righ">
                                                                    <span>File</span>
                                                                    <input type="file"
                                                                        // name={`collect_feedback.${index}.prof_img`}
                                                                        onChange={value => {
                                                                            setFieldValue(`emp.${0}.prof_img`, (value.target.files && value.target.files[0] ? value.target.files[0] : ""))
                                                                            setFieldValue(`emp.${0}.img_url`, (value.target.files && value.target.files[0] ? URL.createObjectURL(value.target.files[0]) : ""))
                                                                        }
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="file-path-wrapper">
                                                                    <input className="file-path validate" type="text" defaultValue="Profile" />
                                                                    <img src={values.emp ? values.emp[0].img_url : ""} className="comapnylogoimg" style={{ marginLeft: "18px" }} width="120" height="85" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}

                                                    <div className="row">
                                                        <div className="col m12 s12 padtb">
                                                            <div className="col m2 s12 padtb">
                                                            </div>
                                                            <div className="col m2 s12 padtb">
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


                                                                                    {/* <div className="col m2 s12 padtb">
                                                                                        <div className="file-field input-field">
                                                                                            <div className="btn float-right">
                                                                                                <span>File</span>
                                                                                                <input type="file"
                                                                                                    name={`collect_feedback.${index}.prof_img`}
                                                                                                    onChange={value => {
                                                                                                        setFieldValue(`collect_feedback.${index}.prof_img`, (value.target.files && value.target.files[0] ? value.target.files[0] : ""))
                                                                                                        setFieldValue(`collect_feedback.${index}.img_url`, (value.target.files && value.target.files[0] ? URL.createObjectURL(value.target.files[0]) : ""))
                                                                                                    }
                                                                                                    }
                                                                                                />
                                                                                            </div>
                                                                                            <div className="file-path-wrapper">
                                                                                                <input className="file-path validate" type="text" defaultValue="Profile" />
                                                                                            </div>
                                                                                        </div>
                                                                                        <img src={values.collect_feedback[index].img_url ? values.collect_feedback[index].img_url : ""} className="comapnylogoimg" style={{ marginLeft: "18px" }} width="120" height="85" />
                                                                                    </div> */}


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
                                                                                        <div className="col m1 s12 padtb">
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
                                                                disable={true}
                                                            />
                                                            {errors.feedback_frequency ? <div className='error'>{errors.feedback_frequency}</div> : null}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        {console.log(selectedUser)}
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
                                                        <div className="col m2 s12 padtb">
                                                        </div>
                                                        <div className="col m4 s6 padtb">
                                                            <h6 >Select Image</h6>
                                                        </div>
                                                        <div className="col m4 s6 padtb">

                                                            <div className="file-field input-field">
                                                                <div className="btn float-right">
                                                                    <span>File</span>
                                                                    <input type="file"
                                                                        // name={`collect_feedback.${index}.prof_img`}
                                                                        onChange={value => {
                                                                            setFieldValue(`emp.${0}.prof_img`, (value.target.files && value.target.files[0] ? value.target.files[0] : ""))
                                                                            setFieldValue(`emp.${0}.img_url`, (value.target.files && value.target.files[0] ? URL.createObjectURL(value.target.files[0]) : ""))
                                                                        }
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="file-path-wrapper">
                                                                    <input className="file-path validate" type="text" defaultValue="Profile" />
                                                                    <img src={values.emp ? values.emp[0].img_url : ""} className="comapnylogoimg" style={{ marginLeft: "18px" }} width="120" height="85" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col m12 s12 padtb">
                                                            <div className="col m2 s12 padtb">
                                                            </div>


                                                            {values.collect_feedback && props.data != "1" ? (
                                                                <>
                                                                    <div className="col m4 s12 padtb">
                                                                        <h6 >Collect feedback from</h6>
                                                                        {/* <div>{JSON.stringify(selectedUser)}</div> */}
                                                                        {/* {values.collect_feedback ? (<div>{JSON.stringify(values.collect_feedback.length)}</div>) : (null)} */}
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
                                                                                            {/* <div className="col m1 s12 padtb">
                                                                                            </div> */}
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
                                                                                                <span >{Errordisplay}</span>
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
                                                                                            {/* <div className="col m2 s12 padtb">
                                                                                                <div className="file-field input-field">
                                                                                                    <div className="btn float-right">
                                                                                                        <span>File</span>
                                                                                                        <input type="file"
                                                                                                            name={`collect_feedback.${index}.prof_img`}
                                                                                                            onChange={value => {
                                                                                                                setFieldValue(`collect_feedback.${index}.prof_img`, (value.target.files && value.target.files[0] ? value.target.files[0] : ""))
                                                                                                                setFieldValue(`collect_feedback.${index}.img_url`, (value.target.files && value.target.files[0] ? URL.createObjectURL(value.target.files[0]) : ""))
                                                                                                            }
                                                                                                            }
                                                                                                        />
                                                                                                    </div>
                                                                                                    <div className="file-path-wrapper">
                                                                                                        <input className="file-path validate" type="text" defaultValue="Profile" />
                                                                                                        <img src={values.collect_feedback[index].img_url ? values.collect_feedback[index].img_url : ""} className="comapnylogoimg" style={{ marginLeft: "18px" }} width="120" height="85" />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div> */}

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
                                                                </>
                                                            ) : (<>
                                                                <br />
                                                                <div className="row">
                                                                    <div className="col m2 s12 padtb">
                                                                    </div>
                                                                    <div className="col m4 s12 padtb">
                                                                        <h6 >Does this person Leader ?</h6>
                                                                    </div>
                                                                    <div className="col m4 s12 redio_section">
                                                                        <RadioField label="Yes" value="Yes" name="client" HandleStatus={HandleStatus1} isSelectedCheck={radioValue1 == "Yes"} />
                                                                        <RadioField label="No" value="No" name="client" HandleStatus={HandleStatus1} isSelectedCheck={radioValue1 == "No"} />
                                                                    </div>
                                                                </div>



                                                            </>)}
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
            <MaxWidthDialog
                setConfirmDialog={setConfirmDialog}
                confirmDialog={confirmDialog}
                link={'/'}
            />
        </div >
    )
}
