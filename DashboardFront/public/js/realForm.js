const formReal = document.getElementById('formForXLReal');
formReal.addEventListener('submit', async (e) => {
    e.preventDefault();
    const resultDivAddModel = document.getElementById('addingDataToDatabase');
    resultDivAddModel.innerHTML = '<div id="addingDataToDatabase" class="mt-2"><div class="spinner-border spinner-border-sm" role="status"><span class="sr-only">Loading...</span></div></div>'
    const formData = new FormData(formReal);
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
                console.log("resultDivAddModel")
                resultDivAddModel.innerHTML = '';
                resultDivAddModel.innerHTML+='<h6>Excel Data Already Exist</h6>'
            }else{
                try {
                    await saveInTheDb(formData);
                    resultDivAddModel.innerHTML = '';
                    resultDivAddModel.innerHTML+='<h6>Added Data to Database</h6>'
                    await saveExcelFileToTheServer();
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

async function saveExcelFileToTheServer(){
    const formData = new FormData(formReal);
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
        const response = await fetch(`http://${port}/api/uploadExcelToTheServer`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            const data = await response.json();
            const resultDivAddModel = document.getElementById('addingExcelToDatabase');
            resultDivAddModel.innerHTML =''
            resultDivAddModel.innerHTMl = 'Excel Saved'
        } else {
            const data = await response.json();
            const resultDivAddModel = document.getElementById('addingExcelToDatabase');
            resultDivAddModel.innerHTML =''
            resultDivAddModel.innerHTMl = 'Error While Saving Excel File'
            console.log("Response not OK:", response.status, response.statusText);
        }
    } catch (error) {
        console.log("Error while checking if the Excel exists:", error);
    }
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
}