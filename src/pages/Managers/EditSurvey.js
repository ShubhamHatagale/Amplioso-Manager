import { FormControlLabel, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import { useHistory, useLocation, useParams } from "react-router-dom";
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


export default function EditSurvey() {
    const location = useLocation();
    const range = (start, end) => {
        return new Array((end + 1) - start).fill().map((d, i) => i + start);
    };
    const years = range(1800, getYear(new Date()));
    const [count, setcount] = useState(0);
    const BaseURL = process.env.REACT_APP_Base_URL;
    // const Empid = location.state.detail;
    const managerid = localStorage.getItem("manager_id");
    const companyid = localStorage.getItem("companyId");
    const token = localStorage.getItem("manager_jwt");
    const APIUrl = process.env.REACT_APP_Base_URL;
    const [listRecord, setlistRecord] = useState([]);

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', type: '' })

    const [ext_period, setext_period] = useState()

    const ExtendedDays = [
        { label: 'Two Weeks', value: 1 },
        { label: 'Month', value: 2 },
        { label: 'Three Months', value: 3 },
        { label: 'Six Months', value: 4 },
    ]

    const GetallRecored = async () => {
        // alert(location.state.detail)
        console.log("hallo")
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'multipart/form-data')
        myHeaders.append("Authorization", token);
        let res = await fetch(APIUrl + `/collect_feedback/${location.state.detail}`,
            {
                method: "get",
                headers: myHeaders
            }
        );
        let response = await res.json();
        let result = response.data;
        console.log(result);
        setlistRecord(result);
    }


    useEffect(() => {
        GetallRecored()
        // alert(location.state.detail)
    }, [])


    const handleSubmit = () => {
        console.log(ext_period)
        if(!ext_period){
            return false
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", token);
        var raw = JSON.stringify({
            period_end: ext_period,
        })
        var requestOptions = {
            method: 'put',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch(BaseURL + `/collect_feedback/update/end_date/${location.state.detail}`, requestOptions)
            .then(response => response.json())
            .then(resData => {
                console.log(resData);
                if (resData.status === 200) {
                    setConfirmDialog({
                        isOpen: true,
                        title: 'Alert',
                        subTitle: "Extended Feedback Validity Successfully",
                    })
                    console.log("Records Submitted");
                }
            })
            .catch(error => console.log('error', error));


    }

    return (

        <div>
            {listRecord.length > 0 ? (
                <div className="section inner-content">
                    <div className="section-title">
                        <h1>View Launch Survey</h1>
                    </div>
                    <div className="pt-0 main-screen">
                        <div>
                            {/* <h1>Anywhere in your app!</h1> */}
                            <div className="row">

                                <div className="col m2 s12 padtb">
                                    <label>First Name</label>
                                    <input type='text'
                                        className='col-2'
                                        // onChange={(e)=>setext_period(...firstname,e.target.value)}
                                        value={listRecord[0].first_name}
                                        disabled
                                    />
                                </div>
                                <div className="col m2 s12 padtb">
                                    <label>Last Name</label>

                                    <input type='text'
                                        className='col-2'

                                        // onChange={(e)=>setext_period(...firstname,e.target.value)}
                                        value={listRecord[0].last_name}
                                        disabled
                                    />
                                </div>

                                <div className="col m2 s12 padtb">
                                    <label>Email</label>

                                    <input type='text'
                                        className='col-2'

                                        // onChange={(e)=>setext_period(...firstname,e.target.value)}
                                        value={listRecord[0].user_email}
                                        disabled
                                    />
                                </div>

                                <div className="col m2 s12 padtb">
                                    <label>Valid Till</label>

                                    <input type='text'
                                        className='col-2'

                                        // onChange={(e)=>setext_period(...firstname,e.target.value)}
                                        value={listRecord[0].period_end}
                                        disabled
                                    />
                                </div>


                                <div className="col m3 s12 padtb">
                                    <label>Extend Feedback Validity </label>

                                    <CustomEditSelect
                                        search={false}
                                        // disable={true}
                                        // defValue={friend.recipient_role}
                                        onChange={value => setext_period(value)}
                                        // value={`values.collect_feedback.${index}.recipient_role`}
                                        options={ExtendedDays}
                                        Field={`recipient_role`}
                                        // Fieldname={`collect_feedback.${index}.recipient_role`}
                                        className='select-dropdown dropdown-trigger'
                                    />
                                </div>

                                {/* <div class="col m8 s8 pad-r center"> */}
                                <div class="col m8 s8 pad-r ">

                                    <button
                                        class="waves-effect waves-light btn-large mb-1 mr-1"
                                        type="submit"
                                        name="action"
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </button>
                                </div>



                            </div>



                        </div>
                    </div>
                </div>
            ) : null}
            <MaxWidthDialog setConfirmDialog={setConfirmDialog} confirmDialog={confirmDialog} link={'/view_all_surveys'} />


        </div >
    )
}
