const Nightmare = require('nightmare');
const expect = require('chai').expect;
const config = require('../config');


describe('e2e test', function () {
  this.timeout(600000);

  after(function (done) {
    nightmare.end().then(function () {
      done();
    });
  });

  const nightmare = Nightmare({
    show: true,
    waitTimeout: 600000
  });

  it('should redirect to login page', function (done) {
    nightmare
      .goto(config.urls.BASE_URL)
      .click(config.selectors.shareAccountButton)
      .wait(config.selectors.usernameInput)
      .evaluate(() => {
        const origin = document.location.origin;
        const pathname = document.location.pathname;
        return [origin, pathname];
      })
      .then((result) => {
        console.log(result);
        expect(result[0]).to.equal(config.urls.login_url);
        expect(result[1]).to.equal(config.urls.login_path);
        done();
      }).catch((err) => done(err))

  })

  it('should enter correct credentials', function (done) {
    nightmare
      .type(config.selectors.usernameInput, config.credentials.username)
      .type(config.selectors.passwordInput, config.credentials.password)
      .click(config.selectors.loginButton)
      .evaluate(() => {
        const usernameText = document.querySelector('#username').value;
        const passwordText = document.querySelector('#password').value;
        return [usernameText, passwordText]
      })
      .then(result => {
        console.log(result);
        expect(result[0]).to.equal(config.credentials.username);
        expect(result[1]).to.equal(config.credentials.password);
        done();
      }).catch((err) => done(err))
  })

  it('should choose OTP bank', function (done) {
    nightmare
      .wait(config.selectors.dropdown)
      .click(config.selectors.dropdown)
      .click(config.selectors.optionOTP)
      .wait()
      .click(config.selectors.connectButton)
      .wait()
      .evaluate(() => {
        const otpAccountNumber = document.querySelector('#flex > div').innerText;
        return otpAccountNumber;
      })
      .then(result => {
        console.log(result);
        expect(result).to.equal('117');
        done();
      })
      .catch((err) => done(err));
  });

  it('should enter correct netbank login credentials', function (done) {
    nightmare
      .type(config.selectors.mainAccountNumber, config.credentials.accountNumber)
      .type(config.selectors.usernameInput, config.credentials.bankUserID)
      .type(config.selectors.passwordInput, config.credentials.bankPassword)
      //.wait(2000)
      .evaluate(() => {
        const otpAccountNumber = document.querySelector('#mainAccountNumber').value;
        const otpUsername = document.querySelector('#username').value;
        const otpPassword = document.querySelector('#password').value;
        return [otpAccountNumber, otpUsername, otpPassword];
      })
      .then(result => {
        console.log(result);
        expect(result[0]).to.equal(config.credentials.accountNumber);
        expect(result[1]).to.equal(config.credentials.bankUserID);
        expect(result[2]).to.equal(config.credentials.bankPassword);
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err)
      });
  });

  it('should sync successfully', function (done) {

    this.timeout(600000);

    nightmare
      .click(config.selectors.bankLoginButton)
      .wait(config.selectors.syncDone)
      .click(config.selectors.continueButton)
      .wait(config.selectors.consentedAccountsBlock)
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

  it('should choose account', function(done) {
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
          nightmare.click("input[type=checkbox]").wait(1000);
          done();
        }
    })
    .catch((err) => {console.log(err); done(err);})
  })

  it('should allow to share chosen account', function (done) {
    nightmare
      .wait(1000)
      .click(config.selectors.shareButton)
      .wait(2000)
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
      .catch((err) => { console.log(err); done(err) });
  });

  it('should contain transactions', function (done) {
    nightmare
      .wait(config.selectors.transactionList)
      .evaluate(() => {
        const row = document.getElementsByTagName('TBODY')[0];
        return row.children.length;
      })
      .then(result => {
        console.log(result);
        expect(result).to.be.above(0);
        done();
      })
      .catch((err) => done(err));
  });

  it('should log in to ui sandbox', function (done) {
    nightmare
      .goto(config.urls.UI_URL)
      .wait(config.selectors.usernameInput)
      .type(config.selectors.usernameInput, config.credentials.username)
      .type(config.selectors.passwordInput, config.credentials.password)
      .click(config.selectors.loginButton)
      .wait(config.selectors.consentList)
      .evaluate(() => {
        const consentList = document.querySelector('#mat-tab-content-0-0 > div > app-bank-access-consent-list-component > div > div.consent-list');
        return consentList;
      })
      .then(result => {
        console.log(result);
        expect(result).to.not.be.null;
        done();
      })
      .catch((err) => done(err));
  })

  it('should delete account', function (done) {
    nightmare
      .wait(config.selectors.editModeButton)
      .click(config.selectors.editModeButton)
      .wait(config.selectors.deleteAccessButton)
      .click(config.selectors.deleteAccessButton)
      .wait(config.selectors.revokeButton)
      .click(config.selectors.revokeButton)
      .wait(config.selectors.dropdown)
      .evaluate(() => {
        const dropdown = document.querySelector('mat-select[role=listbox]');
        return dropdown;
      })
      .then(result => {
        expect(result).to.not.be.null;
        done();
      })
      .catch((err) => {
        console.log(err)
        done(err)
      });
  });

});

