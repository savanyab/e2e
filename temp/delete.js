const Nightmare = require('nightmare')
const nightmare = Nightmare({
  show: false
})

nightmare
  .goto('https://ui.sandbox.aggreg8.hu')
  .wait(2000)
  .type('#username', 'istvan.kadar.js@gmail.com')
  .type('#password', 'asdf1234')
  .click('#kc_input_button')
  .wait(5000)
  .click('#mat-tab-content-0-0 > div > app-bank-access-consent-list-component > div > div.consent-list > div > div > div:nth-child(1) > div > mat-card > mat-card-content > div.subtitle > button > span > i')
  .wait('#mat-tab-content-0-0 > div > app-edit-bank-access-consent-component > div > div > button.right.mat-raised-button > span')
  .click('#mat-tab-content-0-0 > div > app-edit-bank-access-consent-component > div > div > button.right.mat-raised-button > span')
  .wait(2000)
  .click('#revokeBtn > span')
  .wait('#mat-tab-content-0-0 > div > app-connect-new-bank-component > div > div > div.bottomButtons > button > span')
  .wait(3000)
  .end()
  .then(console.log)
  .catch(error => {
    console.error('Deleting failed:', error)
  })

