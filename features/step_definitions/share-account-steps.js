const { When, Then } = require('cucumber');
const Nightmare = require('nightmare');
const nightmare = Nightmare({
  show: true,
  waitTimeout: 600000
});
const config = require('../../config')
const { setDefaultTimeout } = require('cucumber');

setDefaultTimeout(600 * 1000);

When('user starts the demo app', (callback) => {
  nightmare
    .goto(config.BASE_URL)
    .click(config.shareAccountButton)
    .wait('#username')
    .evaluate(() => {
      document.getElementById('#username');
    })
    .then((result) => {
      if(result) {
        console.log(result);
        callback();
      }
    });
});


When('he logs in with valid credentials', (callback) => {
  nightmare
    .type('#username', config.username)
    .type('#password', config.password)
    .click(config.loginButton)
    .wait(config.dropdown)
    .then(() => callback());
});



When('he chooses his account to sync', (callback) => {
  nightmare
    .click(config.dropdown)
    .click(config.optionOTP)
    .wait()
    .click(config.connectButton)
    .wait()
    .type('#mainAccountNumber', config.accountNumber)
    .type('#username', config.bankUserID)
    .type('#password', config.bankPassword)
    .click(config.bankLoginButton)
    .wait(config.syncDone)
    .click(config.continueButton)
    .wait("input[type=checkbox]")
    .wait(3000)
    .then(() => callback());
});



When('he allows to share account', (callback) => {
  nightmare
    .click(config.shareButton)
    .wait(1000)
    .wait(config.confirmBlock)
    .click(config.allowButton)
    .then(() => callback());
});



Then('he should see the list of transactions', (callback) => {
  nightmare
    .wait(config.transactionList)
    .end()
    .then(() => callback());
});