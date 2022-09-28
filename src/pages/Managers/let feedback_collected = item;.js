let feedback_collected = item;
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", token);
var raw = JSON.stringify({
    first_name: feedback_collected.firstName,
    last_name: feedback_collected.lastName,
    status: 'Pending',
    recipient_role: feedback_collected.recipient_role,
    prof_img: feedback_collected.prof_img.name,
    prof_img: feedback_collected.file,
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