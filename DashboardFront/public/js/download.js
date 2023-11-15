const submitButtonYearDownload = document.getElementById('formForDownloadDate')
submitButtonYearDownload.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const formData = new FormData(submitButtonYearDownload);
    try {
        const response = await fetch(`http://${port}/api/getTheExcelPresentListByYear`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            const dataList = await response.json();
            const resultDiv = document.getElementById('bodyOfTable');
            if(dataList.data.length == 0 ){
                console.log("Helo")
                resultDiv.innerHTML = ''
                resultDiv.innerHTML += '<h5>Year does not have any data</h5>'
            }else{
                resultDiv.innerHTML = ''
                let tableHtml = `<table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">S.No.</th>
                                                <th scope="col">Month</th>
                                                <th scope="col">Download</th>
                                            </tr>
                                        </thead>
                                        <tbody>`
                for( let i = 0 ; i < dataList.data[0].length ; i++ ){
                    tableHtml += `<tr>
                                     <td>${i+1}</td>
                                     <td>${getMonthAndYearFromDate(dataList.data[0][i])}</td>
                                     <td><button class="btn btn-sm btn-outline-primary" onclick="downloadMyExcelFromServer(this.id)" id="${dataList.data[0][i]}" >Download</button></td>
                                     </tr>`
                }
                tableHtml +=  `</tbody>
                                        </table>`
                resultDiv.innerHTML = tableHtml
                console.log(tableHtml)
            }
        } else {
            console.log("Response not OK:", response.status, response.statusText);
        }
    } catch (error) {
        console.log("Error while checking if the Excel exists:", error);
    }
})
function getMonthAndYearFromDate(inputDate) {
    const dateObject = new Date(inputDate);
    if (isNaN(dateObject.getTime())) {
        return "Invalid Date";
    }
    const month = dateObject.toLocaleString('default', { month: 'long' }); // Full month name
    const year = dateObject.getFullYear();
    return `${month} ${year}`;
}

async function downloadMyExcelFromServer(date){
    const formData = new FormData();
    formData.append('dateInput',date);
    try {
        const response = await fetch(`http://${port}/api/getAExcelFromServer`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            const dataList = await response.json();
            console.log(dataList.data)
           
        } else {
            console.log("Response not OK:", response.status, response.statusText);
        }
    } catch (error) {
        console.log("Error while checking if the Excel exists:", error);
    }
}








// async function eventListnerForDownload(idMonth){
//     const yearInput = document.getElementById('yearInput').value 
//     let Year = new Date()
//     let currentYear = Year.getFullYear()
//     let dataList = ""
//     if(yearInput && yearInputGlobal.value >= 2021 && yearInputGlobal.value <= currentYear){
//         console.log(yearInput)
//         console.log(idMonth)
//         const apiUrl = `http://${port}/api/getAExcelFromServer`;
//         await fetch(apiUrl,{body:{"year":`${yearInput}`,"month":`${idMonth}`},method:'POST'})
//           .then((response) => {
//             if (!response.ok) {
//               throw new Error("Network response was not ok");
//             }
//             return response.json();
//           })
//           .then((d) => {
//             dataList = d;
//         })
//         .catch((error) => {
//             console.error("There was a problem with the fetch operation:", error);
//           });
//         // TODO :  Make Excel Download
//           console.log(dataList)
//     }else{
//         const someMessageToShow = document.getElementById('someMessageToShow');
//         someMessageToShow.innerHTML = ''
//         someMessageToShow.innerHTML =    `<div class="alert alert-danger alert-dismissible fade show mt-2 alert-sm" role="alert">
//                                             <strong>Holy guacamole!</strong> You should select a valid year first(2021 - ${currentYear+1}).
//                                             <button type="button" class="close" data-dismiss="alert" aria-label="Close">
//                                                 <span aria-hidden="true">&times;</span>
//                                             </button>
//                                         </div>`
//         return;
//     }
// }



//  const yearInputGlobal = document.getElementById('yearInput');
//  yearInputGlobal.addEventListener('change',async ()=>{
//     const someMessageToShow = document.getElementById('someMessageToShow');
//     let Year = new Date()
//     let currentYear = Year.getFullYear()
//     someMessageToShow.innerHTML = ''
//     if(yearInputGlobal.value < 2021 || yearInputGlobal.value > currentYear){
//         someMessageToShow.innerHTML = `<div class="alert alert-danger alert-dismissible fade show mt-2 alert-sm" role="alert">
//         <strong>Holy guacamole!</strong> You should select a year greater that 2021 and less than ${currentYear+1}.
//         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
//             <span aria-hidden="true">&times;</span>
//         </button>
//     </div>`
//     }else{
//         //correct input //correct input 
//         const apiUrl = `http://${port}/api/getTheExcelPresentListByYear`;
//         await fetch(apiUrl,{body:{"year":`${currentYear}`} })
//           .then((response) => {
//             if (!response.ok) {
//               throw new Error("Network response was not ok");
//             }
//             return response.json();
//           })
//           .then((d) => {
//             dataList = d;
//         })
//         .catch((error) => {
//             console.error("There was a problem with the fetch operation:", error);
//           });
//           //now you shoud have list of dates on which excel is present in dataList 
//           //assuming it to be {"data":['','','','','','']}
//           const insertDiv = document.getElementById("bodyOfTable");
//           insertDiv.innerHTML += ``
//           insertDiv.innerHTML += `<table class="table table-striped">
//           <thead>
//             <tr>
//               <th scope="col">S.No.</th>
//               <th scope="col">Month</th>
//               <th scope="col">Download</th>
//             </tr>
//           </thead>
//           <tbody>`
//           for( let i = 0 ; i < dataList.size() ; i++ ){
//               insertDiv.innerHTML = `<tr>
//               <th scope="row">${i+1}</th>
//               <td>${dataList[0][i]}</td>
//               <td><button class="btn btn-sm btn-outline-primary" id="${dataList[0][i]}" >Download</button></td>
//               </tr>`
//           }
//         insertDiv.innerHTML += `</tbody></table>`
//     }
//  })
//  yearInputGlobal.addEventListener('click',()=>{
//     const someMessageToShow = document.getElementById('someMessageToShow');
//     someMessageToShow.innerHTML = ''
//  })
//  yearInputGlobal.addEventListener('input',()=>{
//     const someMessageToShow = document.getElementById('someMessageToShow');
//     someMessageToShow.innerHTML = ''
//  })