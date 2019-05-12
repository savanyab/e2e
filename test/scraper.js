const Nightmare = require('nightmare');
const nightmare = Nightmare({
  show: true,
  waitTimeout: 600000
})
const expect = require('chai').expect;

describe('e2e test', function () {
  it('start the application', function () {
    nightmare
    .goto(config.BASE_URL)
    .click(config.shareAccountButton)
    .wait()
      
    expect(nightmare.url()).to.equal('https://auth.sandbox.aggreg8.hu/auth/realms/aggreg8/protocol/openid-connect/auth?client_id=demo_go$banks-non-aisp&redirect_uri=https://demoapp.sandbox.aggreg8.hu&state=ddb9364e-0333-41a9-8741-318f0fdf131b&nonce=a1c9a915-0d74-45f2-891f-25be8ac6c2e4&response_type=code');
    done();
  })

  it('user log in', function () {
    nightmare
    .type('#username', config.username)
    .type('#password', config.password)
    .click(config.loginButton)
    .wait(config.dropdown) 
  })

  it('choose provider', function () {
    nightmare
    .click(config.dropdown)
    .click(config.optionOTP) 
    .wait()
    .click(config.connectButton)
    .wait()
  })

  it('netbank login', function () {
    nightmare
    .type('#mainAccountNumber', config.accountNumber)
    .type('#username', config.bankUserID)
    .type('#password', config.bankPassword)
    .click(config.bankLoginButton) 
    .wait(config.syncDone)
  })

  it('choose account to share', function () {
    nightmare
    .click(config.continueButton) 
    .wait("input[type=checkbox]") 
    //.click("input[type=checkbox]") // kipipálom a számlát
    .wait(3000)
    .click(config.shareButton) 
    .wait(1000)
    .wait(config.confirmBlock) 
    .click(config.allowButton)  
    .wait(config.transactionList)
  })

  it('go to clean up', function () {
    nightmare
    .goto(config.UI_URL)
    .wait(2000)
  })

  it('log in', function () {
    nightmare
    .type('#username', config.username)
    .type('#password', config.password)
    .click(config.loginButton)
    .wait(5000)
  })

  it('delete account', function (done) {
    nightmare
    .click(config.editModeButton)
    .wait(config.deleteAccessButton)
    .click(config.deleteAccessButton)
    .wait(2000)
    .click(config.revokeButton)
    .wait()
      done();
  })
})

