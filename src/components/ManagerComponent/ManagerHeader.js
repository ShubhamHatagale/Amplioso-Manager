import React, { useState, useEffect } from 'react'

function ManagerHeader() {
    console.log(localStorage.getItem("manager_id"))
    const id = localStorage.getItem("companyId");
    const managerId = localStorage.getItem("manager_id");

    const token = localStorage.getItem("manager_jwt");
    const APIUrl = process.env.REACT_APP_Base_URL;
    const [manage_mastercount, set_manage_mastercount] = useState();
    const [emp_mastercount, set_emp_mastercount] = useState();
    const [no_of_emp, setno_of_emp] = useState(0);

    useEffect(() => {
        getPackEmpCount()
        get_no_man()

    })

    const getPackEmpCount = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(APIUrl + `/company/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // setlistRecord(result.data);
                // setloading(0);
                console.log(result)

                console.log(result.data[0].number_of_employee)

                // setno_of_emp(result.data[0].number_of_employee)
            })
            .catch(error => console.log('error', error));
    }


    const get_no_man = async () => {
        console.log(managerId)
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'multipart/form-data')
        myHeaders.append("Authorization", token);
        let res = await fetch(
            APIUrl + `/company/managers/id/${managerId}`,
            {
                method: "get",
                headers: myHeaders
            }
        );
        let response = await res.json();
        let result = response.data[0].count;
        console.log(response.data.length + "output");
        console.log(result);
        setno_of_emp(result)



        console.log(id)
        let res2 = await fetch(
            APIUrl + `/employeedetails/manager/${managerId}`,
            {
                method: "get",
                headers: myHeaders
            }
        );
        let res2ponse = await res2.json();
        let res2ult = res2ponse.data.length;
        console.log(res2ponse.data.length + "output");
        console.log(res2ult);

        console.log(result + "+" + res2ult);
        console.log(result == res2ult);
        set_emp_mastercount(res2ult);


        // console.log(result.length +"+"+ res2ult.lenght)



        let res3 = await fetch(
            APIUrl + `/employeedetails/company/${id}`,
            {
                method: "get",
                headers: myHeaders
            }
        );
        let res3ponse = await res3.json();
        let res3ult = res3ponse.data.length;
        console.log(res3ponse.data.length + "output");
        console.log(res3ult);

        // console.log(result + "+" + res3ult);


        // console.log(result.length +"+"+ res2ult.lenght)

        set_manage_mastercount(result);


    }

    return (
        <div className="row menu-bottom " style={{border:"0px solid black"}}>
            <div className="col" style={{position:"relative",left:"-274px"}}>Total Manager(s) Assigned : {manage_mastercount ? manage_mastercount : 0}</div>
            <div className="col right" >Total Employee(s) Assigned : {emp_mastercount ? emp_mastercount : 0}/{no_of_emp ? no_of_emp : 0}</div>
        </div>
    )
}

export default ManagerHeader
