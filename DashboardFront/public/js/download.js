const januaryData = document.getElementById("01");
januaryData.addEventListener('click',async()=>{
    eventListnerForDownload("01")
})
const febData = document.getElementById("02");
febData.addEventListener('click',async()=>{
    eventListnerForDownload("02")
})
const marchData = document.getElementById("03");
marchData.addEventListener('click',async()=>{
    eventListnerForDownload("03")
})
const aprilData = document.getElementById("04");
aprilData.addEventListener('click',async()=>{
    eventListnerForDownload("04")
})
const mayData = document.getElementById("05");
mayData.addEventListener('click',async()=>{
    eventListnerForDownload("05")
})
const juneData = document.getElementById("06");
juneData.addEventListener('click',async()=>{
    eventListnerForDownload("06")
})
const julyData = document.getElementById("07");
julyData.addEventListener('click',async()=>{
    eventListnerForDownload("07")
})
const augustData = document.getElementById("08");
augustData.addEventListener('click',async()=>{
    eventListnerForDownload("08")
})
const septemberData = document.getElementById("09");
septemberData.addEventListener('click',async()=>{
    eventListnerForDownload("09")
})
const octoberData = document.getElementById("10");
octoberData.addEventListener('click',async()=>{
    eventListnerForDownload("10")
})
const novData = document.getElementById("11");
novData.addEventListener('click',async()=>{
    eventListnerForDownload("11")
})
const decData = document.getElementById("12");
decData.addEventListener('click',async()=>{
    eventListnerForDownload("12")
})


async function eventListnerForDownload(idMonth){
    const yearInput = document.getElementById('yearInput').value 
    let Year = new Date()
    let currentYear = Year.getFullYear()
    let dataList = ""
    if(yearInput && yearInputGlobal.value >= 2021 && yearInputGlobal.value <= currentYear){
        console.log(yearInput)
        console.log(idMonth)
        const apiUrl = `http://${port}/api/getAExcelFromServer`;
        await fetch(apiUrl,{body:{"year":`${yearInput}`,"month":`${idMonth}`},method:'POST'})
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
        // TODO :  Make Excel Download
          console.log(dataList)
    }else{
        const someMessageToShow = document.getElementById('someMessageToShow');
        someMessageToShow.innerHTML = ''
        someMessageToShow.innerHTML =    `<div class="alert alert-danger alert-dismissible fade show mt-2 alert-sm" role="alert">
                                            <strong>Holy guacamole!</strong> You should select a valid year first(2021 - ${currentYear+1}).
                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>`
        return;
    }
}



 const yearInputGlobal = document.getElementById('yearInput');
 yearInputGlobal.addEventListener('change',()=>{
    const someMessageToShow = document.getElementById('someMessageToShow');
    let Year = new Date()
    let currentYear = Year.getFullYear()
    someMessageToShow.innerHTML = ''
    if(yearInputGlobal.value < 2021 || yearInputGlobal.value > currentYear){
        someMessageToShow.innerHTML = `<div class="alert alert-danger alert-dismissible fade show mt-2 alert-sm" role="alert">
        <strong>Holy guacamole!</strong> You should select a year greater that 2021 and less than ${currentYear+1}.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>`
    }
 })
 yearInputGlobal.addEventListener('click',()=>{
    const someMessageToShow = document.getElementById('someMessageToShow');
    someMessageToShow.innerHTML = ''
 })
 yearInputGlobal.addEventListener('input',()=>{
    const someMessageToShow = document.getElementById('someMessageToShow');
    someMessageToShow.innerHTML = ''
 })