let myChartEmails = ""
let myChartCompanyType = ""
let myChartActivePassiveContractors = ""
let myChartRlaStatus = ""
function addOneMonthToDate(dateString) {
    const originalDate = new Date(dateString);
    const newDate = new Date(originalDate);
    newDate.setMonth(newDate.getMonth() + 1);
    newDate.setDate(Math.min(originalDate.getDate(), newDate.getDate()));
    return newDate.toISOString().split('T')[0]; 
}
function addSixMonthsAndSubtractOneDay(dateString) {
    console.log(dateString)
    const originalDate = new Date(dateString);
    const newDate = new Date(originalDate);
    newDate.setMonth(newDate.getMonth() + 6);
    newDate.setDate(Math.min(originalDate.getDate(), newDate.getDate()) - 1);
    console.log(newDate)
    return newDate.toISOString().split('T')[0]; 
}
function formatDateToMonthYear(dateString) {
    const [year, month] = dateString.split("-");
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  
    if (month >= 1 && month <= 12) {
      const formattedDate = `${monthNames[month - 1]} ${year}`;
      return formattedDate;
    } else {
      return "Invalid Date";
    }
  }


async function makeCanvasForGraphEmails(){
    // console.log("makeCavas for emails")
    const result = document.getElementById('result1');
    result.innerHTML = '';
    console.log(result)
    result.innerHTML += `
                             <div class="card">
                                <div class="card-header">
                                    <div class="row justify-content-center">
                                        <div class="col-10 d-flex justify-content-center">
                                            <h5 class="d-inline">Portal Emails</h5>
                                        </div>
                                        <div class="col-2">
                                            <button class="btn btn-primary btnTableEmail btn-sm" id="btnTableEmail" onclick="showTableEmails()" style="background-color:rgba(2, 90, 190, 0.678)">TABLE</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body d-flex justify-content-center align-items-center">
                                    <canvas id="salesForceGraphEmailsPresentAbsent" height="300px"></canvas>
                                </div>
                            </div>`
    
}
async function makeGraphFromCanvasEmails(dataList){
    // console.log("make cgraph for cavas for emails")
    const chrt = document
    .getElementById("salesForceGraphEmailsPresentAbsent")
    .getContext("2d");
  myChartEmails = new Chart(chrt, {
    type: "bar",
    data: {
      labels: ['Total Excel Emails','Portal Present Emails','Portal Absent Emails'],
      datasets: [
        {
          label: "Contractors",
          data: [ parseInt(dataList.data.presentEmails)+parseInt(dataList.data.absentEmails),parseInt(dataList.data.presentEmails),parseInt(dataList.data.absentEmails[0])],
          backgroundColor: "#279EFF",
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

async function makeCanvasForCompanyType(){
    console.log("makeCavas for companyType")
    const result = document.getElementById('result2');
    console.log(result)
    result.innerHTML = '';
    result.innerHTML += `
                             <div class="card">
                                <div class="card-header">
                                    <div class="row justify-content-center">
                                        <div class="col-10 d-flex justify-content-center">
                                            <h5 class="d-inline">Contractor Type</h5>
                                        </div>
                                        <div class="col-2">
                                            <button class="btn btn-primary btnCompanyType btn-sm" id="btnCompanyType" onclick="showTableCompanyType()" style="background-color:rgba(2, 90, 190, 0.678)">TABLE</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body d-flex justify-content-center align-items-center">
                                    <canvas id="salesForceGraphCompanyType" height="300px"></canvas>
                                </div>
                            </div>`
}
async function makeGraphFromCompanytype(dataList){
    console.log("make cgraph for cavas for emails")
    const chrt = document
    .getElementById("salesForceGraphCompanyType")
    .getContext("2d");
  myChartCompanyType = new Chart(chrt, {
    type: "bar",
    data: {
      labels: dataList.data.map(data => data[0]),
      datasets: [
        {
          label: "Contractors",
          data: dataList.data.map(data=>data[1]),
          backgroundColor: "#279EFF",
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
});
}

function makeGraphforActivePassiveContractorsDummy(){
    const formData = new FormData(formForSalesForce);
    yearForDate = ""
    monthForDate = ""
    formData.forEach((key,value) => {
        console.log(`${key},${value}`);
        if(`${value}` == "month"){
            monthForDate = key
        }
        if(`${value}`=="year"){
            yearForDate = key
        }
    });   
    console.log(yearForDate)
    console.log(monthForDate)
    dateForFinding = yearForDate+"-"+monthForDate+"-"+"01";
    console.log(dateForFinding)
    makeGraphforActivePassiveContractors(formData,dateForFinding)
}
async function makeCanvasForActivepassiveContractors(formData,date){
    console.log("makeCavas for ActivePassiveContractors")
    const result = document.getElementById('result3');
    console.log(result)
    dateEnd = addSixMonthsAndSubtractOneDay(date)
    result.innerHTML = '';
    result.innerHTML += `
                             <div class="card">
                                <div class="card-header">
                                    <div class="row justify-content-center">
                                        <div class="col-7 d-flex justify-content-center">
                                            <h5 class="d-inline">Contractor Type</h5>
                                        </div>
                                        <div class="col-4 row">
                                            <div class="col-12">
                                                    <input onchange="makeGraphforActivePassiveContractorsDummy()" type="date" id="btnstartdateActivePassiveCon" value="${date}" min="${date}">
                                            </div>
                                            <div class="col-12">
                                                     <input onchange="makeGraphforActivePassiveContractorsDummy()" type="date" id="enddateActivePassiveCon" value="${dateEnd}">
                                            </div>
                                        </div>
                                        <div class="col-1">
                                            <button class="btn btn-primary btnActivePassiveContractors btn-sm" id="btnActivePassiveContractors" onclick="showTableClientStatus()" style="background-color:rgba(2, 90, 190, 0.678)">TABLE</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body d-flex justify-content-center align-items-center">
                                    <canvas id="salesForceGraphActivePassiveContractors" height="300px"></canvas>
                                </div>
                            </div>`
}

function makeMeChartDataActivePassive(data){
    let ans = {};
    let size = data.length;
    for( let i = 0 ; i < size ; i++ ){
        if( data[i][1] in ans ){
            if(data[i][0] == 0 ){
                ans[data[i][1]][0] = data[i][2];
            }else if(data[i][0] == 6 ){
                ans[data[i][1]][1] = data[i][2];
            }else if(data[i][0] == 8 ){
                ans[data[i][1]][2] = data[i][2];
            }else if(data[i][0] == 9 ){
                ans[data[i][1]][3] = data[i][2];
            }else if(data[i][0] == 10 ){
                ans[data[i][1]][4] = data[i][2];
            }
        }else{
            ans[data[i][1]] = [0,0,0,0,0];
            if(data[i][0] == 0 ){
                ans[data[i][1]][0] = data[i][2];
            }else if(data[i][0] == 6 ){
                ans[data[i][1]][1] = data[i][2];
            }else if(data[i][0] == 8 ){
                ans[data[i][1]][2] = data[i][2];
            }else if(data[i][0] == 9 ){
                ans[data[i][1]][3] = data[i][2];
            }else if(data[i][0] == 10 ){
                ans[data[i][1]][4] = data[i][2];
            }
        }
    }
    return ans;
}


async function makeGraphFromActivepassiveContractors(dataList , dateForFinding){
    console.log("make cgraph for cavas for emails")
    const chrt = document
    .getElementById("salesForceGraphActivePassiveContractors")
    .getContext("2d");
    console.log(dateForFinding)
    console.log(dataList)
    let chartD = makeMeChartDataActivePassive(dataList.data)
    // charD eg.
    // {                    0,6,8,9,10
    //     "2023-07-01":[2,3,4,5,2],
    //     "2023-08-01":[2,3,4,5,6]
    // }
    let keys = Object.keys(chartD);
    keys.sort();
    console.log(keys)
    console.log(chartD)
   const Chartdata = {
    labels: keys.map(data => formatDateToMonthYear(data)),
    datasets: [
      {
        label: "Inactive",
        data: keys.map(data=>chartD[data][0]),
        backgroundColor: "#146C94",
        borderWidth: 2,
      },
      {
        label: "Limited Inactive",
        data: keys.map(data=>chartD[data][1]),
        backgroundColor: "#279EFF",
        borderWidth: 1,
      },
      {
        label: "Limited Active",
        data: keys.map(data=>chartD[data][2]),
        backgroundColor: "#AFD3E2",
        borderWidth: 1,
      },
      {
        label: "Pending",
        data: keys.map(data=>chartD[data][3]),
        backgroundColor: "#AFD3E2",
        borderWidth: 1,
      },
      {
        label: "Active",
        data: keys.map(data=>chartD[data][4]),
        backgroundColor: "#AFD3E2",
        borderWidth: 1,
      }
    ]
  };
  if(myChartActivePassiveContractors)
    myChartActivePassiveContractors.destroy()
  myChartActivePassiveContractors =  new Chart(chrt, {
    type: "bar",
    data: Chartdata,
    options: {
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: false,
        },
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  });
}

function makeGraphforrlaStatusDummy(){
    const formData = new FormData(formForSalesForce);
    yearForDate = ""
    monthForDate = ""
    formData.forEach((key,value) => {
        console.log(`${key},${value}`);
        if(`${value}` == "month"){
            monthForDate = key
        }
        if(`${value}`=="year"){
            yearForDate = key
        }
    });   
    console.log(yearForDate)
    console.log(monthForDate)
    dateForFinding = yearForDate+"-"+monthForDate+"-"+"01";
    console.log(dateForFinding)
    makeGraphforrlaStatus(formData,dateForFinding)
}
async function makeCanvasForforRlaStatus(formData,date){
    console.log("makeCavas for RlaStatus")
    const result = document.getElementById('result4');
    console.log(result)
    result.innerHTML = '';
    dateEnd = addSixMonthsAndSubtractOneDay(date)
    result.innerHTML += `
                             <div class="card">
                                <div class="card-header">
                                    <div class="row justify-content-center">
                                        <div class="col-7 d-flex justify-content-center">
                                            <h5 class="d-inline">Reconciliation Status </h5>
                                        </div>
                                        <div class="col-4 row">
                                            <div class="col-12">
                                                <input onchange="makeGraphforrlaStatusDummy()" type="date" id="startdateRlaStatus" value="${date}" min="${date}">
                                            </div>
                                            <div class="col-12">
                                                <input onchange="makeGraphforrlaStatusDummy()" type="date" id="enddateRlaStatus" value="${dateEnd}">
                                            </div>
                                        </div>
                                        <div class="col-1">
                                            <button class="btn btn-primary btnRlaStatus btn-sm" id="btnRlaStatus" onclick="showTableRlaStatus()" style="background-color:rgba(2, 90, 190, 0.678)">TABLE</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body d-flex justify-content-center align-items-center">
                                    <canvas id="salesForceGraphRlaStatus" height="300px"></canvas>
                                </div>
                            </div>`
}

function makeMeChartDataRlaStatus(data){
    let ans = {};
    let size = data.length;
    for( let i = 0 ; i < size ; i++ ){
        if( data[i][1] in ans ){
            if(data[i][0] == 1 ){
                ans[data[i][1]][0] = data[i][2];
            }else if(data[i][0] == 3 ){
                ans[data[i][1]][1] = data[i][2];
            }else if(data[i][0] == 4 ){
                ans[data[i][1]][2] = data[i][2];
            }
        }else{
            ans[data[i][1]] = [0,0,0];
            if(data[i][0] == 1 ){
                ans[data[i][1]][0] = data[i][2];
            }else if(data[i][0] == 3 ){
                ans[data[i][1]][1] = data[i][2];
            }else if(data[i][0] == 4 ){
                ans[data[i][1]][2] = data[i][2];
            }
        }
    }
    return ans;
}

async function makeGraphFromforRlaStatus(dataList ,dateForFinding){
    console.log("make cgraph for cavas for emails")
    const chrt = document
    .getElementById("salesForceGraphRlaStatus")
    .getContext("2d");
    let chartD = makeMeChartDataRlaStatus(dataList.data)
    // charD eg.
    // {                    1,3,4
    //     "2023-07-01":[2,3,4],
    //     "2023-08-01":[2,3,4]
    // }
    let keys = Object.keys(chartD);
    keys.sort();
    console.log(keys)
    console.log(chartD)
    const Chartdata = {
        labels: keys.map(data => formatDateToMonthYear(data)),
        datasets: [
          {
            label: 1,
            data: keys.map(data=>chartD[data][0]),
            backgroundColor: "#146C94",
            borderWidth: 2,
          },
          {
            label: "Reconcilied",
            data: keys.map(data=>chartD[data][1]),
            backgroundColor: "#279EFF",
            borderWidth: 1,
          },
          {
            label: 4,
            data: keys.map(data=>chartD[data][2]),
            backgroundColor: "#AFD3E2",
            borderWidth: 1,
          }
        ]
      }
 if(myChartRlaStatus)
      myChartRlaStatus.destroy()
  myChartRlaStatus =  new Chart(chrt, {
    type: "bar",
    data: Chartdata,
    options: {
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: false,
        },
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  });
}


