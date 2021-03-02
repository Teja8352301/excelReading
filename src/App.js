import React, { Component } from "react";
import "./App.css";
import * as XLSX from "xlsx";
class App extends Component {
  inputRef = React.createRef();
  fileHandling = event => {
    let file = event.target.files[0];
    this.readExcel(file);
  };
  readExcel = file => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = e => {
        const bufferArray = e.target.result;
        console.log(bufferArray);

        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        resolve(data);
      };
      fileReader.onerror = error => {
        reject(error);
      };
    });
    promise.then(d => {
      console.log(d);
    });
  };
  render() {
    return (
      <div className="App">
        <input
          type="file"
          accept=".xls,.xlsx"
          ref={this.inputRef}
          onChange={event => this.fileHandling(event)}
        />
      </div>
    );
  }
}

export default App;
