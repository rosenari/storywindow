const request = require('request-promise');

class SMS {
    constructor() {
        this.from = `${process.env.phone_number}`;
        this.fatherphone = `${process.env.father_phone}`;
        this.developerphone = `${process.env.developer_phone}`;
        this.auth = {
            sens_serviceID: `${process.env.sens_serviceID}`,
            accesskeyID: `${process.env.accesskeyID}`,
            sens_secretKey: `${process.env.sens_secretKey}`
        };
    }

    createSMSRequestBody(to, message) {
        return {
            method: 'POST',
            json: true,
            uri: `https://api-sens.ncloud.com/v1/sms/services/${this.auth.sens_serviceID}/messages/`,
            headers: {
                'Content-Type': 'application/json',
                'X-NCP-auth-key': this.auth.accesskeyID,
                'X-NCP-service-secret': this.auth.sens_secretKey
            },
            body: {
                type: 'sms',
                from: this.from,
                to: to,
                content: message
            }
        }
    }

    storyPhoneList() {
        return [this.from, this.fatherphone, this.developerphone];
    }

    push(to, message) {
        console.log("push");
        return request(this.createSMSRequestBody(to, message));
    }
}

module.exports = (function () {
    return new SMS();
})();