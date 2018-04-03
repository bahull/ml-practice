const ml = require("ml-regression");
const csv = require("csvtojson");
const SLR = ml.SLR; //Simple Linear Regression

const csvFilePath = "advertising.csv"; //Data

const csvData = [], //Parsed Data
  X = [], // Input
  y = []; // Output

let regressionModel;

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

csv()
  .fromFile(csvFilePath)
  .on("json", jsonObj => {
    csvData.push(jsonObj);
    // console.log(jsonObj);
  })
  .on("done", () => {
    dressData(); // To get data points from Json Objects
    performRegression();
  });

function dressData() {
  csvData.forEach(row => {
    X.push(f(row.radio));
    y.push(f(row.sales));
  });
}
// console.log(csvData);
function f(s) {
  return parseFloat(s);
}

function performRegression() {
  regressionModel = new SLR(X, y);
  console.log(regressionModel.toString(3));
  predictOutput();
}

function predictOutput() {
  rl.question(
    "Enter input X for prediction (Press CTRL+C to exit) :",
    answer => {
      console.log(
        `At X = ${answer}, y = ${regressionModel.predict(parseFloat(answer))}`
      );
      predictOutput();
    }
  );
}
