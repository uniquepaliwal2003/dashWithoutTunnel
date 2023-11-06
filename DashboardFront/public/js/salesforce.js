const formForSalesForce = document.getElementById('formForSalesForce');
formForSalesForce.addEventListener('submit', async (e) => {
    e.preventDefault();
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
    yearMonthValue = yearForDate+"-"+monthForDate;
    makeCorrectDefaultValuesForInputTable34(yearMonthValue);
    try {
        const response = await fetch(`http://${port}/api/checkIfItIsPresentMonthByDate`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            const data = await response.json();
            // console.log(data.data[0][0]);
            if( data.data[0][0] == 1 ){
                //TODO : data already Exist , print existing data .
                await makeGraphforEmailsPortal(formData);
                await makeGraphforCompanyType(formData);
                await makeCanvasForActivepassiveContractors(formData,dateForFinding);
                await makeCanvasForforRlaStatus(formData,dateForFinding);
                await makeGraphforActivePassiveContractors(formData,dateForFinding);
                await makeGraphforrlaStatus(formData,dateForFinding);
                return ;
            }else{
                const resultDiv = document.getElementById('result1');
                resultDiv.innerHTML = '';
                resultDiv.innerHTML+= '<h6 class="mt-3">The data is not present yet , because excel of that month is not entered , please enter the excel from download section.</h6>'
            }
        } else {
            console.log("Response not OK:", response.status, response.statusText);
        }
    } catch (error) {
        console.log("Error while checking if the Excel exists:", error);
    }
});






async function makeGraphforCompanyType(formData){
    console.log("This is companyType graph");
    try {
        const response = await fetch(`http://${port}/api/salesForceGraphCompanyTypes`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            const data = await response.json(); 
            // console.log(data)
            await makeCanvasForCompanyType();
            await makeGraphFromCompanytype(data);
        } else {
            console.log("Response not OK:", response.status, response.statusText);
        }
    } catch (error) {
        console.log("Error while drawing company type graph", error);
    }
}



async function makeGraphforEmailsPortal(formData){
    // console.log("This is emails present graph");
    try {
        const response = await fetch(`http://${port}/api/salesForceGraphEmailsPresentAbsent`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            const data = await response.json();
            // console.log(data)
            await makeCanvasForGraphEmails();
            await makeGraphFromCanvasEmails(data);
        } else {
            console.log("Response not OK:", response.status, response.statusText);
        }
    } catch (error) {
        console.log("Error while drawing emails graph", error);
    }
}



async function makeGraphforActivePassiveContractors(formData , date){
    const dateStart = document.getElementById('btnstartdateActivePassiveCon').value;
    const dateEnd = document.getElementById('enddateActivePassiveCon').value;
    formData.append("dateStart",dateStart);
    formData.append("dateEnd",dateEnd);
    try {
        const response = await fetch(`http://${port}/api/salesForceGraphActivePassiveContractors`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            const dataList = await response.json();
            console.log(dataList)
  
            await makeGraphFromActivepassiveContractors(dataList,date);
        } else {
            console.log("Response not OK:", response.status, response.statusText);
        }
    } catch (error) {
        console.log("Error while checking if the Excel exists:", error);
    }
}
async function makeGraphforrlaStatus(formData , date){
    const dateStart = document.getElementById('startdateRlaStatus').value;
    const dateEnd = document.getElementById('enddateRlaStatus').value;
    formData.append("dateStart",dateStart);
    formData.append("dateEnd",dateEnd);
    try {
        const response = await fetch(`http://${port}/api/salesForceGraphRlaStatus`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log(data)

            await makeGraphFromforRlaStatus(data,date);
        } else {
            console.log("Response not OK:", response.status, response.statusText);
        }
    } catch (error) {
        console.log("Error while checking if the Excel exists:", error);
    }
}



