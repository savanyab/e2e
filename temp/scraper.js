const Nightmare = require('nightmare');
const nightmare = Nightmare({
  show: true,
  waitTimeout: 600000
})
const config = require('../config')

exports.scrape =

function scrape() {
nightmare
  .goto(config.BASE_URL)
  .click(config.shareAccountButton)
  .wait()
  .type('#username', config.username)
  .type('#password', config.password)
  .click(config.loginButton)
  .wait(config.dropdown)
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
  .click(config.shareButton)
  .wait(1000)
  .wait(config.confirmBlock)
  .click(config.allowButton)
  .wait(config.transactionList)
  .end()
  .then()
  .catch(error => {
    console.error('Search failed:', error)
  })
}