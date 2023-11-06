const form = document.getElementById('formForXL');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    let startDate = "";
    value = ""
    for (const entry of formData.entries()) {
        const [name, revalue] = entry;
        if(name == 'monthAndYear')
            value = revalue;
    }
    const [year,monthi] = value.split("-");
    const yearNum = parseInt(year);
    const monthNum = parseInt(monthi);
    const sDate = new Date(yearNum,monthNum-1,1);
    const currentDate = new Date();
    const yearstart = sDate.getFullYear();
    const monthstart = String(sDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const daystart = String(sDate.getDate()).padStart(2, '0');
    startDate = `${yearstart}-${monthstart}-${daystart}`;
    formData.append("monthStartDate", startDate);
    try {
        const response = await fetch(`http://${port}/api/checkIfItIsPresentMonth`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            const data = await response.json();
            // console.log(data.data[0][0]);
            if( data.data[0][0] == 1 ){
                //TODO : data already Exist , print existing data .
                const resultDiv0 = document.getElementById('result0');
                resultDiv0.innerHTML = '';
                const resultDiv1 = document.getElementById('result1');
                resultDiv1.innerHTML = '';
                const resultDiv2 = document.getElementById('result2');
                resultDiv2.innerHTML = '';
                const resultDiv3 = document.getElementById('result3');
                resultDiv3.innerHTML = '';
                const resultDiv4 = document.getElementById('result4');
                resultDiv4.innerHTML = '';
                const resultDiv5 = document.getElementById('result5');
                resultDiv5.innerHTML = '';
                resultDiv0.innerHTML+='<h3>Result already exist , printing the data</h3>'
                return ;
            }else{
                try {
                    const response = await fetch(`http://${port}/api/upload-excel/findCount`, {
                        method: 'POST',
                        body: formData,
                    });
                    const data = await response.json();
                    await saveInTheDb(formData);
                    displayResultTotal(data);
                    await companyTypeTotal(formData);
                    await statusOfCompanyTotal(formData);
                    // await rlaTotal(formData);
                    rlaTotaldate();
                } catch (error) {
                    console.error(error);
                }
            }
        } else {
            console.log("Response not OK:", response.status, response.statusText);
        }
    } catch (error) {
        console.log("Error while checking if the Excel exists:", error);
    }
});

function displayResultTotal(data) {
    const resultDiv = document.getElementById('result1');
    resultDiv.innerHTML = '';

    if (data.error) {
        resultDiv.innerHTML = `<p class="text-danger">${data.error}</p>`;
    } else {
        const presentEmails = data.present_emails;
        const totalEmails = data.total_emails;
        resultDiv.innerHTML += '<br>'
        resultDiv.innerHTML += '<h5 class="mt-3">Contractors present in the database with specified Email - </h5>'
        resultDiv.innerHTML += '<div class="mt-4 d-inline mt-3">Email Total  - </div>'
        resultDiv.innerHTML += `<h6 class="mt-5 d-inline"> ${totalEmails}</h6>`
        resultDiv.innerHTML += '<br>'
        resultDiv.innerHTML += '<div class="mt-4 d-inline">Email Present  - </div>'
        resultDiv.innerHTML += `<h6 class="mt-5 d-inline"> ${presentEmails[0][0]}</h6>`
        if(presentEmails != 0 )
        resultDiv.innerHTML += `<button onClick="btnUserByMonthTotalEmails()" class="btn btn-outline-primary btn-sm m-1 ml-4">Details</button>`
        resultDiv.innerHTML += '<br>'
        resultDiv.innerHTML += '<div class="mt-4 d-inline">Email Absent  - </div>'
        resultDiv.innerHTML += `<h6 class="mt-5 d-inline mb-4"> ${totalEmails - presentEmails[0][0]}</h6>`
        if((totalEmails - presentEmails[0][0]) != 0 )
        resultDiv.innerHTML += `<button onClick="btnUserByMonthAbsentEmails()" class="btn btn-outline-primary btn-sm m-1 ml-4">Details</button>`
        resultDiv.innerHTML += '<br>'
    }
    
    return
}
async function companyTypeTotal(formData){
    let dataList = "";
    const apiUrl = `http://${port}/api/upload-excel/companyTypeCount`;
    await fetch(apiUrl,{body:formData,method:'POST'})
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((d) => {
        dataList = d;
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
      const resultDiv = document.getElementById('result2');
      let paye = 0  ;
      let director = 0  ;
      let plc = 0  ;
      if (dataList.error) {
          resultDiv.innerHTML += `<p class="text-danger">${dataList.error}</p>`;
      } else {
              dataL = dataList.data;
              for( const dataFrame of dataL ){
                // console.log(dataFrame)
                if(dataFrame[0] == 1 )
                    paye = dataFrame[1];
                else if(dataFrame[0] == 2 )
                    director = dataFrame[1]
                else 
                plc = dataFrame[1]
        }
        resultDiv.innerHTML = '<h5 class = "mt-4" >Company type for Present Contractors -</h5>';
        resultDiv.innerHTML += '<div class ="mt-4 d-inline mt-3" >Paye - </div>';
        resultDiv.innerHTML += `<h6 class ="d-inline">${paye}</h6>`;
        if(paye != 0 )
        resultDiv.innerHTML += `<button onClick="btnUserByMonthPaye()" class="btn btn-outline-primary btn-sm m-1 ml-4">Details</button>`
        resultDiv.innerHTML += `<br>`;
        resultDiv.innerHTML += '<div class ="mt-4 d-inline" >Director - </div>';
        resultDiv.innerHTML += `<h6 class ="d-inline">${director}</h6>`;
        if(director != 0 )
        resultDiv.innerHTML += `<button onClick="btnUserByMonthDirector()" class="btn btn-outline-primary btn-sm m-1 ml-4">Details</button>`
        resultDiv.innerHTML += `<br>`;
        resultDiv.innerHTML += '<div class ="mt-4 d-inline" >Plc - </div>';
        resultDiv.innerHTML += `<h6 class ="d-inline">${plc}</h6>`;
        if(plc != 0 )
        resultDiv.innerHTML += `<button onClick="btnUserByMonthPlc()" class="btn btn-outline-primary btn-sm m-1 ml-4">Details</button>`
        resultDiv.innerHTML += `<br><br>`;
        resultDiv.innerHTML += '<div class ="mt-4 d-inline" >Umbrella(paye+director) - </div>';
              resultDiv.innerHTML += `<h6 class ="d-inline">${paye+director}</h6>`;
              resultDiv.innerHTML += `<br>`;
      }
      return
}
async function statusOfCompanyTotal(formData){
    let dataList = "";
    const apiUrl = `http://${port}/api/upload-excel/statusOfCompanyTotal`;
    await fetch(apiUrl,{body:formData,method:'POST'})
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((d) => {
        dataList = d;
    })
    .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
      const resultDiv = document.getElementById('result3');
      let active = 0  ;
      let pending = 0  ;
      let limited_inactive = 0  ;
      let limited_active = 0  ;
      let inactive = 0  ;
      if (dataList.error) {
          resultDiv.innerHTML += `<p class="text-danger">${dataList.error}</p>`;
      } else {
          dataL = dataList.data;
          for( const dataFrame of dataL ){
              // console.log(dataFrame)
              if(dataFrame[0] == 10 )
              active = dataFrame[1];
            else if(dataFrame[0] == 9 )
            pending = dataFrame[1]
        else if(dataFrame[0] == 8 ) 
        limited_active = dataFrame[1]
    else if(dataFrame[0] == 6 ) 
    limited_inactive = dataFrame[1]
else if(dataFrame[0] == 0 ) 
inactive = dataFrame[1]
}
resultDiv.innerHTML = '<h5 class = "mt-4" >Current Status for Umbrella company contractors -</h5>';
resultDiv.innerHTML += '<div class ="d-inline mt-3" >Active - </div>';
resultDiv.innerHTML += `<h6 class ="d-inline">${active}</h6>`;
if(active != 0 )
resultDiv.innerHTML += `<button class="btn btn-outline-primary btn-sm m-1 ml-4" onClick="btnUserByMonthActive()">Details</button>`
resultDiv.innerHTML += `<br>`;
resultDiv.innerHTML += '<div class ="mt-4 d-inline" >Limited Active - </div>';
resultDiv.innerHTML += `<h6 class ="mt-5 d-inline">${limited_active}</h6>`;
if(limited_active != 0 )
resultDiv.innerHTML += `<button onClick="btnUserByMonthLimitedActive()" class="btn btn-outline-primary btn-sm m-1 ml-4">Details</button>`
resultDiv.innerHTML += `<br>`;
resultDiv.innerHTML += '<div class ="mt-4 d-inline" >Limited inactive - </div>';
resultDiv.innerHTML += `<h6 class ="mt-5 d-inline">${limited_inactive}</h6>`;
if(limited_inactive != 0 )
resultDiv.innerHTML += `<button onClick="btnUserByMonthLimitedInactive()" class="btn btn-outline-primary btn-sm m-1 ml-4">Details</button>`
resultDiv.innerHTML += `<br>`;
resultDiv.innerHTML += '<div class ="mt-4 d-inline" >Inactive - </div>';
resultDiv.innerHTML += `<h6 class ="mt-5 d-inline">${inactive}</h6>`;
if(inactive != 0 )
resultDiv.innerHTML += `<button onClick="btnUserByMonthInactive()" class="btn btn-outline-primary btn-sm m-1 ml-4">Details</button>`
resultDiv.innerHTML += `<br>`;
resultDiv.innerHTML += '<div class =" d-inline" >Pending - </div>';
resultDiv.innerHTML += `<h6 class ="d-inline">${pending}</h6>`;
if(pending != 0 )
resultDiv.innerHTML += `<button onClick="btnUserByMonthPending()" class="btn btn-outline-primary btn-sm m-1 ml-4">Details</button>`
resultDiv.innerHTML += `<br>`;
}
return
}
async function rlaTotal(formData){
    const resultDiv = document.getElementById('result4');
    resultDiv.innerHTML = '<h5 class = "mt-4" >Select the Date range for the reconciliation status of Umbrella - </h5>';
    resultDiv.innerHTML += `<br>`;
    // resultDiv.innerHTML += `
    // <div class="row">
    // <div class="form-group">
    // <label for="startDate">Start Date:</label>
    // <input onchange="rlaTotaldate()" type="date" name="startDate" id="startDateExcel" class="form-control startDateRangeExcel" required>
    // </div>
    // <div class="form-group">
    // <label for="endDate">End Date:</label>
    // <input onchange="rlaTotaldate()" type="date" name="endDate" id="endDateExcel" class="form-control endDateRangeExcel" required>
    // </div>
    // </div>`;
}
async function rlaTotaldate(){
    const formData = new FormData(form);
    let startDate = "";
    let endDate = "";
    value = ""
    // console.log(endDate)
    for (const entry of formData.entries()) {
        const [name, revalue] = entry;
        if(name == 'monthAndYear')
            value = revalue;
    //         startDate = value+'-01';

    //         endDate = new Date(year,nextMonth,0);
    //     //     const dateStr = value;
    //     //     const parts = dateStr.split('-');
    //     //     const month = parts[1];
    //     //     if( month in ["01","03","05","07","08","10","12"] )
    //     //         endDate = value+'-31';
    //     //     else if( month == "02")
    //     //         endDate = value+'-29';
    //     //     else 
    //     //         endDate = value+'-30'
    //     }
    }
    const [year,monthi] = value.split("-");
    const yearNum = parseInt(year);
    const monthNum = parseInt(monthi)-1;
    const nextMonth = monthNum + 1;
    const eDate = new Date(yearNum,nextMonth,0);
    const sDate = new Date(yearNum,monthNum,1);
    const currentDate = new Date();

    const yearstart = sDate.getFullYear();
    const monthstart = String(sDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const daystart = String(sDate.getDate()).padStart(2, '0');
    startDate = `${yearstart}-${monthstart}-${daystart}`;
    const yearend = eDate.getFullYear();
    const monthend = String(eDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const dayend = String(eDate.getDate()).padStart(2, '0');
    endDate = `${yearend}-${monthend}-${dayend}`;


    console.log(startDate);
    console.log(endDate);
    if( !startDate || !endDate ){
        return
    }
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    console.log(formData);
    let dataList = "";
    const apiUrl = `http://${port}/api/upload-excel/rlaStatus`;
    await fetch(apiUrl,{body:formData,method:'POST'})
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((d) => {
        dataList = d;
    })
    .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
    });
    let one = 0;
    let four = 0;
    let three = 0;
    const resultDiv = document.getElementById('result5');
    if (dataList.error) {
        resultDiv.innerHTML += `<p class="text-danger">${dataList.error}</p>`;
    } else {
        resultDiv.innerHTML = '<h5 class = "mt-4" >Number of Contractor with respective rla status in given time frame -</h5>';
        resultDiv.innerHTML = '<h6 class = "mt-4" >🎤A contractor may have more than one rla status in given time frame -</h6>';
        dataL = dataList.data;
        for( const dataFrame of dataL ){
            // console.log(dataFrame)
                if(dataFrame[0] == 1 )
                    one = dataFrame[1];
                else if(dataFrame[0] == 3 )
                    three = dataFrame[1]
                else if(dataFrame[0] == 4 ) 
                    four = dataFrame[1]
                }
        resultDiv.innerHTML += '<div class ="mt-4 d-inline mt-3" >With Status 1 - </div>';
        resultDiv.innerHTML += `<h6 class ="mt-5 d-inline">${one}</h6>`;
        if(one != 0 )
        resultDiv.innerHTML += `<button onClick="btnUserByMonthOne()" class="btn btn-outline-primary btn-sm m-1 ml-4">Details</button>`
        resultDiv.innerHTML += `<br>`;
        resultDiv.innerHTML += '<div class ="mt-4 d-inline" >With Status 3 - </div>';
        resultDiv.innerHTML += `<h6 class ="mt-5 d-inline">${three}</h6>`;
        if(three != 0 )
        resultDiv.innerHTML += `<button onClick="btnUserByMonthThree()" class="btn btn-outline-primary btn-sm m-1 ml-4">Details</button>`
        resultDiv.innerHTML += `<br>`;
        resultDiv.innerHTML += '<div class ="mt-4 d-inline" >With Status four - </div>';
        resultDiv.innerHTML += `<h6 class ="mt-5 d-inline">${four}</h6>`;
        if(four != 0 )
        resultDiv.innerHTML += `<button onClick="btnUserByMonthFour()" class="btn btn-outline-primary btn-sm m-1 ml-4">Details</button>`
    }
    return
}

async function saveInTheDb(formData){
    let startDate = "";
    let endDate = "";
    value = ""
    // console.log(endDate)
    for (const entry of formData.entries()) {
        const [name, revalue] = entry;
        if(name == 'monthAndYear')
            value = revalue;
    }
    const [year,monthi] = value.split("-");
    const yearNum = parseInt(year);
    const monthNum = parseInt(monthi)-1;
    const nextMonth = monthNum + 1;
    const eDate = new Date(yearNum,nextMonth,0);
    const sDate = new Date(yearNum,monthNum,1);
    const currentDate = new Date();

    const yearstart = sDate.getFullYear();
    const monthstart = String(sDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const daystart = String(sDate.getDate()).padStart(2, '0');
    startDate = `${yearstart}-${monthstart}-${daystart}`;
    const yearend = eDate.getFullYear();
    const monthend = String(eDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const dayend = String(eDate.getDate()).padStart(2, '0');
    endDate = `${yearend}-${monthend}-${dayend}`;


    console.log(startDate);
    console.log(endDate);
    if( !startDate || !endDate ){
        return
    }
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    console.log(formData);
    let dataList = "";

    const apiUrl = `http://${port}/api/addDataToExcelDataTable`;
    await fetch(apiUrl,{body:formData,method:'POST'})
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((d) => {
        dataList = d;
    })
    .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
    console.log(dataList)
    const resultDiv = document.getElementById('result0');
    resultDiv.innerHTML = "<h6>Added data in the database</h6>"
}