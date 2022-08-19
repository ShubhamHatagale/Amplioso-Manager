import React, { Component } from 'react'
import { useHistory } from 'react-router-dom';

export default function ManagerDashboard() {

    const history = useHistory()
    const user = JSON.parse(localStorage.getItem("manager"));
    if (user) {
        return (
            <div id="main">
                <div className="row">
                    <div className="col s12">
                        <div className="container">
                            <div className="section dashboard-content">
                                <div className="pt-0">
                                    <h1>Welcome to our Portal for Managers</h1>
                                    <div className="row padding-top">
                                        <div className="col s12 m6 l6 xl4">
                                            <div className="tiles">
                                                <i onClick={() => { history.push("/password_setting") }} className="material-icons">password</i>
                                                <a onClick={() => { history.push("/password_setting") }}>Password Settings</a>					</div>
                                        </div>
                                        <div className="col s12 m6 l6 xl4">
                                            <div className="tiles">
                                                <i onClick={() => { history.push("/general_managers_setting") }} className="material-icons">domain</i>
                                                <a onClick={() => { history.push("/general_managers_setting") }}>General Manager Setting</a>					</div>
                                        </div>
                                        <div className="col s12 m6 l6 xl4">
                                            <div className="tiles">
                                                <i onClick={() => { history.push("/assign_survey") }} className="material-icons">people</i>
                                                <a onClick={() => { history.push("/assign_survey") }}>Assign Surveys</a>					</div>
                                        </div>
                                        <div className="col s12 m6 l6 xl4">
                                            <div className="tiles">
                                                <i className="material-icons">manage_search </i>
                                                <a onClick={() => { history.push("/viewallusers") }}>View and Export Results</a>					</div>
                                        </div>
                                        <div className="col s12 m6 l6 xl4">
                                            <div className="tiles">
                                                <i onClick={() => { history.push("/view_all_surveys") }} className="material-icons">transform</i>
                                                <a onClick={() => { history.push("/view_all_surveys") }}>View All Surveys</a>					</div>
                                        </div>
                                        <div className="col s12 m6 l6 xl4">
                                            <div className="tiles">
                                                <i className="material-icons">add_to_queue</i>
                                                <a onClick={() => { history.push("/requestquestionarie") }}>Contact Amplioso</a>					</div>
                                        </div>
                                        {/* <div className="col s12 m6 l6 xl4">
                                            <div className="tiles">
                                                <i className="material-icons">miscellaneous_services</i>
                                                <a onClick={() => { history.push("/managehierarchy") }}>Managing Hierarchy Rights</a>					</div>
                                        </div>
                                        <div className="col s12 m6 l6 xl4">
                                            <div className="tiles">
                                                <i className="material-icons">query_stats</i>
                                                <a onClick={() => { history.push("/survey") }}>Survey</a>					</div>
                                        </div>
                                        <div className="col s12 m6 l6 xl4">
                                            <div className="tiles">
                                                <i className="material-icons">production_quantity_limits</i>
                                                <a onClick={() => { history.push("/otherchanges") }}>Other Packages/Amplioso <br />Support</a>					</div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content-overlay" />
                    </div>
                </div>
            </div>
            // </div>
        )
    }

}

