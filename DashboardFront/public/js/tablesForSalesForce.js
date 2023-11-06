let myGridTotalSalesEmails = ""
let myGridTotalSalesAbsentEmails = ""
let myGridTotalCompanyType1 = ""
let myGridTotalCompanyType2 = ""
let myGridTotalCompanyType3 = ""
let myGridTotalClientStatus = ""
let myGridTotalRlaStatus = ""


let ExportTotalEmailsSalesGrid;
const onGridReadyExportTotalEmailsSalesGrid = params=>{
  ExportTotalEmailsSalesGrid = params.api;
}
const onExportClickExportTotalEmailsSalesGrid=()=>{
  ExportTotalEmailsSalesGrid.exportDataAsCsv();
}
let ExportTotalEmailsSalesAbsentGrid;
const onGridReadyExportTotalEmailsSalesAbsentGrid = params=>{
  ExportTotalEmailsSalesAbsentGrid = params.api;
}
const onExportClickExportTotalEmailsAbsentSalesGrid=()=>{
  ExportTotalEmailsSalesAbsentGrid.exportDataAsCsv();
}
async function gridTotalEmailsSales(){
        const formForSalesForce = document.getElementById('formForSalesForce');
        const formData = new FormData(formForSalesForce);
        dataList = "";
        const apiUrl = `http://${port}/api/salesForceTableEmailsPresent`;
        await fetch(apiUrl , {method:'POST',body:formData})
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((d) => {
            dataList = d;
            console.log(d);
          })
          .catch((error) => {
            console.error("There was a problem with the fetch operation:", error);
          });
        //TAble 01
        const columnDefs = [
          { field: "Name", filter: true ,flex:1},
          {field:"Email", filter:true,flex:1},
          { field: "DateJoined", filter: true ,flex:1},
          { field: "company", filter: true ,flex:1},
          { field: "company_type", filter: true }
        ];
      
        function dataforrow(dataList) {
          const hello = dataList.map((entry) => ({
            Name: `${entry[0]} ${entry[1]}`,
            Email:entry[2],
            DateJoined: new Date(entry[3]),
            company: entry[4],
            company_type: entry[5],
          }));
          return hello; 
        }
        const rowDataAll = dataforrow(dataList["data"]);
        const gridOptionsAll = {
          columnDefs: columnDefs,
          rowData: rowDataAll,
          pagination: true,
          animateRows: true,
          paginationPageSize: 25,
          onGridReady :onGridReadyExportTotalEmailsSalesGrid
        };
        if (myGridTotalSalesEmails) {
            myGridTotalSalesEmails.destroy();
        }
        // setup the grid after the page has finished loading
        const gridDiv = document.querySelector("#myGridUserAllEmails");
        myGridTotalSalesEmails = new agGrid.Grid(gridDiv, gridOptionsAll);
        myGridTotalSalesEmails = gridOptionsAll.api;
      
}
async function gridTotalAbsentEmails(){
        const formForSalesForce = document.getElementById('formForSalesForce');
        const formData = new FormData(formForSalesForce);
        dataList = "";
        const apiUrl = `http://${port}/api/salesForceTableEmailsAbsent`;
        await fetch(apiUrl , {method:'POST',body:formData})
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((d) => {
            dataList = d;
            console.log(d);
          })
          .catch((error) => {
            console.error("There was a problem with the fetch operation:", error);
          });
        //TAble 01
        const columnDefs = [
          {field:"Email", filter:true,flex:1},
        ];
      
        function dataforrow(dataList) {
          const hello = dataList.map((entry) => ({
            Email:entry[0]
          }));
          return hello; 
        }
        const rowDataAll = dataforrow(dataList["data"]);
        const gridOptionsAll = {
          columnDefs: columnDefs,
          rowData: rowDataAll,
          pagination: true,
          animateRows: true,
          paginationPageSize: 25,
          onGridReady :onGridReadyExportTotalEmailsSalesAbsentGrid
        };
        if (myGridTotalSalesAbsentEmails) {
            myGridTotalSalesAbsentEmails.destroy();
        }
        // setup the grid after the page has finished loading
        const gridDiv = document.querySelector("#myGridUserAllEmailsAbsent");
        myGridTotalSalesAbsentEmails = new agGrid.Grid(gridDiv, gridOptionsAll);
        myGridTotalSalesAbsentEmails = gridOptionsAll.api;
      
}
async function showTableEmails(){
    mainWrapper = document.getElementById("mainWrapperSalesReport");
    TableContainerTotalEmails = document.getElementById("TableContainerEmails");
    mainWrapper.classList.toggle('showingIt');
    TableContainerTotalEmails.classList.toggle('showingIt');
    if(!myGridTotalSalesEmails)
    await gridTotalEmailsSales();
    if(!myGridTotalSalesAbsentEmails)
    await gridTotalAbsentEmails();
}
TableContainerTotalEmails = document.getElementById("TableContainerEmails");
BackMainContentTotalEmails = document.getElementById("BackMainContentEmails");
BackMainContentTotalEmails.addEventListener('click',function(){
    mainWrapper.classList.toggle('showingIt');   
    TableContainerTotalEmails.classList.toggle('showingIt');   
})




let ExportTotalCompanyTypeGrid1 = "";
const onGridReadyExportTotalCompanyTypeGrid1 = params=>{
  ExportTotalCompanyTypeGrid1 = params.api;
}
const onExportClickExportTotalCompanyTypeGrid1=()=>{
  ExportTotalCompanyTypeGrid1.exportDataAsCsv();
}
async function gridTotalCompanyType1(dataList){
    //TAble 01
    const columnDefs = [
      { field: "Name", filter: true ,flex:1},
      {field:"Email", filter:true,flex:1},
      { field: "DateJoined", filter: true ,flex:1},
      { field: "company", filter: true ,flex:1},
      { field: "company_type", filter: true }
    ];
  
    function dataforrow(dataList) {
      const hello = dataList.map((entry) => ({
        Name: `${entry[0]} ${entry[1]}`,
        Email:entry[2],
        DateJoined: new Date(entry[3]),
        company: entry[4],
        company_type: entry[5],
      }));
      return hello; 
    }
    const rowDataAll = dataforrow(dataList["data1"]);
    const gridOptionsAll = {
      columnDefs: columnDefs,
      rowData: rowDataAll,
      pagination: true,
      animateRows: true,
      paginationPageSize: 25,
      onGridReady :onGridReadyExportTotalCompanyTypeGrid1
    };
    if (myGridTotalCompanyType1) {
        myGridTotalCompanyType1.destroy();
    }
    // setup the grid after the page has finished loading
    const gridDiv = document.querySelector("#myGridUserAllCompanyType1");
    myGridTotalCompanyType1 = new agGrid.Grid(gridDiv, gridOptionsAll);
    myGridTotalCompanyType1 = gridOptionsAll.api;
}
let ExportTotalCompanyTypeGrid2 = "";
const onGridReadyExportTotalCompanyTypeGrid2 = params=>{
  ExportTotalCompanyTypeGrid2 = params.api;
}
const onExportClickExportTotalCompanyTypeGrid2=()=>{
  ExportTotalCompanyTypeGrid2.exportDataAsCsv();
}
async function gridTotalCompanyType2(dataList){
    //TAble 01
    const columnDefs = [
      { field: "Name", filter: true ,flex:1},
      {field:"Email", filter:true,flex:1},
      { field: "DateJoined", filter: true ,flex:1},
      { field: "company", filter: true ,flex:1},
      { field: "company_type", filter: true }
    ];
  
    function dataforrow(dataList) {
      const hello = dataList.map((entry) => ({
        Name: `${entry[0]} ${entry[1]}`,
        Email:entry[2],
        DateJoined: new Date(entry[3]),
        company: entry[4],
        company_type: entry[5],
      }));
      return hello; 
    }
    const rowDataAll = dataforrow(dataList["data2"]);
    const gridOptionsAll = {
      columnDefs: columnDefs,
      rowData: rowDataAll,
      pagination: true,
      animateRows: true,
      paginationPageSize: 25,
      onGridReady :onGridReadyExportTotalCompanyTypeGrid2
    };
    if (myGridTotalCompanyType2) {
        myGridTotalCompanyType2.destroy();
    }
    // setup the grid after the page has finished loading
    const gridDiv = document.querySelector("#myGridUserAllCompanyType2");
    myGridTotalCompanyType2 = new agGrid.Grid(gridDiv, gridOptionsAll);
    myGridTotalCompanyType2 = gridOptionsAll.api;
}
let ExportTotalCompanyTypeGrid3 = "";
const onGridReadyExportTotalCompanyTypeGrid3 = params=>{
  ExportTotalCompanyTypeGrid3 = params.api;
}
const onExportClickExportTotalCompanyTypeGrid3=()=>{
  ExportTotalCompanyTypeGrid3.exportDataAsCsv();
}
function gridTotalCompanyType3(dataList){
    //TAble 01
    const columnDefs = [
      { field: "Name", filter: true ,flex:1},
      {field:"Email", filter:true,flex:1},
      { field: "DateJoined", filter: true ,flex:1},
      { field: "company", filter: true ,flex:1},
      { field: "company_type", filter: true }
    ];
  
    function dataforrow(dataList) {
      const hello = dataList.map((entry) => ({
        Name: `${entry[0]} ${entry[1]}`,
        Email:entry[2],
        DateJoined: new Date(entry[3]),
        company: entry[4],
        company_type: entry[5],
      }));
      return hello; 
    }
    const rowDataAll = dataforrow(dataList["data3"]);
    const gridOptionsAll = {
      columnDefs: columnDefs,
      rowData: rowDataAll,
      pagination: true,
      animateRows: true,
      paginationPageSize: 25,
      onGridReady :onGridReadyExportTotalCompanyTypeGrid3
    };
    if (myGridTotalCompanyType3) {
        myGridTotalCompanyType3.destroy();
    }
    // setup the grid after the page has finished loading
    const gridDiv = document.querySelector("#myGridUserAllCompanyType3");
    myGridTotalCompanyType3 = new agGrid.Grid(gridDiv, gridOptionsAll);
    myGridTotalCompanyType3 = gridOptionsAll.api;
}
async function showTableCompanyType(){
    console.log("Hello")
    mainWrapper = document.getElementById("mainWrapperSalesReport");
    TableContainerTotalCompanytype = document.getElementById("TableContainerCompanyType");
    mainWrapper.classList.toggle('showingIt');
    TableContainerTotalCompanytype.classList.toggle('showingIt');
    const formForSalesForce = document.getElementById('formForSalesForce');
    const formData = new FormData(formForSalesForce);
    dataList = "";
    const apiUrl = `http://${port}/api/salesForceTableCompanyTypes`;
    await fetch(apiUrl , {method:'POST',body:formData})
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((d) => {
        dataList = d;
        console.log(d);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
    if(!myGridTotalCompanyType1)
    gridTotalCompanyType1(dataList);
    if(!myGridTotalCompanyType2)
    gridTotalCompanyType2(dataList);
    if(!myGridTotalCompanyType3)
    gridTotalCompanyType3(dataList);
}
TableContainerTotalCompanytype = document.getElementById("TableContainerCompanyType");
BackMainContentTotalCompanytype = document.getElementById("BackMainContentCompanyType");
BackMainContentTotalCompanytype.addEventListener('click',function(){
    mainWrapper.classList.toggle('showingIt');   
    TableContainerTotalCompanytype.classList.toggle('showingIt');   
})




let ExportTotalClientStatusGrid = "";
const onGridReadyExportTotalClientStatusGrid = params=>{
  ExportTotalClientStatusGrid = params.api;
}
const onExportClickExportTotalClientStatusGrid=()=>{
  ExportTotalClientStatusGrid.exportDataAsCsv();
}
async function gridTotalClientStatus(){
    const formForSalesForce = document.getElementById('formForSalesForce');
    const formData = new FormData(formForSalesForce);
    dataList = "";
    let dateToQueryData = document.getElementById('inputClientStatusMonth').value;
    dateToQueryData = dateToQueryData+"-"+"01";
    formData.append("dateToQuery",dateToQueryData);
    const apiUrl = `http://${port}/api/salesForceTableActivePassiveContractors`;
    await fetch(apiUrl , {method:'POST',body:formData})
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((d) => {
        dataList = d;
        console.log(d);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
    //TAble 01
    const columnDefs = [
      { field: "Name", filter: true ,flex:1},
      {field:"Email", filter:true,flex:1},
      { field: "DateJoined", filter: true ,flex:1},
      { field: "company", filter: true ,flex:1},
      { field: "company_type", filter: true },
      {filed: "company_status",filter:true }
    ];
  
    function dataforrow(dataList) {
      const hello = dataList.map((entry) => ({
        Name: `${entry[0]} ${entry[1]}`,
        Email:entry[2],
        DateJoined: new Date(entry[3]),
        company: entry[4],
        company_type: entry[5],
        company_status :entry[6]
      }));
      return hello; 
    }
    const rowDataAll = dataforrow(dataList["data"]);
    const gridOptionsAll = {
      columnDefs: columnDefs,
      rowData: rowDataAll,
      pagination: true,
      animateRows: true,
      paginationPageSize: 25,
      onGridReady :onGridReadyExportTotalClientStatusGrid
    };
    if (myGridTotalClientStatus) {
        myGridTotalClientStatus.destroy();
    }
    // setup the grid after the page has finished loading
    const gridDiv = document.querySelector("#myGridUserAllClientStatus");
    myGridTotalClientStatus = new agGrid.Grid(gridDiv, gridOptionsAll);
    myGridTotalClientStatus = gridOptionsAll.api;
}
function showTableClientStatus(){
    mainWrapper = document.getElementById("mainWrapperSalesReport");
    TableContainerTotalClientStatus = document.getElementById("TableContainerClientStatus");
    mainWrapper.classList.toggle('showingIt');
    TableContainerTotalClientStatus.classList.toggle('showingIt');
    if(!myGridTotalClientStatus)
    gridTotalClientStatus();
}
TableContainerTotalClientStatus = document.getElementById("TableContainerClientStatus");
BackMainContentTotalClientStatus = document.getElementById("BackMainContentClientStatus");
BackMainContentTotalClientStatus.addEventListener('click',function(){
    mainWrapper.classList.toggle('showingIt');   
    TableContainerTotalClientStatus.classList.toggle('showingIt');   
})




let ExportRlaStatusGrid = "";
const onGridReadyExportRlaStatusGrid = params=>{
  ExportRlaStatusGrid = params.api;
}
const onExportClickExportRlaStatusGrid=()=>{
  ExportRlaStatusGrid.exportDataAsCsv();
}
async function gridTotalRlaStatus(){
    const formForSalesForce = document.getElementById('formForSalesForce');
    const formData = new FormData(formForSalesForce);
    dataList = "";
    let dateToQueryData = document.getElementById('inputRlaStatusMonth').value;
    dateToQueryData = dateToQueryData+"-"+"01";
    formData.append("dateToQuery",dateToQueryData);
    const apiUrl = `http://${port}/api/salesForceTableRlaStatus`;
    await fetch(apiUrl , {method:'POST',body:formData})
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((d) => {
        dataList = d;
        console.log(d);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
    //TAble 01
    const columnDefs = [
      { field: "Name", filter: true ,flex:1},
      {field:"Email", filter:true,flex:1},
      { field: "DateJoined", filter: true ,flex:1},
      { field: "company", filter: true ,flex:1},
      { field: "company_type", filter: true },
      {field:"reconciliation_status",filter:true}
    ];
  
    function dataforrow(dataList) {
      const hello = dataList.map((entry) => ({
        Name: `${entry[0]} ${entry[1]}`,
        Email:entry[2],
        DateJoined: new Date(entry[3]),
        company: entry[4],
        company_type: entry[5],
        reconciliation_status: entry[6]
      }));
      return hello; 
    }
    const rowDataAll = dataforrow(dataList["data"]);
    const gridOptionsAll = {
      columnDefs: columnDefs,
      rowData: rowDataAll,
      pagination: true,
      animateRows: true,
      paginationPageSize: 25,
      onGridReady :onGridReadyExportRlaStatusGrid
    };
    if (myGridTotalRlaStatus) {
        myGridTotalRlaStatus.destroy();
    }
    // setup the grid after the page has finished loading
    const gridDiv = document.querySelector("#myGridUserAllRlaStatus");
    myGridTotalRlaStatus = new agGrid.Grid(gridDiv, gridOptionsAll);
    myGridTotalRlaStatus = gridOptionsAll.api;
}
function showTableRlaStatus(){
    mainWrapper = document.getElementById("mainWrapperSalesReport");
    TableContainerTotalRlaStatus = document.getElementById("TableContainerRlaStatus");
    mainWrapper.classList.toggle('showingIt');
    TableContainerTotalRlaStatus.classList.toggle('showingIt');
    if(!myGridTotalRlaStatus)
    gridTotalRlaStatus();
}
TableContainerTotalRlaStatus = document.getElementById("TableContainerRlaStatus");
BackMainContentTotalRlaStatus = document.getElementById("BackMainContentRlaStatus");
BackMainContentTotalRlaStatus.addEventListener('click',function(){
    mainWrapper.classList.toggle('showingIt');   
    TableContainerTotalRlaStatus.classList.toggle('showingIt');   
})
