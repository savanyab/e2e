const { Given, When, Then } = require('cucumber');
const expect = require('chai').expect;
const Nightmare = require('nightmare');
const nightmare = Nightmare({
  show: true,
  waitTimeout: 600000
});
const config = require('../../config')
const { setDefaultTimeout } = require('cucumber');
const scraper = require('../../temp/scraper');
setDefaultTimeout(600 * 1000);

/*
Given('user has a shared account', function(done) {
    scraper.scrape()
    .then(done());
})


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
        expect(result[1]).to.exist;
        expect(result[2]).to.exist;
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