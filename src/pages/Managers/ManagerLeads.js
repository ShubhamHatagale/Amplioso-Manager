import React, { useState } from 'react'
import AssignSurveyLeads from "./assignsurveyLeads";

const ManagerLeads = () => {
    const [leader, setleader] = useState("1");
    return (
        <>
            <AssignSurveyLeads data={leader} />
        </>
    )
}

export default ManagerLeads
