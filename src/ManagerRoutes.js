import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory, } from "react-router-dom";
import ManagerHeader from "./components/ManagerComponent/ManagerHeader";
import ManagerSidebar from "./components/ManagerComponent/ManagerSidebar";
import ProtectedRoute from "./components/Protected";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/forgotPassword";
import ManagerDashboard from "./pages/Managers/Dashboard";
import GeneralManagerSetting from "./pages/Managers/GeneralManagerSetting";
import PasswordSetting from "./pages/Managers/PasswordSetting";
import AssignSurvey from "./pages/Managers/assignsurvey";
import ViewAllSurveys from "./pages/Managers/ViewAllSurveys";
import EditAssignSurvey from "./pages/Managers/EditLaunchServey";
import { useLocation } from "react-router-dom";
import EditSurvey from "./pages/Managers/EditSurvey";
import ManagerLeads from "./pages/Managers/ManagerLeads";
import Survey from "./pages/Managers/Survey";
import SurveyReport from "./pages/Managers/SurveyReport";

const ManagerRouting = () => {
    const history = useHistory();
    // const location = useLocation();
    // const [loggedIn, setloggedIn] = useState(true);
    // useEffect(() => {
    //     const user = JSON.parse(localStorage.getItem("manager"));
    //     if (user) {
    //         history.push("/");
    //     }
    //     else {
    //         history.push("/")
    //     }
    // }, []);
    return (
        <Switch>
            <Route exact path="/login" component={Login}>
                {/* <Route exact path="/" component={Login}> */}
            </Route>
            <Route path="/forgot-password" component={ForgotPassword}>
            </Route>
            <ProtectedRoute exact path="/">
                <ManagerSidebar data={<ManagerDashboard />}
                />
            </ProtectedRoute>
            <ProtectedRoute exact path="/general_managers_setting">
                <ManagerSidebar data={<GeneralManagerSetting />} />
            </ProtectedRoute>
            <ProtectedRoute exact path="/password_setting">
                <ManagerSidebar data={<PasswordSetting />} />
            </ProtectedRoute>
            <ProtectedRoute exact path="/assign_survey">
                <ManagerSidebar data={<AssignSurvey />}
                />
            </ProtectedRoute>
            <ProtectedRoute exact path="/view_all_surveys">
                <ManagerSidebar data={<ViewAllSurveys />}
                />
            </ProtectedRoute>
            <ProtectedRoute exact path="/view_all_surveys/view">
                <ManagerSidebar data={<EditAssignSurvey />}
                />
            </ProtectedRoute>

            <ProtectedRoute exact path="/survey">
                <ManagerSidebar data={<Survey />}
                />
            </ProtectedRoute>

            <ProtectedRoute exact path="/survey_report">
                <ManagerSidebar data={<SurveyReport />}
                />
            </ProtectedRoute>

            <ProtectedRoute exact path="/EditSurvey">
                <ManagerSidebar data={<EditSurvey />}
                />
            </ProtectedRoute>

            <ProtectedRoute exact path="/manager_leads">
                <ManagerSidebar data={<ManagerLeads />}
                />
            </ProtectedRoute>
        </Switch>
    );
};
export default ManagerRouting