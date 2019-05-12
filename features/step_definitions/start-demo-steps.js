const { Given, When, Then } = require('cucumber');


Given('user is on demo app\'s homepage', function () {
    return nightmare.goto('https://demoapp.sandbox.aggreg8.hu').then().catch();    
});

When('clicks on share account history', function () {
    return nightmare.click('#share-account-button').then().catch();
});

Then('should be redirected to login page', function () {
    return nightmare.url() == 'https://auth.sandbox.aggreg8.hu/auth/realms/aggreg8/protocol/openid-connect/auth?client_id=demo_go$banks-non-aisp&redirect_uri=https://demoapp.sandbox.aggreg8.hu&state=ddb9364e-0333-41a9-8741-318f0fdf131b&nonce=a1c9a915-0d74-45f2-891f-25be8ac6c2e4&response_type=code';
});