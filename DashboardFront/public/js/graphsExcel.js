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
let myGridTotalEmails = ""
let myGridAbsentEmails = ""
let myGridPaye = ""
let myGridDirector = ""
let myGridPlc = ""
let myGridActive = ""
let myGridLimitedActive = ""
let myGridLimitedInactive = ""
let myGridInactive = ""
let myGridPending = ""
let myGridFour = ""
let myGridThree = ""
let myGridOne = ""

async function gridTotalEmails(){
  dataList = "";
  const formData = new FormData(form);
  const apiUrl = `http://${port}/api/upload-excel/gridTotalEmails`;
  await fetch(apiUrl , {method:'POST',body:formData})
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      console.log(d.data);
      console.log(dataList)
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
  const rowDataAll = dataforrow(dataList.data);

  // let the grid know which columns and what data to use
  const gridOptionstable1 = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    // onGridReady :onGridReadyExportmyGridDocRecMisstableOne
  };
  if (myGridDocRecMisstableTwo) {
    myGridDocRecMisstableTwo.destroy();
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGridUserAllTotalEmails");
  myGridTotalEmails = new agGrid.Grid(gridDiv, gridOptionstable1);
  myGridTotalEmails = gridOptionstable1.api;
}
async function gridAbsentEmails(){
  dataList = "";
  const formData = new FormData(form);
  const apiUrl = `http://${port}/api/upload-excel/gridAbseneEmails`;
  await fetch(apiUrl , {method:'POST',body:formData})
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      console.log(d.data);
      console.log(dataList)
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  //TAble 01
  const columnDefs = [
    { field: "Email", filter: true ,flex:1}
  ];

  function dataforrow(dataList) {
    const hello = dataList.map((entry) => ({
      Email: entry[0],
    }));
    return hello; // Return the mapped data
  }
  // specify the data
  const rowDataAll = dataforrow(dataList.data);

  // let the grid know which columns and what data to use
  const gridOptionstable1 = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    // onGridReady :onGridReadyExportmyGridDocRecMisstableOne
  };
  if (myGridAbsentEmails) {
    myGridAbsentEmails.destroy();
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGridUserAllAbsentEmails");
  myGridAbsentEmails = new agGrid.Grid(gridDiv, gridOptionstable1);
  myGridAbsentEmails = gridOptionstable1.api;
}
async function gridPaye(){
  dataList = "";
  const formData = new FormData(form);
  const apiUrl = `http://${port}/api/upload-excel/gridPaye`;
  await fetch(apiUrl , {method:'POST',body:formData})
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      console.log(d.data);
      console.log(dataList)
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
  const rowDataAll = dataforrow(dataList.data);

  // let the grid know which columns and what data to use
  const gridOptionstable1 = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    // onGridReady :onGridReadyExportmyGridDocRecMisstableOne
  };
  if (myGridPaye) {
    myGridPaye.destroy();
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGridUserAllPaye");
  myGridPaye = new agGrid.Grid(gridDiv, gridOptionstable1);
  myGridPaye = gridOptionstable1.api;
}
async function gridDirector(){
  dataList = "";
  const formData = new FormData(form);
  const apiUrl = `http://${port}/api/upload-excel/gridDirector`;
  await fetch(apiUrl , {method:'POST',body:formData})
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      console.log(d.data);
      console.log(dataList)
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
  const rowDataAll = dataforrow(dataList.data);

  // let the grid know which columns and what data to use
  const gridOptionstable1 = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    // onGridReady :onGridReadyExportmyGridDocRecMisstableOne
  };
  if (myGridDirector) {
    myGridDirector.destroy();
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGridUserAllDirector");
  myGridDirector = new agGrid.Grid(gridDiv, gridOptionstable1);
  myGridDirector = gridOptionstable1.api;
}
async function gridPlc(){
  dataList = "";
  const formData = new FormData(form);
  const apiUrl = `http://${port}/api/upload-excel/gridPlc`;
  await fetch(apiUrl , {method:'POST',body:formData})
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      console.log(d.data);
      console.log(dataList)
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
  const rowDataAll = dataforrow(dataList.data);

  // let the grid know which columns and what data to use
  const gridOptionstable1 = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    // onGridReady :onGridReadyExportmyGridDocRecMisstableOne
  };
  if (myGridPlc) {
    myGridPlc.destroy();
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGridUserAllPlc");
  myGridPlc = new agGrid.Grid(gridDiv, gridOptionstable1);
  myGridPlc = gridOptionstable1.api;
}
async function gridActive(){
  dataList = "";
  const formData = new FormData(form);
  const apiUrl = `http://${port}/api/upload-excel/gridActive`;
  await fetch(apiUrl , {method:'POST',body:formData})
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      console.log(d.data);
      console.log(dataList)
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
  const rowDataAll = dataforrow(dataList.data);

  // let the grid know which columns and what data to use
  const gridOptionstable1 = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    // onGridReady :onGridReadyExportmyGridDocRecMisstableOne
  };
  if (myGridActive) {
    myGridActive.destroy();
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGridUserAllActive");
  myGridActive = new agGrid.Grid(gridDiv, gridOptionstable1);
  myGridActive = gridOptionstable1.api;
}
async function gridLimitedActive(){
  dataList = "";
  const formData = new FormData(form);
  const apiUrl = `http://${port}/api/upload-excel/gridLimitedActive`;
  await fetch(apiUrl , {method:'POST',body:formData})
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      console.log(d.data);
      console.log(dataList)
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
  const rowDataAll = dataforrow(dataList.data);

  // let the grid know which columns and what data to use
  const gridOptionstable1 = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    // onGridReady :onGridReadyExportmyGridDocRecMisstableOne
  };
  if (myGridLimitedActive) {
    myGridLimitedActive.destroy();
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGridUserAllLimitedActive");
  myGridLimitedActive = new agGrid.Grid(gridDiv, gridOptionstable1);
  myGridLimitedActive = gridOptionstable1.api;
}
async function gridLimitedInactive(){
  dataList = "";
  const formData = new FormData(form);
  const apiUrl = `http://${port}/api/upload-excel/gridLimitedInactive`;
  await fetch(apiUrl , {method:'POST',body:formData})
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      console.log(d.data);
      console.log(dataList)
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
  const rowDataAll = dataforrow(dataList.data);

  // let the grid know which columns and what data to use
  const gridOptionstable1 = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    // onGridReady :onGridReadyExportmyGridDocRecMisstableOne
  };
  if (myGridLimitedInactive) {
    myGridLimitedInactive.destroy();
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGridUserAllLimitedInactive");
  myGridLimitedInactive = new agGrid.Grid(gridDiv, gridOptionstable1);
  myGridLimitedInactive = gridOptionstable1.api;
}
async function gridPending(){
  dataList = "";
  const formData = new FormData(form);
  const apiUrl = `http://${port}/api/upload-excel/gridPending`;
  await fetch(apiUrl , {method:'POST',body:formData})
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      console.log(d.data);
      console.log(dataList)
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
  const rowDataAll = dataforrow(dataList.data);

  // let the grid know which columns and what data to use
  const gridOptionstable1 = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    // onGridReady :onGridReadyExportmyGridDocRecMisstableOne
  };
  if (myGridPending) {
    myGridPending.destroy();
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGridUserAllPending");
  myGridPending = new agGrid.Grid(gridDiv, gridOptionstable1);
  myGridPending = gridOptionstable1.api;
}
async function gridInactive(){
  dataList = "";
  const formData = new FormData(form);
  const apiUrl = `http://${port}/api/upload-excel/gridInactive`;
  await fetch(apiUrl , {method:'POST',body:formData})
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      console.log(d.data);
      console.log(dataList)
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
  const rowDataAll = dataforrow(dataList.data);

  // let the grid know which columns and what data to use
  const gridOptionstable1 = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    // onGridReady :onGridReadyExportmyGridDocRecMisstableOne
  };
  if (myGridInactive) {
    myGridInactive.destroy();
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGridUserAllInactive");
  myGridInactive = new agGrid.Grid(gridDiv, gridOptionstable1);
  myGridInactive = gridOptionstable1.api;
}
async function gridOne(){
  dataList = "";
  const formData = new FormData(form);
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
  if( !startDate || !endDate ){
      return
  }
  formData.append("startDate", startDate);
  formData.append("endDate", endDate);
  const apiUrl = `http://${port}/api/upload-excel/gridOne`;
  await fetch(apiUrl , {method:'POST',body:formData})
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      console.log(d.data);
      console.log(dataList)
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
  const rowDataAll = dataforrow(dataList.data);

  // let the grid know which columns and what data to use
  const gridOptionstable1 = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    // onGridReady :onGridReadyExportmyGridDocRecMisstableOne
  };
  if (myGridOne) {
    myGridOne.destroy();
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGridUserAllOne");
  myGridOne = new agGrid.Grid(gridDiv, gridOptionstable1);
  myGridOne = gridOptionstable1.api;
}
async function gridThree(){
  dataList = "";
  const formData = new FormData(form);
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
  if( !startDate || !endDate ){
      return
  }
  formData.append("startDate", startDate);
  formData.append("endDate", endDate);
  const apiUrl = `http://${port}/api/upload-excel/gridThree`;
  await fetch(apiUrl , {method:'POST',body:formData})
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      console.log(d.data);
      console.log(dataList)
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
  const rowDataAll = dataforrow(dataList.data);

  // let the grid know which columns and what data to use
  const gridOptionstable1 = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    // onGridReady :onGridReadyExportmyGridDocRecMisstableOne
  };
  if (myGridThree) {
    myGridThree.destroy();
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGridUserAllThree");
  myGridThree = new agGrid.Grid(gridDiv, gridOptionstable1);
  myGridThree = gridOptionstable1.api;
}
async function gridFour(){
  dataList = "";
  const formData = new FormData(form);
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
  if( !startDate || !endDate ){
      return
  }
  formData.append("startDate", startDate);
  formData.append("endDate", endDate);
  con
  const apiUrl = `http://${port}/api/upload-excel/gridFour`;
  await fetch(apiUrl , {method:'POST',body:formData})
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      dataList = d;
      console.log(d.data);
      console.log(dataList)
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
  const rowDataAll = dataforrow(dataList.data);

  // let the grid know which columns and what data to use
  const gridOptionstable1 = {
    columnDefs: columnDefs,
    rowData: rowDataAll,
    pagination: true,
    animateRows: true,
    paginationPageSize: 25,
    // onGridReady :onGridReadyExportmyGridDocRecMisstableOne
  };
  if (myGridFour) {
    myGridFour.destroy();
  }
  // setup the grid after the page has finished loading
  const gridDiv = document.querySelector("#myGridUserAllFour");
  myGridFour = new agGrid.Grid(gridDiv, gridOptionstable1);
  myGridFour = gridOptionstable1.api;
}
