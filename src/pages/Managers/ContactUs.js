import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import * as Yup from "yup";
import TextField from '../../components/TextField';
import MaxWidthDialog from '../../components/AlertDialogBox';
require("dotenv").config();
var crypto = require("crypto");
export default function ContactUs() {
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', type: '' })
    const [confirmDialog1, setConfirmDialog1] = useState({ isOpen: false, title: '', subTitle: '', type: '' })
    const BaseURL = process.env.REACT_APP_Base_URL;
    const id = localStorage.getItem("manager_id")
    const initialValues = {
        oldpassword: "",
        password: "",
        confirmpassword: "",
    };
    const validate = Yup.object({
        oldpassword: Yup.string().required('required'),
        password: Yup.string().required('required'),
        confirmpassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match').required('required')
    });
    // etc appacche host 000/cns settings
    const OnSubmitForm = async (values) => {
        const checkPassword = await crypto.createHash('sha512').update(values.oldpassword).digest('hex');
        const token = localStorage.getItem("manager_jwt");
        console.log(checkPassword);
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'multipart/form-data')
        myHeaders.append("Authorization", token);
        let res = await fetch(
            BaseURL + `/company/managers/id/${id}`,
            {
                method: "get",
                headers: myHeaders
            }
        );
        let response = await res.json();
        let result = response.data;
        if (result && checkPassword) {
            let oldPassword;
            result.map((item, key) => {
                oldPassword = item.password;
            })
            console.log(oldPassword);
            if (checkPassword === oldPassword) {
                try {
                    fetch(BaseURL + `/company/managers/resetpassword/${id}`, {
                        method: "put",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": token
                        },
                        body: JSON.stringify({
                            password: values.password,
                        }),
                    })
                        .then((res) => {
                            return res.json();
                        })
                        .then((resData) => {
                            if (resData.status == 200) {
                                setConfirmDialog1({
                                    isOpen: true,
                                    title: 'Alert',
                                    subTitle: "Password Updated Successfully",
                                })
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } catch (err) {
                    console.log(err);
                }
            }
            else {
                setConfirmDialog({
                    isOpen: true,
                    title: 'Error Massage',
                    subTitle: "Wrong Old Password",
                })
            }
        }
    }
    return (
        <div>
            <div className="section inner-content">
                <div className="section-title">
                    <h1> Change Your Password</h1>
                    {/* <div className="nav-wrapper inner-breadcrumb">
                        <div className="col s12 pad-l-0">
                            <a href="#!">Dashboard </a>
                            <a href="#!"> Change Your Password</a>
                        </div>
                    </div> */}
                </div>
                <div className="pt-0 main-screen">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validate}
                        onSubmit={(values) => {
                            OnSubmitForm(values);
                        }}
                    >
                        {(formik) => (
                            <Form>
                                <div className="row">
                                    <div className="row">
                                        <TextField
                                            label="Company Name"
                                            elementType="add"
                                            name="confirmpassword"
                                            type="password" />
                                        <TextField
                                            label="Title"
                                            elementType="add"
                                            name="confirmpassword"
                                            type="password" />
                                    </div>
                                    <div className="input-field col m12 s12 pad-r center">
                                        <button
                                            class="waves-effect waves-light btn-large mb-1 mr-1"
                                            type="submit"
                                            name="action"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <MaxWidthDialog setConfirmDialog={setConfirmDialog} confirmDialog={confirmDialog} link={'/passwordsetting'} />
            <MaxWidthDialog setConfirmDialog={setConfirmDialog1} confirmDialog={confirmDialog1} link={'/'} />
        </div>
    )
}
