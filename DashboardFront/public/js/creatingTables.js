// User By month table
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
let myUserByMonthGrid = 0;
let myGridUmbrella = "";
let myGridDocRecMisstableOne = "";
let myGridDocRecMisstableTwo = "";
let myGridagency = "";
let myGridB10 = "";
let myGridbankDetails = "";
let myGrididpal = "";
let myGridpps = "";
let myGridtandc = "";
let myGridUniqueconPer = "";
let myGridUserAllNoMag = "";
let myGridAllConPaid = "";
let myGridstartTwoTwo = "";
let myGridStartOne = "";
let myGridUserAllMonInvo = "";
let myGridUserAllPlcPerAccountManager = "";
// 
let ExportmyUserByMonthGrid;
const onGridReadyExportmyUserByMonthGrid = params=>{
  ExportmyUserByMonthGrid = params.api;
}
const onExportClickExportmyUserByMonthGrid=()=>{
  ExportmyUserByMonthGrid.exportDataAsCsv();
}
// 
let ExportmyGridUmbrella;
const onGridReadyExportmyGridUmbrella = params=>{
  ExportmyGridUmbrella = params.api;
}
const onExportClickExportmyGridUmbrella=()=>{
  ExportmyGridUmbrella.exportDataAsCsv();
}
// 
let ExportmyGridDocRecMisstableOne;
const onGridReadyExportmyGridDocRecMisstableOne = params=>{
  ExportmyGridDocRecMisstableOne = params.api;
}
const onExportClickExportmyGridDocRecMisstableOne=()=>{
  ExportmyGridDocRecMisstableOne.exportDataAsCsv();
}
// 
let ExportmyGridDocRecMisstableTwo;
const onGridReadyExportmyGridDocRecMisstableTwo = params=>{
  ExportmyGridDocRecMisstableTwo = params.api;
}
const onExportClickExportmyGridDocRecMisstableTwo=()=>{
  ExportmyGridDocRecMisstableTwo.exportDataAsCsv();
}
//
let ExportmyGridagency;
const onGridReadyExportmyGridagency = params=>{
  ExportmyGridagency = params.api;
}
const onExportClickExportmyGridagency=()=>{
  ExportmyGridagency.exportDataAsCsv();
}
// 
let ExportmyGridB10;
const onGridReadyExportmyGridB10 = params=>{
  ExportmyGridB10 = params.api;
}
const onExportClickExportmyGridB10=()=>{
  ExportmyGridB10.exportDataAsCsv();
}

// 
let ExportmyGrididpal;
const onGridReadyExportmyGrididpal = params=>{
  ExportmyGrididpal = params.api;
}
const onExportClickExportmyGrididpal=()=>{
  ExportmyGrididpal.exportDataAsCsv();
}
//
let ExportmyGridpps;
const onGridReadyExportmyGridpps = params=>{
  ExportmyGridpps = params.api;
}
const onExportClickExportmyGridpps=()=>{
  ExportmyGridpps.exportDataAsCsv();
}
//
let ExportmyGridtandc;
const onGridReadyExportmyGridtandc = params=>{
  ExportmyGridtandc = params.api;
}
const onExportClickExportmyGridtandc=()=>{
  ExportmyGridtandc.exportDataAsCsv();
}
//
let ExportmyGridUniqueconPer;
const onGridReadyExportmyGridUniqueconPer = params=>{
  ExportmyGridUniqueconPer = params.api;
}
const onExportClickExportmyGridUniqueconPer=()=>{
  ExportmyGridUniqueconPer.exportDataAsCsv();
}
//
let ExportmyGridUserAllNoMag;
const onGridReadyExportmyGridUserAllNoMag = params=>{
  ExportmyGridUserAllNoMag = params.api;
}
const onExportClickExportmyGridUserAllNoMag=()=>{
  ExportmyGridUserAllNoMag.exportDataAsCsv();
}
//
let ExportmyGridAllConPaid;
const onGridReadyExportmyGridAllConPaid = params=>{
  ExportmyGridAllConPaid = params.api;
}
const onExportClickExportmyGridAllConPaid=()=>{
  ExportmyGridAllConPaid.exportDataAsCsv();
}
//
let ExportmyGridUserAllMonInvo;
const onGridReadyExportmyGridUserAllMonInvo = params=>{
  ExportmyGridUserAllMonInvo = params.api;
}
const onExportClickExportmyGridUserAllMonInvo=()=>{
  ExportmyGridUserAllMonInvo.exportDataAsCsv();
}
//
let ExportmyGridPlcPerAccountManager;
const onGridReadyExportymGridPlcPerAccountManager = params=>{
  ExportmyGridPlcPerAccountManager = params.api;
}
const onExportClickExportmyGridPlcPerAccountManager=()=>{
  ExportmyGridPlcPerAccountManager.exportDataAsCsv();
}

async function userByMonthTable() {
  dataList = "";
  const startDate = document.getElementById("startdateuserByMonthTable").value;
  const endDate = document.getElementById("enddateuserByMonthTable").value;
  const apiUrl = `http://${port}/api/getUserByMonthTables?start=${startDate}&end=${endDate}`;
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      // console.log(d);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  //TAble 01
  const columnDefs = [
    { field: "Name", filter: true ,flex:1},
    { field: "DateJoined", filter: "agDateColumnFilter",flex:1 },
    { field: "company", filter: true ,flex:1},
    { field: "company_type", filter: true ,flex:1},
    { field: "isActive", filter: true ,flex:1},
    { field: "Email", filter: true ,flex:1},
    // {
    //   headerName: 'isActive',
    //   field: 'isActive',
    //   filter: 'agSetColumnFilter',
    //   filterParams: {
    //     values: ['0', '1'],
    //   },
    // }
  ];

  function dataforrow(dataList) {
    const hello = dataList.map((entry) => ({
      Name: `${entry[0]} ${entry[1]}`,
      DateJoined: new Date(entry[2]),
      company: entry[3],
      company_type: entry[4],
      isActive: entry[7] == "0" ? "pending" : "Active",
      Email: entry[6],
    }));
    return hello; // Return the mapped data
  }
  // specify the data
  const rowDataAll = dataforrow(dataList["all"]);

  // let the grid know which columns and what data to use
  const gridOptionsAll = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    enableFilter: true,
    onGridReady: onGridReadyExportmyUserByMonthGrid
  };
  if (myUserByMonthGrid) {
    myUserByMonthGrid.destroy();
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGridUserAll");
  myUserByMonthGrid = new agGrid.Grid(gridDiv, gridOptionsAll);
  myUserByMonthGrid = gridOptionsAll.api;
  // Table 02
  // const rowDataActive = dataforrow(dataList["active"]);

  // // let the grid know which columns and what data to use
  // const gridOptionsActive = {
  //   columnDefs: columnDefs,
  //   rowData: rowDataActive,
  //   pagination:true,
  //   animateRows:true,
  //   paginationPageSize:25,
  // };

  // // setup the grid after the page has finished loading
  // const gridDivActive = document.querySelector("#myGridActive");
  // new agGrid.Grid(gridDivActive, gridOptionsActive);

  // // Table 3

  // // specify the data
  // const rowDataPending = dataforrow(dataList["pending"]);

  // // let the grid know which columns and what data to use
  // const gridOptionsPending = {
  //   columnDefs: columnDefs,
  //   rowData: rowDataPending,
  //   pagination:true,
  //   animateRows:true,
  //   paginationPageSize:25,
  // };

  // // setup the grid after the page has finished loading
  // const gridDivPending = document.querySelector("#myGridPending");
  // new agGrid.Grid(gridDivPending, gridOptionsPending);
}


async function Umbrella() {
  dataList = "";
  const startDate = document.getElementById("startdateUmbrella").value;
  const endDate = document.getElementById("enddateUmbrella").value;
  const apiUrl = `http://${port}/api/getTotalNewJoinersPerMontTable?start=${startDate}&end=${endDate}`;
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      // console.log(d);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  //TAble 01
  const columnDefs = [
    { field: "Name", filter: true ,flex:1},
    { field: "DateJoined", filter: true ,flex:1},
    { field: "company", filter: true ,flex:1},
    { field: "company_type", filter: true }
  ];

  function dataforrow(dataList) {
    const hello = dataList.map((entry) => ({
      Name: `${entry[0]} ${entry[1]}`,
      DateJoined: new Date(entry[2]),
      company: entry[4],
      company_type: entry[5],
    }));
    return hello; // Return the mapped data
  }
  // specify the data
  const rowDataAll = dataforrow(dataList["data"]);

  // let the grid know which columns and what data to use
  const gridOptionsAll = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    onGridReady :onGridReadyExportmyGridUmbrella
  };
  if (myGridUmbrella) {
    myGridUmbrella.destroy();
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGridUserAllUmbrella");
  myGridUmbrella = new agGrid.Grid(gridDiv, gridOptionsAll);
  myGridUmbrella = gridOptionsAll.api;
}


async function DocumentsRecMissTableOne() {
  dataList = "";
  const startDate = document.getElementById("startdateDocMissRecOne").value;
  const endDate = document.getElementById("enddateDocMissRecOne").value;
  const apiUrl = `http://${port}/api/getAllDocumentRecievedTableOne?start=${startDate}&end=${endDate}`;
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      // console.log(d);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  //TAble 01
  const columnDefs = [
    { field: "Name", filter: true ,flex:1},
    { field: "Email", filter: true ,flex:1},
    { field: "DateJoined", filter: true,flex:1 },
    { field: "Company", filter: true ,flex:1},
    { field: "CompanyType", filter: true ,flex:1},
  ];

  function dataforrow(dataList) {
    const hello = dataList.map((entry) => ({
      Name: `${entry[1]} ${entry[2]}`,
      Email: entry[3],
      DateJoined: new Date(entry[4]),
      Company: entry[5],
      CompanyType: entry[6],
    }));
    return hello; // Return the mapped data
  }
  // specify the data
  const rowDataAll = dataforrow(dataList["table1"]);

  // let the grid know which columns and what data to use
  const gridOptionstable1 = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    onGridReady :onGridReadyExportmyGridDocRecMisstableOne
  };
  if (myGridDocRecMisstableTwo) {
    myGridDocRecMisstableTwo.destroy();
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGridUserAllDocumentsOne");
  myGridDocRecMisstableTwo = new agGrid.Grid(gridDiv, gridOptionstable1);
  myGridDocRecMisstableTwo = gridOptionstable1.api;
}


async function DocumentsRecMissTableTwo() {
  dataList = "";
  const startDate = document.getElementById("startdateDocMissRecTwo").value;
  const endDate = document.getElementById("enddateDocMissRecTwo").value;
  console.log(endDate, startDate);
  const apiUrl = `http://${port}/api/getAllDocumentRecievedTableTwo?start=${startDate}&end=${endDate}`;
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      // console.log(d);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  //TAble 01
  const columnDefs = [
    { field: "Name", filter: true ,flex:1},
    { field: "Email", filter: true ,flex:1},
    { field: "DateJoined", filter: true ,flex:1},
    { field: "Company", filter: true ,flex:1},
    { field: "CompanyType", filter: true ,flex:1},
  ];

  function dataforrow(dataList) {
    const hello = dataList.map((entry) => ({
      Name: `${entry[1]} ${entry[2]}`,
      Email: entry[7],
      DateJoined: new Date(entry[3]),
      Company: entry[5],
      CompanyType: entry[6],
    }));
    return hello; // Return the mapped data
  }
  // specify the data
  const rowDataAll = dataforrow(dataList["table2"]);

  // let the grid know which columns and what data to use
  const gridOptionstable1 = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    onGridReady :onGridReadyExportmyGridDocRecMisstableTwo
  };
  if (myGridDocRecMisstableOne) {
    myGridDocRecMisstableOne.destroy();
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGridUserAllDocumentsTwo");
  myGridDocRecMisstableOne = new agGrid.Grid(gridDiv, gridOptionstable1);
  myGridDocRecMisstableOne = gridOptionstable1.api;
}


async function MissingDocumentsIDpal() {
  dataList = "";
  const startDate = document.getElementById("startdateidpal").value;
  const endDate = document.getElementById("enddateidpal").value;
  const apiUrl = `http://${port}/api/getMissingDocsBarTableIDPal?start=${startDate}&end=${endDate}`;
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      // console.log(d);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  //TAble 01
  const columnDefs = [
    { field: "Name", filter: true ,flex:1},
    { field: "Email", filter: true ,flex:1},
    { field: "DateJoined", filter: true ,flex:1},
    { field: "Company", filter: true ,flex:1},
    { field: "CompanyType", filter: true,flex:1 },
  ];

  function dataforrow(dataList) {
    const hello = dataList.map((entry) => ({
      Name: `${entry[1]} ${entry[2]}`,
      Email: entry[3],
      DateJoined: new Date(entry[4]),
      Company: entry[5],
      CompanyType: entry[6],
    }));
    return hello; // Return the mapped data
  }
  // specify the data
  const rowDataAll = dataforrow(dataList["data"]);

  // let the grid know which columns and what data to use
  const gridOptionstable1 = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    onGridReady : onGridReadyExportmyGrididpal
  };
  if (myGrididpal) {
    myGrididpal.destroy();
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGrididpal");
  myGrididpal = new agGrid.Grid(gridDiv, gridOptionstable1);
  myGrididpal = gridOptionstable1.api;
}


async function MissingDocumentsagency() {
  dataList = "";
  const startDate = document.getElementById("startdateagency").value;
  const endDate = document.getElementById("enddateagency").value;
  console.log(endDate, startDate);
  const apiUrl = `http://${port}/api/getMissingDocsBarTableagency?start=${startDate}&end=${endDate}`;
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      // console.log(d);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  //TAble 01
  const columnDefs = [
    { field: "Name", filter: true ,flex:1},
    { field: "Email", filter: true ,flex:1},
    { field: "DateJoined", filter: true,flex:1 },
    { field: "Company", filter: true ,flex:1},
    { field: "CompanyType", filter: true ,flex:1},
  ];

  function dataforrow(dataList) {
    const hello = dataList.map((entry) => ({
      Name: `${entry[1]} ${entry[2]}`,
      Email: entry[3],
      DateJoined: new Date(entry[4]),
      Company: entry[5],
      CompanyType: entry[6],
    }));
    return hello; // Return the mapped data
  }
  // specify the data
  const rowDataAll = dataforrow(dataList["data"]);

  // let the grid know which columns and what data to use
  const gridOptionstable1 = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    onGridReady : onGridReadyExportmyGridagency
  };
  if (myGridagency) {
    myGridagency.destroy();
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGridUseragency");
  myGridagency = new agGrid.Grid(gridDiv, gridOptionstable1);
  myGridagency = gridOptionstable1.api;
}


async function MissingDocumentspps() {
  dataList = "";
  const startDate = document.getElementById("startdatepps").value;
  const endDate = document.getElementById("enddatepps").value;
  console.log(endDate, startDate);
  const apiUrl = `http://${port}/api/getMissingDocsBarTablepps?start=${startDate}&end=${endDate}`;
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      // console.log(d);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  //TAble 01
  const columnDefs = [
    { field: "Name", filter: true ,flex:1},
    { field: "Email", filter: true,flex:1 },
    { field: "DateJoined", filter: true ,flex:1},
    { field: "Company", filter: true ,flex:1},
    { field: "CompanyType", filter: true ,flex:1},
  ];

  function dataforrow(dataList) {
    const hello = dataList.map((entry) => ({
      Name: `${entry[1]} ${entry[2]}`,
      Email: entry[3],
      DateJoined: new Date(entry[4]),
      Company: entry[5],
      CompanyType: entry[6],
    }));
    return hello; // Return the mapped data
  }
  // specify the data
  const rowDataAll = dataforrow(dataList["data"]);

  // let the grid know which columns and what data to use
  const gridOptionstable1 = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    onGridReady : onGridReadyExportmyGridpps
  };
  if (myGridpps) {
    myGridpps.destroy();
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGridUserpps");
  myGridpps = new agGrid.Grid(gridDiv, gridOptionstable1);
  myGridpps = gridOptionstable1.api;
}


async function MissingDocumentsbankdetails() {
  dataList = "";
  const startDate = document.getElementById("startdatebankDetails").value;
  const endDate = document.getElementById("enddatebankDetails").value;
  console.log(endDate, startDate);
  const apiUrl = `http://${port}/api/getMissingDocsBarTablebankDetails?start=${startDate}&end=${endDate}`;
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      // console.log("Here")
      // console.log(d);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  //TAble 01
  const columnDefs = [
    { field: "Name", filter: true ,flex:1},
    { field: "Email", filter: true ,flex:1},
    { field: "DateJoined", filter: true,flex:1 },
    { field: "Company", filter: true ,flex:1},
    { field: "CompanyType", filter: true ,flex:1},
  ];

  function dataforrow(dataList) {
    const hello = dataList.map((entry) => ({
      Name: `${entry[1]} ${entry[2]}`,
      Email: entry[3],
      DateJoined: new Date(entry[4]),
      Company: entry[5],
      CompanyType: entry[6],
    }));
    return hello; // Return the mapped data
  }
  // specify the data
  const rowDataAll = dataforrow(dataList["data"]);

  // let the grid know which columns and what data to use
  const gridOptionstable1 = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    onGridReady :{onGridReady}
  };
  console.log("Hello");
  if (myGridbankDetails) {
    // console.log("Destoying")
    myGridbankDetails.destroy();
    // return;
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGridUserbankdetails");
  myGridbankDetails = new agGrid.Grid(gridDiv, gridOptionstable1);
  myGridbankDetails = gridOptionstable1.api;
}
// MissingDocumentsbankdetails();

async function MissingDocumentsB10() {
  dataList = "";
  const startDate = document.getElementById("startdateb10").value;
  const endDate = document.getElementById("enddateb10").value;
  console.log(endDate, startDate);
  const apiUrl = `http://${port}/api/getMissingDocsBarTableb10?start=${startDate}&end=${endDate}`;
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      // console.log(d);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  //TAble 01
  const columnDefs = [
    { field: "Name", filter: true ,flex:1},
    { field: "Email", filter: true ,flex:1},
    { field: "DateJoined", filter: true ,flex:1},
    { field: "Company", filter: true ,flex:1},
    { field: "CompanyType", filter: true ,flex:1},
  ];

  function dataforrow(dataList) {
    const hello = dataList.map((entry) => ({
      Name: `${entry[1]} ${entry[2]}`,
      Email: entry[3],
      DateJoined: new Date(entry[4]),
      Company: entry[5],
      CompanyType: entry[6],
    }));
    return hello; // Return the mapped data
  }
  // specify the data
  const rowDataAll = dataforrow(dataList["data"]);

  // let the grid know which columns and what data to use
  const gridOptionstable1 = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    onGridReady : onGridReadyExportmyGridB10
  };
  if (myGridB10) {
    myGridB10.destroy();
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGridUserb10");
  myGridB10 = new agGrid.Grid(gridDiv, gridOptionstable1);
  myGridB10 = gridOptionstable1.api;
}


async function MissingDocumentstandc() {
  dataList = "";
  const startDate = document.getElementById("startdatetandc").value;
  const endDate = document.getElementById("enddatetandc").value;
  console.log(endDate, startDate);
  const apiUrl = `http://${port}/api/getMissingDocsBarTabletandc?start=${startDate}&end=${endDate}`;
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      // console.log(d);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  //TAble 01
  const columnDefs = [
    { field: "Name", filter: true ,flex:1},
    { field: "Email", filter: true ,flex:1},
    { field: "DateJoined", filter: true,flex:1 },
    { field: "Company", filter: true,flex:1 },
    { field: "CompanyType", filter: true ,flex:1},
  ];

  function dataforrow(dataList) {
    const hello = dataList.map((entry) => ({
      Name: `${entry[1]} ${entry[2]}`,
      Email: entry[3],
      DateJoined: new Date(entry[4]),
      Company: entry[5],
      CompanyType: entry[6],
    }));
    return hello; // Return the mapped data
  }
  // specify the data
  const rowDataAll = dataforrow(dataList["data"]);

  // let the grid know which columns and what data to use
  const gridOptionstable1 = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    onGridReady: onGridReadyExportmyGridtandc
  };
  if (myGridtandc) {
    myGridtandc.destroy();
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGridUsertandc");
  myGridtandc = new agGrid.Grid(gridDiv, gridOptionstable1);
  myGridtandc = gridOptionstable1.api;
}


async function UniqueConPerMontPerMonthUmbrella() {
  dataList = "";
  const startDate = document.getElementById("startdateuniquepaid").value;
  const endDate = document.getElementById("enddateuniquepaid").value;
  const apiUrl = `http://${port}/api/getTotalUniqueContratorPaidPerMonthTable?start=${startDate}&end=${endDate}`;
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      // console.log(d);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  //TAble 01
  const columnDefs = [
    { field: "Name", filter: true ,flex:1},
    { field: "Email", filter: true ,flex:1},
    { field: "ContractorDateJoined", filter: true ,flex:1},
    { field: "Company", filter: true ,flex:1},
    { field: "CompanyType", filter: true ,flex:1},
  ];

  function dataforrow(dataList) {
    const hello = dataList.map((entry) => ({
      Name: `${entry[1]} ${entry[2]}`,
      Email: entry[3],
      ContractorDateJoined: new Date(entry[4]),
      Company: entry[5],
      CompanyType: entry[6],
    }));
    return hello; // Return the mapped data
  }
  // specify the data
  const rowDataAll = dataforrow(dataList["data"]);

  // let the grid know which columns and what data to use
  const gridOptionstable1 = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    onGridReady: onGridReadyExportmyGridUniqueconPer
  };
  if (myGridUniqueconPer) {
    myGridUniqueconPer.destroy();
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGridUserAllUnique");
  myGridUniqueconPer = new agGrid.Grid(gridDiv, gridOptionstable1);
  myGridUniqueconPer = gridOptionstable1.api;
}

async function totalPlcPerAccountManager() {
  dataList = "";
  const selectElement = document.getElementById('selectForAccountManagerTable'); 
  if (selectElement.childElementCount <= 0) {
    await getManagerForOptionsInPlcPerManagerTable()
  } 
  const startDate = document.getElementById("startdatePlcPerAccountManager").value;
  const endDate = document.getElementById("enddatePlcPerAccountManager").value;
  const stringId = document.getElementById("selectForAccountManagerTable").value;
  const apiUrl = `http://${port}/api/getTotalPlcPaidPerManagerTable?start=${startDate}&end=${endDate}&id=${stringId}`;
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      // console.log(d);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  //TAble 01
  const columnDefs = [
    { field: "Name", filter: true ,flex:1},
    { field: "Email", filter: true ,flex:1},
    { field: "ContractorDateJoined", filter: true ,flex:1},
    { field: "Company", filter: true ,flex:1},
    { field: "CompanyType", filter: true ,flex:1},
    { field: "MonthOfInvoice",filter:true,flex:1}
  ];

  function dataforrow(dataList) {
    const hello = dataList.map((entry) => ({
      Name: `${entry[1]} ${entry[2]}`,
      Email: entry[3],
      ContractorDateJoined: new Date(entry[4]),
      Company: entry[5],
      CompanyType: entry[6],
      MonthOfInvoice:entry[7]
    }));
    return hello; // Return the mapped data
  }
  // specify the data
  const rowDataAll = dataforrow(dataList["data"]);

  // let the grid know which columns and what data to use
  const gridOptionstable1 = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    onGridReady: onGridReadyExportymGridPlcPerAccountManager
  };
  if (myGridUserAllPlcPerAccountManager) {
    myGridUserAllPlcPerAccountManager.destroy();
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGridUserAllPlcPerAccountManager");
  myGridUserAllPlcPerAccountManager = new agGrid.Grid(gridDiv, gridOptionstable1);
  myGridUserAllPlcPerAccountManager = gridOptionstable1.api;
}

async function getManagerForOptionsInPlcPerManagerTable() {
  dataList = "";
  const apiUrl = `http://${port}/api/getListOfAccountManager`;
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d.data;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
    let select = document.getElementById("selectForAccountManagerTable");
    dataList.forEach(element => {
      let newOption = document.createElement("option");
      newOption.value = element[0]; // Set the value attribute
      newOption.text = `${element[2]} ${element[3]}`; // Set the text content
      select.appendChild(newOption);
    });
}

async function contractorsWithNoManagementFeesDeducted() {
  dataList = "";
  const startDate = document.getElementById("startdatenomagF").value;
  const endDate = document.getElementById("enddatenomagF").value;
  const apiUrl = `http://${port}/api/getTotalContractorWithNoManagementFeesDeductedTable?start=${startDate}&end=${endDate}`;
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      // console.log(d);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  //TAble 01
  const columnDefs = [
    { field: "Name",  filter: true,flex:1},
    { field: "Email", filter: true ,flex:1},
    { field: "ContractorDateJoined", filter: true ,flex:1},
    { field: "Company", filter: true ,flex:1 },
    { field: "CompanyType", filter: true ,flex:1},
  ];

  function dataforrow(dataList) {
    const hello = dataList.map((entry) => ({
      Name: `${entry[1]} ${entry[2]}`,
      Email: entry[3],
      ContractorDateJoined: new Date(entry[4]),
      Company: entry[5],
      CompanyType: entry[6],
    }));
    return hello; // Return the mapped data
  }
  // specify the data
  const rowDataAll = dataforrow(dataList["data"]);

  // let the grid know which columns and what data to use
  const gridOptionstable1 = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    onGridReady : onGridReadyExportmyGridUserAllNoMag
  };
  if (myGridUserAllNoMag) {
    myGridUserAllNoMag.destroy();
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGridUserAllNoMagF");
  myGridUserAllNoMag = new agGrid.Grid(gridDiv, gridOptionstable1);
  myGridUserAllNoMag = gridOptionstable1.api;
}


async function totalContractorNotPaid() {
  dataList = "";
  const startDate = document.getElementById("startdatenotpaidCon").value;
  const endDate = document.getElementById("enddatenotpaidCon").value;
  const apiUrl = `http://${port}/api/getTotalContractorNotPaidTable?start=${startDate}&end=${endDate}`;
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      // console.log(d);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  //TAble 01
  const columnDefs = [
    { field: "Name", filter: true ,flex:1},
    { field: "Email", filter: true ,flex:1},
    { field: "ContractorDateJoined", filter: true ,flex:1},
    { field: "Company", filter: true ,flex:1},
    { field: "CompanyType", filter: true ,flex:1},
  ];

  function dataforrow(dataList) {
    const hello = dataList.map((entry) => ({
      Name: `${entry[1]} ${entry[2]}`,
      Email: entry[3],
      ContractorDateJoined: new Date(entry[4]),
      Company: entry[5],
      CompanyType: entry[6],
    }));
    return hello; // Return the mapped data
  }
  // specify the data
  const rowDataAll = dataforrow(dataList["data"]);

  // let the grid know which columns and what data to use
  const gridOptionstable1 = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    onGridReady: onGridReadyExportmyGridAllConPaid
  };
  if (myGridAllConPaid) {
    myGridAllConPaid.destroy();
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGridUserAllConNotPaid");
  myGridAllConPaid = new agGrid.Grid(gridDiv, gridOptionstable1);
  myGridAllConPaid = gridOptionstable1.api;
}


async function startDateWithinTwoMonthsOne() {
  dataList = "";
  const apiUrl = `http://${port}/api/getContractorStartDateWithinTwoMonTableOne`;
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      // console.log(d);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  //TAble 01
  const columnDefs = [
    { field: "Name", filter: true ,flex:1},
    { field: "Email", filter: true ,flex:1},
    { field: "ContractorDateJoined", filter: true ,flex:1},
    { field: "Company", filter: true,flex:1 },
    { field: "CompanyType", filter: true ,flex:1},
  ];

  function dataforrow(dataList) {
    const hello = dataList.map((entry) => ({
      Name: `${entry[1]} ${entry[2]}`,
      Email: entry[3],
      ContractorDateJoined: new Date(entry[4]),
      Company: entry[5],
      CompanyType: entry[6],
    }));
    return hello; // Return the mapped data
  }
  // specify the data
  const rowDataAll = dataforrow(dataList["data"]);

  // let the grid know which columns and what data to use
  const gridOptionstable1 = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    onGridReady :{onGridReady}
  };
  if (myGridStartOne) {
    myGridStartOne.destroy();
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGridUserAllStartTwoOne");
  myGridStartOne = new agGrid.Grid(gridDiv, gridOptionstable1);
  myGridStartOne = gridOptionstable1.api;
}
// startDateWithinTwoMonthsOne();

async function startDateWithinTwoMonths() {
  dataList = "";
  const apiUrl = `http://${port}/api/getContractorStartDateWithinTwoMonTabletwo`;
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      // console.log(d);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  //TAble 01
  const columnDefs = [
    { field: "Name", filter: true ,flex:1},
    { field: "Email", filter: true ,flex:1},
    { field: "ContractorDateJoined", filter: true ,flex:1},
    { field: "Company", filter: true ,flex:1},
    { field: "CompanyType", filter: true ,flex:1},
  ];

  function dataforrow(dataList) {
    const hello = dataList.map((entry) => ({
      Name: `${entry[1]} ${entry[2]}`,
      Email: entry[3],
      ContractorDateJoined: new Date(entry[4]),
      Company: entry[5],
      CompanyType: entry[6],
    }));
    return hello; // Return the mapped data
  }
  // specify the data
  const rowDataAll = dataforrow(dataList["data"]);

  // let the grid know which columns and what data to use
  const gridOptionstable1 = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    onGridReady :{onGridReady}
  };
  if (myGridstartTwoTwo) {
    myGridstartTwoTwo.destroy();
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGridUserAllStartTwoTwo");
  myGridstartTwoTwo = new agGrid.Grid(gridDiv, gridOptionstable1);
  myGridstartTwoTwo = gridOptionstable1.api;
}
// startDateWithinTwoMonths();


async function noInvoiceSendAndStartDateWithin2Month() {
  dataList = "";
  const apiUrl = `http://${port}/api/getContractorWithNoInvoiceSendAndStartDateBeforeTwoTable`;
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      // console.log(d);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  //TAble 01
  const columnDefs = [
    { field: "Name", filter: true ,flex:1},
    { field: "Email", filter: true ,flex:1},
    { field: "ContractorDateJoined", filter: true ,flex:1},
    { field: "Company", filter: true ,flex:1},
    { field: "CompanyType", filter: true ,flex:1},
  ];

  function dataforrow(dataList) {
    const hello = dataList.map((entry) => ({
      Name: `${entry[1]} ${entry[2]}`,
      Email: entry[3],
      ContractorDateJoined: new Date(entry[4]),
      Company: entry[5],
      CompanyType: entry[6],
    }));
    return hello; // Return the mapped data
  }
  // specify the data
  const rowDataAll = dataforrow(dataList["data"]);

  // let the grid know which columns and what data to use
  const gridOptionstable1 = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    onGridReady: onGridReadyExportmyGridUserAllMonInvo
  };
  if (myGridUserAllMonInvo) {
    myGridUserAllMonInvo.destroy();
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGridUserAllMonInvo");
  myGridUserAllMonInvo = new agGrid.Grid(gridDiv, gridOptionstable1);
  myGridUserAllMonInvo = gridOptionstable1.api;
}

