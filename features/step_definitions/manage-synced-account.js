const { Given, When, Then } = require('cucumber');
const expect = require('chai').expect;
const AfterAll = require('cucumber').AfterAll;
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

When('he chooses his account to share', (done) => {
  nightmare
    .evaluate(()=> {
      const checked = document.getElementsByTagName("INPUT")[2].getAttribute("aria-checked");
      return checked;
    })
    .then((result)=> {
        console.log(result);        
        if (result == 'true') { 
          done();
        } else {
          nightmare.click("input[type=checkbox]");
          done();
        }
    })
    .catch((err) => {console.log(err); done(err);})
})



When('he allows to share account', (done) => {
  nightmare
    .wait(1000)
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
    .then(result => {
      console.log(result);
      expect(result).to.be.above(0);
      done();
    })
    .catch((err) => done(err));
});


Given('user is on demo app\'s login page', function (done) {
  nightmare
    .goto(config.urls.UI_URL)
    .wait(3000)
    .wait('#username')
    .evaluate(() => {
      const usernameInput = document.querySelector('#username');
      return usernameInput.id   
    })
    .then((result) => {
      expect(result).to.equal('username');
      done();
    })
    .catch((err) => { done(err) });
});

When('he chooses to edit permissions of account', function (done) {
  nightmare
    .wait(config.selectors.editModeButton)
    .click(config.selectors.editModeButton)
    .wait(config.selectors.deleteAcessButton)
    .evaluate(() => {
      const deleteButton = document.querySelector('#mat-tab-content-0-0 > div > app-edit-bank-access-consent-component > div > div > button.right.mat-raised-button > span')
      return deleteButton;
    })
    .then((result) => {
      console.log("deletebutton: " + result);
      expect(result).to.not.be.null;
      done();
    })
    .catch((err) => done(err));
});

When('he chooses to revoke permission', function (done) {
  nightmare
    .wait(2000)
    .click(config.selectors.revokeButton)
    .wait(3000)
    .evaluate(() => {
      const revokeButton = document.querySelector('#revokeBtn > span');
      return revokeButton;
    })
    .end()
    .then((result) => {
      expect(result).to.be.null;
      done();
    })
    .catch((err) => done(err));

});

Then('the account should not be available', function (done) {
  nightmare
    .evaluate(() => {
      const dropdown = document.querySelector('mat-select[role=listbox]');
      return dropdown;
    })
    .then((result) => {
      console.log(result);
      expect(result).to.not.be.null;
      done();
    })
    .catch((err) => done(err));
});
