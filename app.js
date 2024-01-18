const slots = ["-", "-", "-", "-", "-"];
const jobs = [];
const deadlines = [];
const profits = [];

function populateTables() {

  for (let i = 0; i < 5; i++) {
    // (a-e)
    const randomJobName = String.fromCharCode(97 + i);

    // 1-5
    const randomDeadline = Math.floor(Math.random() * 5) + 1;

    //1-100
    const randomProfit = Math.floor(Math.random() * 100) + 1;


    jobs.push(randomJobName);
    deadlines.push(randomDeadline);
    profits.push(randomProfit);
  }


  updateTables();
}

function updateTable(tableId, data, header) {
  const table = document.getElementById(tableId);


  while (table.rows.length > 0) {
    table.deleteRow(0);
  }


  const headerRow = table.insertRow(0);
  const indexCell = headerRow.insertCell(0);
  indexCell.innerHTML = '<th><b>Index</b></th>';
  for (let i = 0; i < data.length; i++) {
    const cell = headerRow.insertCell(i + 1);
    cell.innerHTML = `<th>${i}</th>`;
  }


  const row = table.insertRow(1);


  const headerCell = row.insertCell(0);
  headerCell.innerHTML = `<b>${header}</b>`;


  for (let i = 0; i < data.length; i++) {
    const cell = row.insertCell(i + 1);
    cell.innerHTML = data[i];
  }
}

function addNewJob() {
  const jobName = document.getElementById("jobName").value;
  const jobDeadline = document.getElementById("jobDeadline").value;
  const jobProfit = document.getElementById("jobProfit").value;


  jobs.push(jobName);
  deadlines.push(jobDeadline);
  profits.push(jobProfit);

  updateTables();
}


function sortJobs() {

  const sortedSchedule = greedyJobScheduling(jobs, deadlines, profits);


  updateTable("tableSlots", sortedSchedule, "Data");
}


function bubbleSort(arr, compareFunction) {
  const N = arr.length;
  for (let i = 0; i < N - 1; i++) {
      for (let j = 0; j < N - i - 1; j++) {
          if (compareFunction(arr[j], arr[j + 1]) < 0) {

              let temp = arr[j];
              arr[j] = arr[j + 1];
              arr[j + 1] = temp;
          }
      }
  }
}


function greedyJobScheduling(jobNames, deadlines, profits) {
  const N = deadlines.length;


  const indices = Array.from({ length: N }, (_, i) => i);


  bubbleSort(indices, (a, b) => profits[a] - profits[b]);


  const result = new Array(N).fill('-');


  for (let i = 0; i < N; i++) {
      for (let j = Math.min(N, deadlines[indices[i]]) - 1; j >= 0; j--) {
          if (result[j] === '-') {
              result[j] = jobNames[indices[i]];
              break;
          }
      }
  }

  return result;
}



