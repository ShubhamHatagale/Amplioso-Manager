import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import MaterialTable from 'material-table'
import CircularProgress from '@material-ui/core/CircularProgress';
require("dotenv").config();

export default function AssignManagers() {
    const history = useHistory();
    const id = localStorage.getItem("manager_id");
    const token = localStorage.getItem("manager_jwt");
    const [listRecord, setlistRecord] = useState([]);
    const [loading, setloading] = useState(0);
    const APIUrl = process.env.REACT_APP_Base_URL;
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [deleteconfirmDialog, setDeleteConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    useEffect(() => {
        GetallRecored();
    }, [])

    const GetallRecored = async () => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'multipart/form-data')
        myHeaders.append("Authorization", token);
        let res = await fetch(APIUrl + `/collect_feedback/manager/${id}`,
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
    if (loading === 1) {
        return <div className="loader"> <CircularProgress /></div>
    }
    const EditSurvey = (id) => {
        // history.push({
        //     pathname: '/view_all_surveys/view', 
        //     state: { detail: id, type: 'Edit' }
        // });

        history.push({
            pathname: '/EditSurvey',
            state: { detail: id, type: 'Edit' }
        });


    }
    return (
        <div className="section inner-content ">
            <div className="row">
                <div className="col s9">
                    <div className="section-title">
                        <h1>View All Surveys</h1>
                        {/* <div className="nav-wrapper inner-breadcrumb">
                            <div className="col s12 pad-l-0">
                                <a href="#!">Dashboard </a>
                                <a href="#!">Assign Managers</a>
                            </div>
                        </div> */}
                    </div>
                </div>
                {/* <div className="col s3">
                    <div className="invoice-create-btn right pr-5">
                        <button onClick={BackBtn} class="waves-effect waves-light btn-large mb-1 mr-1">Add </button>
                    </div>
                </div> */}
            </div>
            <div className="card">
                <MaterialTable
                    title=""
                    style={{ padding: "20px" }}
                    columns={[
                        { title: 'First Name', field: 'first_name' },
                        { title: 'Last Name', field: 'last_name' },
                        { title: 'Email', field: 'user_email' },
                        // { title: 'Year', field: 'feedback_year' },
                    ]}
                    data={
                        listRecord
                    }
                    actions={[
                       
                        {
                            icon: 'create',
                            tooltip: 'edit',
                            onClick: (event, listRecord) => { EditSurvey(listRecord.id) }
                        },
                    ]}
                    options={{
                        actionsColumnIndex: -1,
                        search: true
                        ,
                        rowStyle: (event, rowData) => ({
                            backgroundColor: ((rowData % 2)) ? '#fff' : '#f1f1f1',
                            fontSize: 16,
                        }),
                        headerStyle: {
                            fontSize: 17,
                            fontWeight: 'bold',
                            backgroundColor: '#fff',
                            borderBottom: "1px solid #000000",
                        },
                        searchFieldStyle: {
                            border: 'none',
                        }
                    }}
                />
            </div>
            {/* <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
            <MaxWidthDialog setConfirmDialog={setDeleteConfirmDialog} confirmDialog={deleteconfirmDialog} link={'/assignmanager'} /> */}
        </div>
    )
}
