import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import * as Yup from "yup";
import PasswordTextField from '../../components/passwordTextfield';
import MaxWidthDialog from '../../components/AlertDialogBox';
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { IconButton } from '@material-ui/core';
import Input from "@material-ui/core/Input";

require("dotenv").config();
var crypto = require("crypto");
export default function PasswordSetting() {
    const BaseURL = process.env.REACT_APP_Base_URL;
    const id = localStorage.getItem("manager_id")
    // const initialValues = {
    //     oldpassword: "",
    //     password: "",
    //     confirmpassword: "",
    // };

    const [values, setValues] = React.useState({
        oldpassword: "",
        show_old_password: false,

        new_password: "",
        show_new_password: false,

        confirmpassword: "",
        show_confirm_password: false,

    });

   
    // etc appacche host 000/cns settings

    let [oldpassword, setoldpassword] = useState('')
    const [showPass, setshowPass] = useState(false)
    const [showConfirmPass, setshowConfirmPass] = useState(false)

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', type: '' })
    const [confirmDialog1, setConfirmDialog1] = useState({ isOpen: false, title: '', subTitle: '', type: '' })
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

    const OnSubmitForm = async (values) => {
        console.log(values)
        // return false
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
        console.log(result)

        if (result && checkPassword) {
            let oldPassword;
            result.map((item, key) => {
                oldPassword = item.password;
            })
            console.log(oldPassword);
            // console.log(values.password)

            if (checkPassword === oldPassword) {
                // console.log(values.password)
                console.log(checkPassword)
                console.log(oldPassword)
                // return false
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



    const handleClickshow_old_password = () => {
        setValues({ ...values, show_old_password: !values.show_old_password });
    };

    const handleMouseDownoldpassword = (event) => {
        event.preventDefault();
    };

    const handleoldpasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };


    // Functions For New Password
    const handleClickshow_new_password = () => {
        setValues({ ...values, show_new_password: !values.show_new_password });
    };

    const handleMouseDownnew_password = (event) => {
        event.preventDefault();
    };

    const handlenew_passwordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };


    // Functions For Confirm Password
    const handleClickshow_confirm_password = () => {
        setValues({ ...values, show_confirm_password: !values.show_confirm_password });
    };

    const handleMouseDownshow_confirm_password = (event) => {
        event.preventDefault();
    };

    const handleconfirm_passwordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

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
                                    {/* <input type="checkbox" >Show Password</input> */}

                                    <div className="password-settings">
                                        <PasswordTextField
                                            label="Old Password"
                                            elementType="add"
                                            name="oldpassword"
                                            type="text"
                                        />
                                        <PasswordTextField
                                            label="New Password"
                                            elementType="add"
                                            name="password"
                                            type={showPass ? "text" : "password"}
                                        />
                                        {/* <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" /> */}

                                        {/* <div ><span style={{ position: "relative", left: "500px", top: "-56px", fontSize: "16px", textTransform: "capitalize", textDecoration: "underline", cursor: "pointer" }} onClick={() => setshowPass(!showPass)}> show passsword</span></div> */}
                                        {/* <div><Visibility style={{ position: "relative", left: "500px", top: "-56px", fontSize: "16px", textTransform: "capitalize", textDecoration: "underline", cursor: "pointer" }} onClick={() => setshowPass(!showPass)} /></div> */}
                                        {/* <div>{showPass ? <Visibility style={{ position: "relative", left: "500px", top: "-56px", fontSize: "16px", textTransform: "capitalize", textDecoration: "underline", cursor: "pointer" }} onClick={() => setshowPass(!showPass)} /> : <VisibilityOff style={{ position: "relative", left: "500px", top: "-56px", fontSize: "16px", textTransform: "capitalize", textDecoration: "underline", cursor: "pointer" }} onClick={() => setshowPass(!showPass)} />}</div> */}

                                        <div>
                                            <PasswordTextField
                                                label="Confirm Password"
                                                elementType="add"
                                                name="confirmpassword"
                                                type={showConfirmPass ? "text" : "password"}
                                            />
                                            {/* <div ><span style={{ position: "relative", left: "500px", top: "-56px", fontSize: "16px", textTransform: "capitalize", textDecoration: "underline", cursor: "pointer" }} onClick={() => setshowConfirmPass(!showConfirmPass)}>show passsword</span></div> */}
                                            {/* <div>{showConfirmPass ? <Visibility style={{ position: "relative", left: "500px", top: "-56px", fontSize: "16px", textTransform: "capitalize", textDecoration: "underline", cursor: "pointer" }} onClick={() => setshowConfirmPass(!showConfirmPass)} /> : <VisibilityOff style={{ position: "relative", left: "500px", top: "-56px", fontSize: "16px", textTransform: "capitalize", textDecoration: "underline", cursor: "pointer" }} onClick={() => setshowConfirmPass(!showConfirmPass)} />}</div> */}

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
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <MaxWidthDialog setConfirmDialog={setConfirmDialog} confirmDialog={confirmDialog} link={'/password_setting'} />
            <MaxWidthDialog setConfirmDialog={setConfirmDialog1} confirmDialog={confirmDialog1} link={'/'} />
        </div>
    )
}






