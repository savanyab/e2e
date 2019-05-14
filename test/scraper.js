const Nightmare = require('nightmare');
const nightmare = Nightmare({
  show: true,
  waitTimeout: 600000
})
const expect = require('chai').expect;
const config = require('../config');

describe('e2e test', function () {
  this.timeout(30000);

  it('should redirect to login page', function (done) {
    nightmare
      .goto(config.BASE_URL)
      .click(config.shareAccountButton)
      .wait('#username')
      .evaluate(() => {
        const origin = document.location.origin;
        const pathname = document.location.pathname;
        return [origin, pathname];/*{
          emailInputId: emailInput.id,
          passwordInputId: passwordInput.id,
          loginButtonId: loginButton.id
        };*/

      })
      .then((result) => {
        console.log(result);
        expect(result[0]).to.equal(config.login_url);
        expect(result[1]).to.equal('/auth/realms/aggreg8/protocol/openid-connect/auth');
        //expect(result).to.have.property('emailInputId', 'username');
        done();
      }).catch((err) => done(err))

  })

  it('should enter correct credentials', function (done) {
    nightmare
      .type('#username', config.username)
      .type('#password', config.password)
      .click(config.loginButton)
      .evaluate(() => {
        const usernameText = document.querySelector('#username').value;
        const passwordText = document.querySelector('#password').value;
        return [usernameText, passwordText]
      })
      .then(result => {
        console.log(result);
        expect(result[0]).to.equal(config.username);
        expect(result[1]).to.equal(config.password);
        done()
      }).catch((err) => done(err))
  })

  it('should choose OTP bank', function (done) {
    nightmare
      .wait(config.dropdown)
      .click(config.dropdown)
      .click(config.optionOTP)
      .wait()
      .click(config.connectButton)
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
      .type('#mainAccountNumber', config.accountNumber)
      .type('#username', config.bankUserID)
      .type('#password', config.bankPassword)
      .wait(2000)
      .evaluate(() => {
        const otpAccountNumber = document.querySelector('#mainAccountNumber').value;
        const otpUsername = document.querySelector('#username').value;
        const otpPassword = document.querySelector('#password').value;
        return [otpAccountNumber, otpUsername, otpPassword];
      })
      .then(result => {
        console.log(result);
        expect(result[0]).to.equal('1103420034278');
        expect(result[1]).to.equal('3535419');
        expect(result[2]).to.equal('London12');
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
      .click(config.bankLoginButton)
      .wait(config.syncDone)
      .click(config.continueButton)
      .wait('#consentedAccounsBlock')
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

  it('should allow to share chosen account', function (done) {
    nightmare
      .wait(3000)
      .click(config.shareButton)
      .wait(config.confirmBlock)
      .click(config.allowButton)
      .wait("table[class=striped]")
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

  it('should contain transactions', function (done) {
    nightmare
      .wait(config.transactionList)
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
      .goto(config.UI_URL)
      .wait('#username')
      .type('#username', config.username)
      .type('#password', config.password)
      .click(config.loginButton)
      .wait('#mat-tab-content-0-0 > div > app-bank-access-consent-list-component > div > div.consent-list')
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

  // error: config is not defined...??
  it('should delete account', function (done) {
    nightmare
      .click(config.editModeButton)
      .wait(config.deleteAccessButton)
      .click(config.deleteAccessButton)
      .wait(2000)
      .click(config.revokeButton)
      .wait(3000)
      .evaluate(() => {
        const editIcon = document.querySelector(config.editModeButton);
        return editIcon;
      })
      .end()
      .then(result => {
        console.log(result)
        expect(result).to.be.null;
        done();
      })
      .catch((err) => {
        console.log(err)
        done(err)
      });
  });

});

