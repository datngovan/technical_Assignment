import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import {
  duplication,
  getArraysIntersection,
  getNonExist,
  setWithExpiry,
} from "./duplication";
import { LocalStorage } from "ttl-localstorage";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    // Set
    if (this.state.value.split(" ")[0] == "SET") {
      if (this.state.value.split(" ").length == 3) {
        const item = {
          value: this.state.value.split(" ")[2]
        }
        localStorage.setItem(this.state.value.split(" ")[1], JSON.stringify(item))
        this.setState({ value: " " });
      }
    }
    // Delete
    else if (this.state.value.split(" ")[0] == "DEL") {
      if (this.state.value.split(" ").length >= 2) {
        localStorage.removeItem(this.state.value.split(" ")[1]);
        this.setState({ value: " " });
      }
      // GET
    } else if (this.state.value.split(" ")[0] == "GET") {
      if (this.state.value.split(" ").length == 2) {
        if (!(localStorage.getItem(this.state.value.split(" ")[1]) === null)) {
          if (typeof(JSON.parse(localStorage.getItem(this.state.value.split(" ")[1]))['value'])) {
            var text =
            JSON.parse(localStorage.getItem(this.state.value.split(" ")[1]))['value'] + "<br>\n";
            document.getElementById("p1").innerHTML += text;
          } else {
            document.getElementById("p1").innerHTML +=
              this.state.value.split(" ")[1] +
              " is a Set use command SMEMBERS <br>\n";
          }
        }
      }
    }
    // KEYS
    else if (this.state.value.split(" ")[0] == "KEYS") {
      if (this.state.value.split(" ").length == 1) {
        var length = Object.keys(localStorage).length;
        while (length--) {
          var text = localStorage.key(length) + "<br>\n";
          document.getElementById("p1").innerHTML += text;
        }
      }
    }
    // SADD
    else if (this.state.value.split(" ")[0] == "SADD") {
      if (this.state.value.split(" ").length >= 3) {
        var array = [];
        for (var i = 2; i < this.state.value.split(" ").length; i++) {
          array.push(this.state.value.split(" ")[i]);
        }
        if (!duplication(array)) {
          const item = {
            value: array
          }
          localStorage.setItem(this.state.value.split(" ")[1], JSON.stringify(item))
          this.setState({ value: " " });
          document.getElementById("p1").innerHTML += "SADD executed <br>\n";
        } else {
          document.getElementById("p1").innerHTML += "dupplicated value <br>\n";
        }
      }
    }
    //SREM
    else if (this.state.value.split(" ")[0] == "SREM") {
      if (this.state.value.split(" ").length >= 3) {
        var array = [];
        for (var i = 2; i < this.state.value.split(" ").length; i++) {
          array.push(this.state.value.split(" ")[i]);
        }
        var data = JSON.parse(
          localStorage.getItem(this.state.value.split(" ")[1])
        )['value'];
        if (!duplication(array)) {
          if (array.length == getArraysIntersection(array, data).length) {
            var newArr = getNonExist(data, array);
            localStorage.setItem(
              this.state.value.split(" ")[1],
              JSON.stringify(newArr)
            );
            this.setState({ value: " " });
            document.getElementById("p1").innerHTML += "SREM executed <br>\n";
          } else {
            var inter = getNonExist(array, data);
            document.getElementById("p1").innerHTML +=
              "NON EXIST " + inter + "<br>\n";
          }
        } else {
          document.getElementById("p1").innerHTML += "dupplicated value <br>\n";
        }
      }
    }
    //SINTER
    else if (this.state.value.split(" ")[0] == "SINTER") {
      if (this.state.value.split(" ").length >= 3) {
        var count = 0;
        if (!(localStorage.getItem(this.state.value.split(" ")[1]) === null)) {
          var inter = JSON.parse(
            localStorage.getItem(this.state.value.split(" ")[1])['value']
          );
        } else {
          document.getElementById("p1").innerHTML +=
            this.state.value.split(" ")[1] + " is not exist <br>\n";
          count++;
        }
        for (var i = 2; i < this.state.value.split(" ").length; i++) {
          if (
            !(localStorage.getItem(this.state.value.split(" ")[i]) === null)
          ) {
            inter = getArraysIntersection(
              inter,
              JSON.parse(localStorage.getItem(this.state.value.split(" ")[i]))['value']
            );
          } else {
            document.getElementById("p1").innerHTML +=
              this.state.value.split(" ")[i] + " is not exist <br>\n";
            count++;
          }
        }
        if (count == 0) {
          document.getElementById("p1").innerHTML += inter + " <br>\n";
        }
      }
    }
    //SMEMBERS
    else if (this.state.value.split(" ")[0] == "SMEMBERS") {
      if (this.state.value.split(" ").length == 2) {
        if (!(localStorage.getItem(this.state.value.split(" ")[1]) === null)) {
          if (
            typeof JSON.parse(
              localStorage.getItem(this.state.value.split(" ")[1])
            )['value'] === "object"
          ) {
            var text =
            JSON.parse(localStorage.getItem(this.state.value.split(" ")[1]))['value'] + "<br>\n";
            document.getElementById("p1").innerHTML += text;
          } else {
            document.getElementById("p1").innerHTML +=
              this.state.value.split(" ")[1] +
              " is a STRING use command GET <br>\n";
          }
        }
      }
    }
    // EXPIRE
    else if (this.state.value.split(" ")[0] == "EXPIRE") {
      if (this.state.value.split(" ").length == 3) {
        if (!(localStorage.getItem(this.state.value.split(" ")[1]) === null)) {
          if(!(JSON.parse(localStorage.getItem(this.state.value.split(" ")[1]))['expire']===null)){
            const now = new Date();
            const item = {
              value: JSON.parse(localStorage.getItem(this.state.value.split(" ")[1]))['value'],
              expiry: now.getTime() + parseInt((this.state.value.split(" ")[2]))*1000,
            };
            localStorage.removeItem(this.state.value.split(" ")[1]);
            localStorage.setItem(this.state.value.split(" ")[1], JSON.stringify(item));
            document.getElementById("p1").innerHTML += "Modified Successed<br>\n";
          }
          else{
            const now = new Date();
            const item = {
              value: JSON.parse(localStorage.getItem(this.state.value.split(" ")[1])),
              expiry: now.getTime() + parseInt((this.state.value.split(" ")[2])),
            };
            localStorage.setItem(this.state.value.split(" ")[1], JSON.stringify(item));
            document.getElementById("p1").innerHTML += "Added timeout<br>\n";
          }
        } else {
          document.getElementById("p1").innerHTML += "This key is not exist<br>\n";
        }
      }
    }
    // TTL
    else if(this.state.value.split(" ")[0] == "TTL"){
      if(this.state.value.split(" ").length == 2){
        const now = new Date()
        if(JSON.parse(localStorage.getItem(this.state.value.split(" ")[1]))['expiry']===null){
          document.getElementById("p1").innerHTML += "Not have a timeout value yet<br>\n";
          }else{
            if(now.getTime() <= JSON.parse(localStorage.getItem(this.state.value.split(" ")[1]))['expiry']){
              document.getElementById("p1").innerHTML += (JSON.parse(localStorage.getItem(this.state.value.split(" ")[1]))['expiry'] - now.getTime())/1000+"seconds <br>\n";
          }
        }
      }
    }
     else {
      document.getElementById("p1").innerHTML += "WRONG SYNTAX<br>\n";
    }
    getWithExpiry();
    function getWithExpiry() {
      var length = Object.keys(localStorage).length;
      while (length--) {
        var name = localStorage.key(length);
        const now = new Date()
        if(now.getTime() > JSON.parse(localStorage.getItem(name))['expiry']){
          localStorage.removeItem(name)
        }
      }
    }

    event.preventDefault();
  }

  render() {
    return (
      <>
        <div style={{ color: "red" }} id="p1"></div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input
            type="submit"
            style={{
              backgroundColor: "black",
              borderBlockColor: "black",
              borderBlockStyle: "none",
            }}
            value="Submit"
          />
        </form>
      </>
    );
  }
}

export default App;
