const { Given, When, Then } = require('cucumber');
const Nightmare = require('nightmare');
const nightmare = Nightmare({
    show: true,
    waitTimeout: 600000
})



Given('user is on demo app\'s login page', function () {
    
    return 'pending';
});



When('logs in with valid credentials', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


Then('should be redirected to choosing bank', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});