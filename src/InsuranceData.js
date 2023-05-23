//import all the modules require
const fs = require("fs");
const readline = require("readline");
const _ = require("lodash");
//const writeStream = fs.createWriteStream(femaleRegion.txt);

//Use try and catch to handle the error where ever required
//return the callback with appropriate data where ever require in all the methods

//More userdefined methods can be written if required to write the logical stuff

//This method will take two parameters first the fileName
//and second a callback
//read file data line by line using readLine
//create array and push all data inside the array

const readFileContentsLineByLine = (fileName, cb) => {
  try {
    let fileContents = [];

    const rl = readline.createInterface({
      input: fs.createReadStream(fileName),
      output: process.stdout,
      terminal: false,
    });

    rl.on("line", (line) => {
      fileContents.push(line);
    });
    rl.on("close", () => {
      cb(null, fileContents);
    });
  } catch (error) {
    cb(error, null);
  }
};

//This method will take two parameters first the filecontent
//and second the callback
//use map to filter the data
//Filter all the records for female candidates given region as southwest.

const filterFemaleCandidates = (fileContents, cb) => {
  let filteredData = fileContents.filter((item) => {
    return item.includes("female") && item.includes("southwest");
  });
  cb(null, filteredData);
  //use lodash.compact() method if required
};

//This method will write filtered data in the output file
const writeFilteredDataToFile = (outputFileName, filteredData, cb) => {
  //use writeFile method to write the filteredData
  fs.writeFile(outputFileName, filteredData.join("\n"), (error) => {
    if (error) {
      cb(error);
    } else {
      cb(null);
    }
  });
};

//This method will read the file content using Streams
//create array and push all the data from file to it

const readFileContentsUsingStream = (fileName, cb) => {
  let fileContents = [];

  const readStream = fs.createReadStream(fileName, { encoding: "utf8" });

  readStream.on("data", (chunk) => {
    const lines = chunk.split("\n");
    // Process each line individually
    lines.forEach((line) => {
      if(line.includes('male') || line.includes('female')){
        fileContents.push(line);
      }

    });
  });

  readStream.on("error", (error) => {
    console.log("Error while reading contents of file using streams:", error);
    cb("Encountered error while reading file contents using streams!");
  });

  readStream.on("end", () => {
    cb(null, fileContents);
  });
};

//This method will filetDatewithNoChildren it will take two parameters
//first the fileContent and second the callback
//use map if required to filter the data

const filterDataWithNoChildren = (fileContents, cb) => {
  //use lodash.compact() if required
  let filteredData = fileContents.filter((item) => {
    return item.includes("0,") || item.includes("0 ");
  });
  cb(null, filteredData);
};

module.exports = {
  readFileContentsLineByLine,
  filterFemaleCandidates,
  readFileContentsUsingStream,
};
