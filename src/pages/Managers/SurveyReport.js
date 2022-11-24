import { FormControlLabel, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import { Form, Formik } from 'formik';
import getYear from "date-fns/getYear";
import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import M from "materialize-css";
import CustomSelect from "../../components/SelectEdit";
import MaxWidthDialog from '../../components/AlertDialogBox';
import { useHistory, useLocation } from 'react-router-dom';

require("dotenv").config();

export default function Survey() {
  const BaseURL = process.env.REACT_APP_Base_URL;
  const backend_url = process.env.REACT_APP_Base_URL_Backend;

  const range = (start, end) => {
    return new Array((end + 1) - start).fill().map((d, i) => i + start);
  };

  const feedbackData = useLocation().state;

  const token = localStorage.getItem("manager_jwt");
  const id = localStorage.getItem("manager_id");
  const history = useHistory()
  const [employeeList, setemployeeList] = useState('');
  const [feed_freqList, setfeed_freqList] = useState('');
  const [DisplayDiv, setDisplayDiv] = useState(false);
  const [pdfShowDes, setpdfShowDes] = useState(0);



  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const currDateForm = monthNames[new Date().getMonth()].substring(0, 3) + "-" + monthNames[new Date().getMonth() + 1].substring(0, 3) + " " + new Date().getFullYear();



  const exportPDFWithMethod = () => {
    setpdfShowDes(1);
    setTimeout(() => {
      // alert(pdfShowDes);
      if (pdfExportComponent.current) {
        pdfExportComponent.current.save();

        setTimeout(() => {
          setpdfShowDes(0);
        }, 2000)
      }
    }, 2000)

  };
  const pdfExportComponent = React.useRef(null);

  const [impVal2Devided1, set_impVal2Devided1] = useState()
  const [impVal2Devided2, set_impVal2Devided2] = useState()

  const [survey_count, set_survey_count] = useState()
  const [managers_length, set_managers_length] = useState()
  const [company_length, set_company_length] = useState()
  const [inputListFinal, setInputListFinal] = useState([])
  // const [feedbackData, setfeedbackData] = useState()
  const [impVal, setimpVal] = useState(0)
  const [impVal2, setimpVal2] = useState(0)
  const [impVal3, setimpVal3] = useState(0)
  const [impVal4, setimpVal4] = useState(0)
  const [impVal5, setimpVal5] = useState(0)
  const [impVal6, setimpVal6] = useState(0)
  const [impVal7, setimpVal7] = useState(0)
  const [impVal8, setimpVal8] = useState(0)
  const [impVal9, setimpVal9] = useState(0)

  const [Val, setVal] = useState("")
  const [Val2, setVal2] = useState("")
  const [Val3, setVal3] = useState("")
  const [Val4, setVal4] = useState("")
  const [Val5, setVal5] = useState("")


  const [questionId, setquestionId] = useState("")
  const [OptionData, setOptionData] = useState([])
  const [OptionDataCol1, setOptionDataCol1] = useState([])
  const [OptionDataCol2, setOptionDataCol2] = useState([])
  const [OptionDataCol3, setOptionDataCol3] = useState([])
  const [OptionDataCol5, setOptionDataCol5] = useState([])
  const [OptionDataCol5_2, setOptionDataCol5_2] = useState([])
  const [OptionDataCol5_3, setOptionDataCol5_3] = useState([])
  const [RecordeData, setRecordeData] = useState([])



  const [ReportData, setReportData] = useState({})
  const [step_1, setstep_1] = useState()
  const [step_2, setstep_2] = useState()
  const [step_3, setstep_3] = useState()
  const [step_4, setstep_4] = useState()
  const [cal, setcal] = useState("")
  const [list1, setlist1] = useState([])
  const [SurveyLength, setSurveyLength] = useState()
  const [question, setquestion] = useState([]);

  const [data, setData] = useState({
    // inputVal: 0,
    last_name: "",
    email: "",
    password: "",
    que1: "",
  });


  const percentage = {
    percentage_1: parseInt(impVal * 10) + impVal * 10 + 20 / impVal * 10,
    percentage_2: parseInt(impVal * 10),
    percentage_3: 70,
    percentage_4: 90,
  }

  const percentage2 = {
    percentage_1: impVal * 10,
    percentage_2: parseInt(impVal * 10) + impVal * 10 + 20 / impVal * 10,
    percentage_3: 50,
    percentage_4: 150,
  }

  const val1 = "abc";

  const data_g = [
    ["Task", "Hours per Day"],
    ["Work", parseInt(impVal * 10) + parseInt(impVal) * 10 + 20 / parseInt(impVal) * 10],
    ["Eat", parseInt(impVal * 10)],
    ["Commute", 6],
    ["Sleep", 7],
  ];

  const options = {
    // title: "My Daily Activities",
    legend: "none",
    // legend: "none",
    // pieSliceText: "label",
    title: "Swiss Language Use (100 degree rotation)",
    // pieStartAngle: 100,
    slices: {
      0: { color: "rgb(214,225,185)" },
      1: { color: "rgb(53,98,136)" },
      2: { color: "rgb(55,55,94)" },
      3: { color: "rgb(236,101,94)" },

    },
  };


  const colorOptions = {
    slices: {
      0: { color: "rgb(168,26,12)" },
      1: { color: "rgb(55,55,94)" },
      2: { color: "rgb(53,98,136)" },
      3: { color: "rgb(170,207,221)" },
    },
  }


  const options_2 = {
    // title: "My Daily Activities",
    legend: "none",
    // legend: "none",
    // pieSliceText: "label",
    title: "Shubham knows it",
    // pieStartAngle: 100,
    slices: {
      0: { color: "rgb(214,225,185)" },
      1: { color: "rgb(53,98,136)" },
      2: { color: "rgb(55,55,94)" },
      3: { color: "rgb(236,101,94)" },

    },
  };



  const checkUserHosting = async (hostEmail, callback) => {
    let managersData = await fetch(`${BaseURL}/company/managers/${feedbackData.company_id}`)
    let companyData = await fetch(`${BaseURL}/company`)


    //use string literals
    let managersDataJson = await managersData.json();
    let companyDataJson = await companyData.json();

    return [managersDataJson, companyDataJson];
  }


  const ManagersLength = async () => {
    var myHeaders4 = new Headers();
    var requestOptions4 = {
      method: 'GET',
      headers: myHeaders4,
      redirect: 'follow'
    };


    fetch(`${BaseURL}/company/managers/${feedbackData.company_id}`, requestOptions4)
      .then(response => response.json())
      .then(result4 => {
        // console.log(result4,"res4")

        if (result4.status == 200) {
          // setlistRecord(result4.data);
          // console.log(result4 + "hhhh")
          // console.log(result4.data, "hhs")
          set_managers_length(result4.data.length)


          fetch(`${BaseURL}/company`, requestOptions4)
            .then(response => response.json())
            .then(result5 => {
              // setlistRecord(result5.data);
              if (result5.status == 200) {
                // console.log(result5.data, "company lenght")
                set_company_length(result5.data.length)


              }
            })
            .catch(error => console.log('error', error));

        }

      })
      .catch(error => console.log('error', error));


  }

  const impValFn = (val, valmed, intoVal) => {
    return parseFloat(val <= 1 ? valmed * intoVal : val * intoVal)
  }

  const GetAllRecords = async () => {
    // var question_id = q_id;
    var myHeaders = new Headers();
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };


    fetch(`${BaseURL}/collect_feedback/${feedbackData.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status == 200) {

          // console.log(result.data)
          // let aa = JSON.parse(result.data[0])
          console.log(result.data[0])
          // setfeedbackData(result.data)

          var myHeaders2 = new Headers();
          var requestOptions2 = {
            method: 'GET',
            headers: myHeaders2,
            redirect: 'follow'
          };

          fetch(`${BaseURL}/collect_feedback/email/${result.data[0].user_email}`, requestOptions2)
            .then(response => response.json())
            .then(result1 => {
              // setlistRecord(result1.data);
              if (result1.status == 200) {
                // console.log(result1)
                // console.log(result.data[0])
                // console.log(result1.data.length, "hh")
                set_survey_count(result1.data.length)



                fetch(`${BaseURL}/question/q_type/3`, requestOptions)
                  .then(response => response.json())
                  .then(result2 => {
                    // setlistRecord(result2.data);
                    if (result2.status == 200) {
                      // console.log(result2.data, "allQuestionsByType")

                      // console.log(result2.data[0], "hh")
                      let qID = result2.data[0].id;
                      setquestionId(qID);
                      // console.log(result2.data[0].id)
                      // console.log(result2.data[0].id)
                      setquestion(result2.data[0].question);
                      // getOptions(result.data[0].id);

                      var myHeaders = new Headers();
                      myHeaders.append("Content-Type", "application/json");
                      var raw1 = JSON.stringify({
                        surveyor_id: 5,
                        question_id: result2.data[0].id,
                      });
                      var requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw1,
                        redirect: "follow",
                      };

                      fetch(`${BaseURL}/survey_question_option_mapped_ans`, requestOptions)
                        .then(response3 => response3.json())
                        .then(result3 => {
                          // setlistRecord(result3.data);

                          // console.log(questionId, "jj")
                          if (result3.data) {
                            // console.log(result3.data.id)
                            // console.log(result3.data.answer)

                            // setOptData(result3.data.id);
                            // setOptionVal(result3.data.answer)
                            console.log("result3" + JSON.stringify(result3))
                            let step = 1
                            setVal(result3)
                            setimpVal(result3.data)


                          }

                        })

                      var myHeaders = new Headers();
                      myHeaders.append("Content-Type", "application/json");
                      var raw1 = JSON.stringify({
                        surveyor_id: 5,
                        question_id: result2.data[1].id,
                      });
                      var requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw1,
                        redirect: "follow",
                      };

                      fetch(`${BaseURL}/survey_question_option_mapped_ans`, requestOptions)
                        .then(response3 => response3.json())
                        .then(result3 => {
                          // setlistRecord(result3.data);
                          // console.log(result3)
                          // console.log(questionId, "jj")
                          if (result3.data) {
                            let halfwayPoint = result3.data.length / 2;
                            let Devided1 = result3.data.splice(0, halfwayPoint)
                            let Devided2 = result3.data.splice(0, halfwayPoint)
                            set_impVal2Devided1(Devided1)
                            set_impVal2Devided2(Devided2)

                          }

                        })

                      fetch(`${BaseURL}/survey_question_option_mapped_ans`, requestOptions)
                        .then(response3 => response3.json())
                        .then(result3_1 => {
                          // setlistRecord(result3_1.data);

                          // console.log(questionId, "jj")
                          if (result3_1.data) {
                            // console.log(result3_1.data)
                            setVal2(result3_1)
                            setimpVal2(result3_1.data)
                            console.log(result3_1.data)
                            console.log(result3_1)

                            let step = 2;
                            let myValues = result3_1.data;

                          }

                        })



                      var myHeaders = new Headers();
                      myHeaders.append("Content-Type", "application/json");
                      var raw1 = JSON.stringify({
                        surveyor_id: 5,
                        question_id: result2.data[2].id,
                      });
                      var requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw1,
                        redirect: "follow",
                      };

                      fetch(`${BaseURL}/survey_question_option_mapped_ans`, requestOptions)
                        .then(response3 => response3.json())
                        .then(result3 => {
                          // setlistRecord(result3.data);
                          // console.log(questionId, "jj")
                          if (result3.status == 200) {
                            console.log(result3)

                            // console.log(result3.data)
                            // console.log(result3.data.answer)

                            // setOptData(result3.data.ids);
                            // setOptionVal(result3.data.answer)
                            setimpVal3(result3.data)
                            setVal3(result3)

                            console.log(result3)
                            // console.log(impVal2)
                            // console.log(impVal2[0])

                          }

                        })



                      var myHeaders = new Headers();
                      myHeaders.append("Content-Type", "application/json");
                      var raw1 = JSON.stringify({
                        surveyor_id: 5,
                        question_id: result2.data[3].id,
                      });
                      var requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw1,
                        redirect: "follow",
                      };

                      fetch(`${BaseURL}/survey_question_option_mapped_ans`, requestOptions)
                        .then(response3 => response3.json())
                        .then(result3 => {
                          // setlistRecord(result3.data);

                          // console.log(questionId, "jj")
                          if (result3.status == 200) {
                            // console.log(result3.data)
                            // console.log(result3.data.answer)

                            // setOptData(result3.data.ids);
                            // setOptionVal(result3.data.answer)
                            setVal4(result3)
                            setimpVal4(result3.data)


                          }

                        })


                      var myHeaders = new Headers();
                      myHeaders.append("Content-Type", "application/json");
                      var raw1 = JSON.stringify({
                        surveyor_id: 5,
                        question_id: result2.data[4].id,
                      });
                      var requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw1,
                        redirect: "follow",
                      };

                      fetch(`${BaseURL}/survey_question_option_mapped_ans`, requestOptions)
                        .then(response3 => response3.json())
                        .then(result3 => {
                          // setlistRecord(result3.data);

                          // console.log(questionId, "jj")
                          if (result3.data) {
                            // console.log(result3.data)
                            // console.log(result3.data.answer)

                            // setOptData(result3.data.ids);
                            // setOptionVal(result3.data.answer)
                            setimpVal5(result3.data)


                          }

                        })




                      var myHeaders = new Headers();
                      myHeaders.append("Content-Type", "application/json");
                      var raw1 = JSON.stringify({
                        surveyor_id: 5,
                        question_id: result2.data[6].id,
                      });
                      var requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw1,
                        redirect: "follow",
                      };

                      fetch(`${BaseURL}/survey_question_option_mapped_ans`, requestOptions)
                        .then(response3 => response3.json())
                        .then(result4 => {
                          // setlistRecord(result4.data);

                          // console.log(questionId, "jj")
                          if (result4.data) {
                            // console.log(result4.data)
                            // console.log(result4.data.answer)

                            // setOptData(result4.data.ids);
                            // setOptionVal(result4.data.answer)
                            setimpVal7(result4.data)


                          }

                        })

                      var myHeaders = new Headers();
                      myHeaders.append("Content-Type", "application/json");
                      var raw1 = JSON.stringify({
                        surveyor_id: 5,
                        question_id: result2.data[7].id,
                      });
                      var requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw1,
                        redirect: "follow",
                      };

                      fetch(`${BaseURL}/survey_answers_same`, requestOptions)
                        .then(response3 => response3.json())
                        .then(result5 => {
                          // setlistRecord(result5.data);
                          // console.log(result5.data + "ccc")

                          // console.log(questionId, "jj")
                          if (result5.data) {
                            // console.log(result5.data.answer + "ccc")
                            // console.log(result5.data.answer)

                            // setOptData(result5.data.ids);
                            // setOptionVal(result5.data.answer)
                            setimpVal8(result5.data.answer)


                          }

                        })



                      var myHeaders = new Headers();
                      myHeaders.append("Content-Type", "application/json");
                      var raw1 = JSON.stringify({
                        surveyor_id: 5,
                        question_id: result2.data[5].id,
                      });
                      var requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw1,
                        redirect: "follow",
                      };

                      fetch(`${BaseURL}/survey_question_option_mapped_ans`, requestOptions)
                        .then(response3 => response3.json())
                        .then(result3 => {
                          // setlistRecord(result3.data);

                          // console.log(questionId, "jj")
                          if (result3.data) {
                            // console.log(result3.data)
                            // console.log(result3.data.answer)

                            // setOptData(result3.data.ids);
                            // setOptionVal(result3.data.answer)
                            setimpVal6(result3.data)


                          }

                        })


                      var myHeaders4 = new Headers();
                      var requestOptions4 = {
                        method: 'GET',
                        headers: myHeaders4,
                        redirect: 'follow'
                      };

                      // console.log(result.data[0].company_id)

                      fetch(`${BaseURL}/company/managers/${result.data[0].company_id}`, requestOptions4)
                        .then(response => response.json())
                        .then(result4 => {
                          // console.log(result4,"res4")

                          if (result4.status == 200) {
                            // setlistRecord(result4.data);
                            // console.log(result4)
                            // console.log(result4.data, "hhs")
                            // set_managers_length(result4.data.length)


                            fetch(`${BaseURL}/company`, requestOptions4)
                              .then(response => response.json())
                              .then(result5 => {
                                // setlistRecord(result5.data);
                                if (result5.status == 200) {
                                  // console.log(result5.data, "company lenght")
                                  set_company_length(result5.data.length)

                                  // console.log(result, "eer")
                                  // console.log(result1)
                                  // console.log(result2)
                                  // console.log(result4)
                                  // console.log(result5)
                                  // exportPDFWithMethod();

                                }
                              })
                              .catch(error => console.log('error', error));

                          }

                        })
                        .catch(error => console.log('error', error));



                    }

                  })
                  .catch(error => console.log('error', error));




              }

            })
            .catch(error => console.log('error', error));
        }
      })
  }



  useEffect(() => {
    ManagersLength();

    console.log(colorOptions)
    GetSurveyFeedRec()
    GetAllRecords().then(() => {
      setTimeout(() => {
        // exportPDFWithMethod()
      }, 2000);
    })

  }, []);




  const surveyMean = (value) => {
    // console.log(value)
    // console.log(`${value} / ${survey_count} = ${value/survey_count}`)
    let survey_mean = value / survey_count;
    // let internal_benchmark = survey_mean * survey_count / managers_length;
    // let external_benchmark = internal_benchmark * survey_count / company_length;
    return survey_mean
  }



  const internalBenchmark = (value) => {
    // console.log(value)
    // console.log(`${value} / ${survey_count}* ${survey_count} / ${managers_length}`)
    let internal_benchmark = value / survey_count * survey_count / managers_length;
    return internal_benchmark
  }

  const externalBenchmark = (value) => {
    // console.log(`${value} / ${survey_count} * ${survey_count} / ${managers_length}* ${survey_count} / ${company_length}`)
    let external_benchmark = value / survey_count * survey_count / managers_length * survey_count / company_length;
    return external_benchmark
  }

  const data_g_1 = [
    ["Task", "Hours per Day"],
    ["Self Assessment", parseInt(impVal * 10)],
    ["Survey Mean", surveyMean(impVal * 10)],
    ["Internal Benchmark", internalBenchmark(impVal * 10)],
    ["External Benchmark", externalBenchmark(impVal * 10)],
  ];


  function checkbtn() {
    console.log(cal)
    console.log(list1)

  }

  const calculate = (val) => {
    console.log(val)
    var featSum = 0
    // featSum += parseInt(val[0].range_val)
    // setcal([...cal, featSum])

    // setcal((prev) => ({ ...prev, ...newData }));

    console.log(cal)
    console.log(featSum)

  }

  // const getActivity = async () => {
  //     let jsonData = await checkUserHosting();
  //     //now you can directly use jsonData
  // }

  const GetSurveyFeedRec = async () => {
    // console.log(managers_length ? managers_length : 0)
    let jsonData = await checkUserHosting();

    // console.log(getActivity())

    var myHeaders = new Headers();
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    // console.log(uid)
    fetch(`${BaseURL}/survey_feedback/company/${feedbackData.company_id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // setlistRecord(result.data);
        console.log(result.data.length)
        console.log(result.data)
        let MyValues = result.data;
        console.log("Edit Values", MyValues);
        if (MyValues) {

          setSurveyLength(MyValues.length)

        }
        // console.log(MyValues.reduce(add, 0))
        // const sum = MyValues.reduce(add, 0)

        // console.log(sum)


        async function calco(val, len) {
          let jsonData = await checkUserHosting();
          let manager_count = jsonData[0].totalItems;
          let company_count = jsonData[1].totalItems;

          console.log(manager_count)
          let surveyMean = val / manager_count;
          let internalBenchmark = surveyMean * len / manager_count;
          let externalBenchmark = internalBenchmark * len / company_count;

          return { surveyMean, internalBenchmark, externalBenchmark }
        }

        async function sumArray(array) {
          let sum = 0 // the sum is initialed to 0

          /* js arrays are zero-index based
          ourArray.length = 5, the initialization block is set to 0.
          the last item is index 4 that is < 5 (what we define in the condition block)
          */
          // var featSum = []
          var [feature1_sum0] = [0];
          var [feature1Sum0, feature1Sum1, feature1Sum2, feature1Sum3, feature1Sum4, feature1Sum5, feature1Sum6, feature1Sum7, feature1Sum8, feature1Sum9] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          var [feature2Sum0, feature2Sum1, feature2Sum2, feature2Sum3, feature2Sum4] = [0, 0, 0, 0, 0]
          var [feature3Sum0, feature3Sum1, feature3Sum2] = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
          var [feature5_sum0] = [0];

          var [featArr0, featArr1, featArr2, featArr3, featArr4] = [[], [], [], [], []]
          // var featArr1 = []

          for (let i = 0; i < array.length; i++) {
            // take every item in the array and add it to sum variable
            console.log(eval(array[i].feature)[0].range_val)
            // console.log(eval(array[i].feature1))
            var feat = eval(array[i].feature)
            var feat1 = eval(array[i].feature1)
            var feat2 = eval(array[i].feature2)
            var feat3 = eval(array[i].feature3)
            // var feat4 = eval(array[i].feature4)
            var feat5 = eval(array[i].feature5)
            // var feat6 = eval(array[i].feature6)
            // var feat7 = eval(array[i].feature7)

            // featSum += parseInt(eval(array[i].feature)[0].range_val)
            // for (var a = 0; a < 4; a++) {
            console.log(feat[0].range_val)

            feature1_sum0 += parseInt(feat[0].range_val)

            feature1Sum0 += parseInt(feat1[0].range_val)
            feature1Sum1 += parseInt(feat1[1].range_val)
            feature1Sum2 += parseInt(feat1[2].range_val)
            feature1Sum3 += parseInt(feat1[3].range_val)
            feature1Sum4 += parseInt(feat1[4].range_val)
            feature1Sum5 += parseInt(feat1[5].range_val)
            feature1Sum6 += parseInt(feat1[6].range_val)
            feature1Sum7 += parseInt(feat1[7].range_val)
            feature1Sum8 += parseInt(feat1[8].range_val)
            feature1Sum9 += parseInt(feat1[9].range_val)


            feature2Sum0 += parseInt(feat2[0].range_val)
            feature2Sum1 += parseInt(feat2[1].range_val)
            feature2Sum2 += parseInt(feat2[2].range_val)
            feature2Sum3 += parseInt(feat2[3].range_val)
            feature2Sum4 += parseInt(feat2[4].range_val)

            feature3Sum0[0] += parseInt(feat3[0].range_val)
            feature3Sum0[1] += parseInt(feat3[1].range_val)
            feature3Sum0[2] += parseInt(feat3[2].range_val)
            feature3Sum1[0] += parseInt(feat3[0].range_val1)
            feature3Sum1[1] += parseInt(feat3[1].range_val1)
            feature3Sum1[2] += parseInt(feat3[2].range_val1)
            feature3Sum2[0] += parseInt(feat3[0].range_val2)
            feature3Sum2[1] += parseInt(feat3[1].range_val2)
            feature3Sum2[2] += parseInt(feat3[2].range_val2)


            feature5_sum0 += parseInt(feat5[0].range_val)



            // feature3Sum1 += parseInt(feat3[1].range_val)
            // feature3Sum2 += parseInt(feat3[2].range_val)




          }




          // console.log(feature3Sum0[1])

          // console.log(feature3Sum1)
          // console.log(feature3Sum2)

          console.log(jsonData)
          let survey_mean = feature1_sum0 / array.length;
          let internal_benchmark = (survey_mean * array.length) / 2;
          let external_benchmark = (survey_mean * array.length) / 2;
          let arraylength = array.length;

          console.log(await calco(feature1Sum0, arraylength))
          featArr0.push(await calco(feature1Sum0, arraylength))

          featArr1.push(await calco(feature1Sum0, arraylength))
          featArr1.push(await calco(feature1Sum1, arraylength))
          featArr1.push(await calco(feature1Sum2, arraylength))
          featArr1.push(await calco(feature1Sum3, arraylength))
          featArr1.push(await calco(feature1Sum4, arraylength))
          featArr1.push(await calco(feature1Sum5, arraylength))
          featArr1.push(await calco(feature1Sum6, arraylength))
          featArr1.push(await calco(feature1Sum7, arraylength))
          featArr1.push(await calco(feature1Sum8, arraylength))
          featArr1.push(await calco(feature1Sum9, arraylength))


          featArr2.push(await calco(feature2Sum0, arraylength))
          featArr2.push(await calco(feature2Sum1, arraylength))
          featArr2.push(await calco(feature2Sum2, arraylength))
          featArr2.push(await calco(feature2Sum3, arraylength))
          featArr2.push(await calco(feature2Sum4, arraylength))


          console.log(await calco(feature3Sum0[0], arraylength))
          console.log(await calco(feature3Sum0[1], arraylength))
          console.log(await calco(feature3Sum0[2], arraylength))

          console.log(await calco(feature3Sum1[0], arraylength))
          console.log(await calco(feature3Sum1[1], arraylength))
          console.log(await calco(feature3Sum1[2], arraylength))


          console.log(await calco(feature3Sum2[0], arraylength))
          console.log(await calco(feature3Sum2[1], arraylength))
          console.log(await calco(feature3Sum2[2], arraylength))

          featArr3.push([await calco(feature3Sum0[0], arraylength), await calco(feature3Sum1[0], arraylength), await calco(feature3Sum2[0], arraylength)])
          featArr3.push([await calco(feature3Sum0[1], arraylength), await calco(feature3Sum1[1], arraylength), await calco(feature3Sum2[1], arraylength)])
          featArr3.push([await calco(feature3Sum0[2], arraylength), await calco(feature3Sum1[2], arraylength), await calco(feature3Sum2[2], arraylength)])


          featArr4.push(await calco(feature5_sum0, arraylength))


          // featArr3.push([feature3Sum0[0], feature3Sum0[1], feature3Sum0[2]])
          // featArr3.push([feature3Sum1[0], feature3Sum1[1], feature3Sum1[2]])
          // featArr3.push([feature3Sum2[0], feature3Sum2[1], feature3Sum2[2]])

          // console.log("fatSum" + featSum1) // 11
          // console.log(sum) // 11
          // return sum
          // return sum
          console.log(featArr0) // 11
          console.log(featArr1) // 11
          console.log(featArr2) // 11
          console.log(featArr3) // 11
          console.log(featArr4) // 11



          return [featArr0, featArr1, featArr2, featArr3, featArr4]

        }
        //   console.log(add(3,2))

        sumArray(MyValues).then((result) => {
          if (result.length == 5) {
            setlist1(result)
            console.log(result)
          }
          // setfeat(featArr0)
          // setlist1(list1 => [...list1, featArr0])
          // setlist1(list1 => [...list1, featArr1])
          // setlist1(list1 => [...list1, featArr2])
          // setlist1(list1 => [...list1, featArr3])
          // setlist1(list1 => [...list1, featArr4])
        }); // logs 11




      })

    fetch(`${BaseURL}/survey_feedback/${feedbackData.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // setlistRecord(result.data);
        console.log(result)
        console.log(result.data)
        setRecordeData(result.data)
        console.log(result.data.feature)

        let MyValues = result.data;
        console.log("Edit Values", MyValues);
        MyValues.map((x, i) => {
          var Feature = eval(x.feature);
          var Feature1 = eval(x.feature1);
          var Feature2 = eval(x.feature2);
          var Feature3 = eval(x.feature3);
          var Feature4 = eval(x.feature4);
          var Feature5 = eval(x.feature5);
          var Feature6 = eval(x.feature6);
          var Feature7 = eval(x.feature7);



          var optionVal1 = Feature4.filter(({ status }) => status === true)
          var optionVal2 = Feature6.filter(({ favstatus }) => favstatus === true)

          console.log(optionVal1)

          if (Feature) {
            console.log("feature", Feature);
            // setInputListFinal([Feature],[Feature1])
            setInputListFinal(inputListFinal => [...inputListFinal, { Feature, Feature1, Feature2, Feature3, Feature4, Feature5, Feature6, Feature7 }])

          }
          if (optionVal1) {
            console.log("feature", Feature);
            // setInputListFinal([Feature],[Feature1])
            setInputListFinal(inputListFinal => [...inputListFinal, { optionVal1 }])

          }

          if (optionVal2) {
            console.log("feature", Feature);
            // setInputListFinal([Feature],[Feature1])
            setInputListFinal(inputListFinal => [...inputListFinal, { optionVal2 }])

          }

        })

      })
  }







  return (
    <>
      <fieldset>
        <div className="row">
          <div className="col-12">
            {/* <div className="steps">
              <CircularProgressWithLabel size={70} value={5 * 10} />
            </div> */}
          </div>
        </div>

        <div className="form-card" style={{ height: 'auto' }}>

          <h2 className="purple-text text-center"><strong>You did it!</strong> <br />
            Wasn’t that easy?</h2>
          <br />
          <div className="row justify-content-center">
            <div className="col-3">
              <div className="success-animation">
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                  <circle className="checkmark__circle" cx={26} cy={26} r={25} fill="none" />
                  <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
              </div>
            </div>
          </div>
          <br />
          <div className="row justify-content-center">
            <div className="col-7 text-center">
              <h5 className="purple-text text-center">Thank you for your time. We now hope others will return the favor for you someday. Wish you much success.</h5>
            </div>
          </div>
          {/* <button onClick={() => window.print()} >check</button> */}
        </div>



      </fieldset >





      {list1.length == 5 ? (<button
        type="button"
        className="btn downloadbtn waves-effect"
        onClick={exportPDFWithMethod}
        style={{position:"relative",left:"46%"}}
      >
        Download PDF   <i class="ml-1 zmdi zmdi-cloud-download"></i>
      </button>) : null}
    </>
  )
}
