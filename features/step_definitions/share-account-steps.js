const { Given, When, Then } = require('cucumber');
const expect = require('chai').expect;
const Nightmare = require('nightmare');
const nightmare = Nightmare({
  show: true,
  waitTimeout: 600000
});
const config = require('../../config');
const { setDefaultTimeout } = require('cucumber');

setDefaultTimeout(600 * 1000);

When('user starts the demo app', (done) => {
  nightmare
    .goto(config.urls.BASE_URL)
    .click(config.selectors.shareAccountButton)
    .wait('#username')
    .evaluate(() => {
      const origin = document.location.origin;
      const pathname = document.location.pathname;
      return [origin, pathname];
    })
    .then((result) => {
      expect(result[0]).to.equal(config.urls.login_url);
      expect(result[1]).to.equal('/auth/realms/aggreg8/protocol/openid-connect/auth');
      done();
    }).catch((err) => done(err));
});


When('he logs in with valid credentials', (done) => {
  nightmare
    .type('#username', config.credentials.username)
    .type('#password', config.credentials.password)
    .click(config.selectors.loginButton)
    .wait(3000)
    .evaluate(() => {
      const forms = document.forms;
      return forms;
    })
    .then((result) => {
      expect(result.length).to.not.equal(0);
      done();
    })
    .catch((err) => done(err));
});



When('he chooses his account to sync', { timeout: 300 * 1000 }, (done) => {
  nightmare
    .wait(config.selectors.dropdown)
    .click(config.selectors.dropdown)
    .click(config.selectors.optionOTP)
    .wait()
    .click(config.selectors.connectButton)
    .wait()
    .type('#mainAccountNumber', config.credentials.accountNumber)
    .type('#username', config.credentials.bankUserID)
    .type('#password', config.credentials.bankPassword)
    .click(config.selectors.bankLoginButton)
    .wait(config.selectors.syncDone)
    .click(config.selectors.continueButton)
    .wait("#consentedAccounsBlock")
    .wait(3000)
    .evaluate(() => {
      const elem = document.querySelector('#consentedAccounsBlock');
      return elem;
    })
    .then(result => {
      console.log(result);
      expect(result).to.not.be.null;
      done();
    })
    .catch((err) => done(err));
});



When('he allows to share account', (done) => {
  nightmare
    .click(config.selectors.shareButton)
    .wait(config.selectors.confirmBlock)
    .click(config.selectors.allowButton)
    .wait(config.selectors.transactionList)
    .evaluate(() => {
      const transactionList = document.getElementsByClassName('.transaction-list');
      return transactionList;
    })
    .then(result => {
      expect(result).to.not.be.null;
      done();
    })
    .catch((err) => done(err));
});



Then('he should see the list of transactions', (done) => {
  nightmare
    .wait(config.selectors.transactionList)
    .evaluate(() => {
      const table = document.getElementsByTagName('TBODY')[0];
      return table.children.length;
    })
    .end()
    .then(result => {
      console.log(result);
      expect(result).to.be.above(0);
      done();
    })
    .catch((err) => done(err));
});
/*

Given('user is on demo app\'s login page', function (done) {
  nightmare
    .goto('https://ui.sandbox.aggreg8.hu')
    .wait(2000)
    .evaluate(() => {
      const usernameInput = document.getElementById('#username');
      const passwordInput = document.getElementById('#password');
      const loginButton = document.getElementById('#kc_input_button');
      return usernameInput;
    })
    .then((result) => {
      expect(result).to.exist;
      //expect(result[1]).to.exist;
      //expect(result[2]).to.exist;
      done();
    })
    .catch((err) => done(err));
});

When('he chooses to edit permissions of account', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('he chooses to revoke permission', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('the account should not be available', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});
*/