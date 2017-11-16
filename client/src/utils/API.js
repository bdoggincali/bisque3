import axios from "axios";

export default {

  // Saves a Account to the database
  registerAccount: function (Data) {
    return axios.post("account/register", Data);
  },
  // Logs in a rep
  loginAccount: function (Data) {
    console.log("logging in to account..API.js");
    return axios.post("account/login", Data);
    console.log("data from API.js: " + Data);
  },
  // Gets all Accounts
  getAccounts: function() {
    console.log("getAccounts function..API.js");
    return axios.get("index/dashboard");
  },
  // Gets the Account with the given id
  getAccount: function(id) {
    return axios.get("/index/customer/" + id);
  },
  // Archive the Account with the given id
  archiveAccount: function(id) {
    return axios.delete("/api/accounts/" + id);
  },
  // Saves a Account to the database
  postProducts: function (Data) {
    console.log("posting product..API.js");
    return axios.post("index/postProducts", Data);
  },
};
