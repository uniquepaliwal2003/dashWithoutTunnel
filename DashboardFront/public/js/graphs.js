//Date formator function 
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

//intializing graphs
let myChartUserByMonth;
let myChartDocuments;
let myChartTillDate;
let myChartUmbrella;
let Myapexchartdocper;
let myChartMissDocBar;
let myChartMissingBeforeAfter;
let myChartTotalUniquepaidpermonth;
let myChartManagementDeducted;
let myChartTotalContractorNotPaid;
let myChartwithinTwoMon;
let myChartTotalPlcPaidPerAccountManager;

// First graph for active , pending and all.
async function userByMonth() {
  const dateStart = document.getElementById("startdateUserByMonth").value;
  const dateEnd = document.getElementById("enddateUserByMonth").value;
  let data = "";
  const apiUrl = `http://${port}/api/getUserByMonth?start=${dateStart}&end=${dateEnd}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    data = await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return;
  }

  const chrt = document.getElementById("UserByMonth").getContext("2d");
  const Chartdata = {
    labels: data["all"].map((item) => formatDateToMonthYear(item[0])),
    datasets: [
      {
        label: "All Contractors",
        data: data["all"].map((item) => item[1]),
        backgroundColor: "#146C94",
        borderWidth: 2,
      },
      {
        label: "Active Contractors",
        data: data["active"].map((item) => item[1]),
        backgroundColor: "#279EFF",
        borderWidth: 1,
      },
      {
        label: "Pending Contractors",
        data: data["pending"].map((item) => item[1]),
        backgroundColor: "#AFD3E2",
        borderWidth: 1,
      },
    ],
  };

  // Check if myChart exists, and destroy it to clear the old chart
  if (myChartUserByMonth) {
    myChartUserByMonth.destroy();
  }

  // Create a new chart with the updated data
  myChartUserByMonth = new Chart(chrt, {
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
userByMonth();

//cummulative for first graphs  , active , passive and all.
async function userByMonthCummOne() {
  const end = document.getElementById("enddateConTillDate").value;
  let data = "";
  const apiUrl = `http://${port}/api/getUserByMonthCummOne?end=${end}`;
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      data = d;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  const chrt = document.getElementById("UserByMonthCummOne").getContext("2d");
  var Chartdata = {
    labels: ["Total"],
    datasets: [
      {
        label: "ALL",
        data: [data.all[0][1]],
        backgroundColor: "#146C94",
        borderWidth: 2,
      },
      {
        label: "Active",
        data: [data.all[0][2]],
        backgroundColor: "#279EFF",
        borderWidth: 2,
      },
      {
        label: "Pending",
        data: [data.all[0][3]],
        backgroundColor: "#AFD3E2",
        borderWidth: 2,
      },
    ],
  };
  if (myChartTillDate) myChartTillDate.destroy();
  myChartTillDate = new Chart(chrt, {
    type: "bar",
    data: Chartdata,
    options: {
      maintainAspectRatio: false,
      scales: {
        maintainAspectRatio: false,
        x: {
          stacked: false,
        },
        y: {
          beginAtZero: true,
          ticks: {
            display: false,
          },
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
userByMonthCummOne();

//Bar With Total Written on it.
async function totalNewJoinersPerMont() {
  const dateStart = document.getElementById("startdateDocuments1").value;
  const dateEnd = document.getElementById("enddateDocuments").value;
  let dataList = "";
  const apiUrl = `http://${port}/api/getTotalNewJoinersPerMonth?start=${dateStart}&end=${dateEnd}`;
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      dataList = data;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  const chrt = document
    .getElementById("TotalNewJoinersPerMonth")
    .getContext("2d");
  const chartData = {
    // labels: [],
    labels: dataList["data"].map((item) => formatDateToMonthYear(item[0])),
    datasets: [
      {
        label: "Count of Contractors",
        // data: [],
        data: dataList["data"].map((item) => item[1]),
        backgroundColor: "#279EFF",
        //borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
  if (myChartUmbrella) myChartUmbrella.destroy();
  myChartUmbrella = new Chart(chrt, {
    type: "bar",
    data: chartData,
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
totalNewJoinersPerMont();

//Pie Chart for all documents received vs at least one document missing.
async function allDocumentRecieved() {
  const dateStart = document.getElementById("startdateDocuments").value;
  const dateEnd = document.getElementById("enddateUserByMonthDocuments").value;
  const apiUrl = `http://${port}/api/getAllDocumentRecieved?start=${dateStart}&end=${dateEnd}`;
  dataList = "";
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      dataList = data;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  const chrt = document
    .getElementById("TotalContractorsWithAllDocR")
    .getContext("2d");
  const chartData = {
    labels: ["All Documents Received", "Atleast One Doc Missing"],
    datasets: [
      {
        data: [dataList.allDocs[0][0], dataList.AtleasOneMiss[0][0]],
        backgroundColor: ["#146C94", "#19A7CE"],
        borderWidth: 1,
      },
    ],
  };
  if (myChartDocuments) {
    myChartDocuments.destroy();
  }
  myChartDocuments = new Chart(chrt, {
    type: "pie",
    data: chartData,
    options: {
      maintainAspectRatio: false,
    },
  });
}
allDocumentRecieved();

//Circle With % written on it
async function percWithAllDocRec() {
  const startDate = document.getElementById("startdateperdoc").value;
  const endDate = document.getElementById("enddateperdoc").value;
  const apiUrl = `http://${port}/api/getPercWithAllDocRec?start=${startDate}&end=${endDate}`;
  data = "";
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((d) => {
      data = d;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  const chartOptions = {
    chart: {
      type: "radialBar",
      height: "220px",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%",
        },
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -19,
            show: true,
            color: "#888",
          },
          value: {
            color: "#111",
            fontSize: "24px",
            show: true,
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#007BFF"],
    },
    series: [Math.ceil(data["percentage"][0][0])],
    labels: ["📙"],
  };
  if (Myapexchartdocper) {
    Myapexchartdocper.destroy();
  }
  Myapexchartdocper = new ApexCharts(
    document.querySelector("#ContPerWithAllDocRec"),
    chartOptions
  );
  Myapexchartdocper.render();
}
percWithAllDocRec();

//Pie chart for total contractors with missing info before contract start date
function pieChartWithMissingInfoBeforeContractStart() {
  const startDate = document.getElementById("startdateMissingDoc").value;
  const endDate = document.getElementById("enddateUserMissingDoc").value;
  //    const apiUrl = `http://${port}/api/getPieChartWithMissingInfoBeforeContractStart?start=${startDate}&end=${endDate}`;
  //      fetch(apiUrl)
  //      .then((response) => {
  //        if (!response.ok) {
  //          throw new Error('Network response was not ok');
  //      }
  //      return response.json();
  //      }).then((data) => {
  //      console.log(data);
  //      }).catch((error) => {
  //      console.error('There was a problem with the fetch operation:', error);
  //    });
  const chrt = document
    .getElementById("TotalContractorsWithMissInfoBeforeAndAfter")
    .getContext("2d");
  const chartData = {
    labels: [
      "Missing Info before Contract Start",
      "No missing Info before contract start",
    ],
    datasets: [
      {
        data: [80, 90],
        backgroundColor: ["#146C94", "#19A7CE"], // Pie slice colors
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"], // Pie slice border colors
        borderWidth: 1, // Pie slice border width
      },
    ],
  };
  if (myChartMissingBeforeAfter) {
    myChartMissingBeforeAfter.destroy();
  }
  myChartMissingBeforeAfter = new Chart(chrt, {
    type: "pie",
    data: chartData,
    options: {
      maintainAspectRatio: false,
      // You can customize options here if needed
    },
  });
}
// pieChartWithMissingInfoBeforeContractStart();

//Bar chart for missing docs
async function missingDocsBar() {
  dataList = "";
  const dateStart = document.getElementById("startdateMissDocBar").value;
  const dateEnd = document.getElementById("enddateMissDocBar").value;
  const apiUrl = `http://${port}/api/getMissingDocsBar?start=${dateStart}&end=${dateEnd}`;
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      dataList = data;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  const chrt = document
    .getElementById("TotalConWithMissingDocs")
    .getContext("2d");
  labels = ["ID PAL", "B10", "T&C", "Agency contract", "PPS"];
  dataCounts = [
    dataList.IDPal[0][0],
    dataList.B10[0][0],
    dataList.tc[0][0],
    dataList.Agency[0][0],
    dataList.PPS[0][0],
  ];
  if (myChartMissDocBar) {
    myChartMissDocBar.destroy();
  }
  myChartMissDocBar = new Chart(chrt, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Missing Data Counts",
          data: dataCounts,
          backgroundColor: "#279EFF", // Bar color
          //borderColor: "rgba(75, 192, 192, 1)", // Border color
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
missingDocsBar();

//bar chart for total unique contractors paid per month
async function totalUniqueContratorPaidPerMonth() {
  dataList = "";
  const startDate = document.getElementById("startdatePaid/Month").value;
  const endDate = document.getElementById("enddatePaid/Month").value;
  const apiUrl = `http://${port}/api/getTotalUniqueContratorPaidPerMonth?start=${startDate}&end=${endDate}`;
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      dataList = data;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  const chrt = document
    .getElementById("TotalUniqueContPaidEachMon")
    .getContext("2d");
  if (myChartTotalUniquepaidpermonth) {
    myChartTotalUniquepaidpermonth.destroy();
  }
  myChartTotalUniquepaidpermonth = new Chart(chrt, {
    type: "bar",
    data: {
      labels: dataList.data.map((item) => formatDateToMonthYear(item[0])),
      datasets: [
        {
          label: "Contractors",
          data: dataList.data.map((item) => item[1]),
          backgroundColor: "#279EFF", // Bar color
          //borderColor: "rgba(2, 90, 190, 0.678)", // Border color
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          callback: function (value, index, values) {
            return "$" + value; // Format y-axis labels as currency
          },
        },
      },
    },
  });
}
totalUniqueContratorPaidPerMonth();

// get plc contractor per manager.
async function getPlcContractorPaidPerAccountManager(){
  dataList = "";
  const selectElement = document.getElementById('selectForAccountManager'); // Replace 'yourSelectId' with your actual select element's ID

if (selectElement.childElementCount <= 0) {
  await getManagerForOptionsInPlcPerManager()
} 

  const startDate = document.getElementById("startDatePlcPaidPerAccoundManager").value;
  const endDate = document.getElementById("endDatePlcPaidPerAccoundManager").value;
  const stringId = document.getElementById("selectForAccountManager").value;
  const apiUrl = `http://${port}/api/getplcContractorPaidPerAccountManager?start=${startDate}&end=${endDate}&id=${stringId}`;
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
    let labelAdder = "Contractors"
    if( dataList.length === 0 ){
      // if (myChartTotalPlcPaidPerAccountManager) {
      //   myChartTotalPlcPaidPerAccountManager.destroy();
      // }
      // return;
      labelAdder = "No Data To Show"
    }
  const chrt = document
    .getElementById("TotalPlcPaiPerAccountmanager")
    .getContext("2d");
  if (myChartTotalPlcPaidPerAccountManager) {
    myChartTotalPlcPaidPerAccountManager.destroy();
  }
  myChartTotalPlcPaidPerAccountManager = new Chart(chrt, {
    type: "bar",
    data: {
      labels: dataList.map((item) => formatDateToMonthYear(item[0])),
      datasets: [
        {
          label: labelAdder,
          data: dataList.map((item) => item[1]),
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
        }
      },
    },
  });
}
getPlcContractorPaidPerAccountManager();

//bar chart for total unique contractors paid per month
async function getManagerForOptionsInPlcPerManager() {
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
    let select = document.getElementById("selectForAccountManager");
    dataList.forEach(element => {
      let newOption = document.createElement("option");
      newOption.value = element[0]; // Set the value attribute
      newOption.text = `${element[2]} ${element[3]}`; // Set the text content
      select.appendChild(newOption);
    });
}

//Bar chart for total management fees each month
async function totalManagementFeesDeducted() {
  dataList = "";
  const startDate = document.getElementById("startDatetotalManagement").value;
  const endDate = document.getElementById("endDatetotalManagement").value;
  const apiUrl = `http://${port}/api/getTotalManagementFeesDeducted?start=${startDate}&end=${endDate}`;
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      dataList = data;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  const chrt = document
    .getElementById("TotalManageFeesEachMonth")
    .getContext("2d");
  if (myChartManagementDeducted) {
    myChartManagementDeducted.destroy();
  }
  myChartManagementDeducted = new Chart(chrt, {
    type: "bar",
    data: {
      labels: dataList.data.map((item) => formatDateToMonthYear(item[0])),
      datasets: [
        {
          label: "Total Fees",
          data: dataList.data.map((item) => item[2]),
          backgroundColor: "#279EFF", // Bar color
          //borderColor: "rgba(75, 192, 192, 1)", // Border color
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            display: false,
          },
          // callback: function (value, index, values) {
          //   return '$' + value; // Format y-axis labels as currency
          // }
        },
      },
    },
  });
}
totalManagementFeesDeducted();

//Circle for Total contractor with no management fees dedecuted
async function totalContractorWithNoManagementFeesDeducted() {
  dataList = "";
  const startDate = document.getElementById("startDatetotalNOManagement").value;
  const endDate = document.getElementById("endDatetotalNOManagement").value;
  const apiUrl = `http://${port}/api/getTotalContractorWithNoManagementFeesDeducted?start=${startDate}&end=${endDate}`;
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      dataList = data;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  const chrt = document.getElementById("TotalContWithNoMangFeesDeducted");
  function incrementNumber() {
    let number = 0;
    const targetNumber = dataList.data[0][0];
    const increment = 10;
    const intervalDuration = 5;
    const interval = setInterval(() => {
      if (targetNumber - 30 > number) {
        number += increment;
        chrt.innerText = number;
      } else {
        number += 1;
        chrt.innerText = number;
      }
      if (number >= targetNumber) {
        clearInterval(interval);
      }
    }, intervalDuration);
  }
  incrementNumber();
}
totalContractorWithNoManagementFeesDeducted();

//Bar graph for Total Contractor not paid
async function totalContractorNotPaidgraph() {
  dataList = ""
  const startDate = document.getElementById("startDateContNotPaid").value;
  const endDate = document.getElementById("endDateContNotPaid").value;
      const apiUrl = `http://${port}/api/getTotalContractorNotPaid?start=${startDate}&end=${endDate}`;
        await fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        }).then((data) => {
          dataList = data
        }).catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  const chrt = document.getElementById("TotalConNotPaid").getContext("2d");
  if (myChartTotalContractorNotPaid) {
    myChartTotalContractorNotPaid.destroy();
  }
  myChartTotalContractorNotPaid = new Chart(chrt, {
    type: "bar",
    data: {
      labels: dataList.data.map( entry => formatDateToMonthYear(entry[0])),
      datasets: [
        {
          label: "Total Fees",
          data: dataList.data.map(entry=>entry[1]),
          backgroundColor: "#279EFF", // Bar color
          //borderColor: "rgba(75, 192, 192, 1)", // Border color
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          callback: function (value, index, values) {
            return "$" + value; // Format y-axis labels as currency
          },
        },
      },
    },
  });
}
totalContractorNotPaidgraph();

//Pie chart for contractors start date within 2 months
async function contractorStartDateWithinTwoMon() {
  dataList = ""
  // const startDate = document.getElementById("startDateWithinTwoMonS").value;
  // const endDate = document.getElementById("endDateWithinTwoMonS").value;
      const apiUrl = `http://${port}/api/getContractorStartDateWithinTwoMon`;
        await fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        }).then((data) => {
        dataList = data
        }).catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  const chrt = document
    .getElementById("ContStartDateWithinTwoMon")
    .getContext("2d");
  const chartData = {
    labels: ["before", "after"],
    datasets: [
      {
        data: [dataList.data1[0][0], dataList.data2[0][0]],
        backgroundColor: ["#146C94", "#19A7CE"], // Pie slice colors
        //borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'], // Pie slice border colors
        borderWidth: 1, // Pie slice border width
      },
    ],
  };
  if (myChartwithinTwoMon) {
    myChartwithinTwoMon.destroy();
  }
  myChartwithinTwoMon = new Chart(chrt, {
    type: "pie",
    data: chartData,
    options: {
      maintainAspectRatio: false,
    },
  });
}
contractorStartDateWithinTwoMon();

// Pie chart for contractors with no invoice send and start date before 2 months.
async function contractorWithNoInvoiceSendAndStartDateBeforeTwo() {
  let dataList = "";
  const apiUrl =`http://${port}/api/getContractorWithNoInvoiceSendAndStartDateBeforeTwo`;
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      dataList = data;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  const chrt = document.getElementById("btnUserByMonthMonPoint");
  chrt.innerText = "Hello";
  function incrementNumber() {
    let number = 0;
    const targetNumber = dataList.date[0][0];
    const increment = 3;
    const intervalDuration = 5;
    const interval = setInterval(() => {
      if (targetNumber - 30 > number) {
        number += increment;
        chrt.innerText = number;
      } else {
        number += 1;
        chrt.innerText = number;
      }
      if (number >= targetNumber) {
        clearInterval(interval);
      }
    }, intervalDuration);
  }
  incrementNumber();
}
contractorWithNoInvoiceSendAndStartDateBeforeTwo();
