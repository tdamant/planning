class FakeTwilioClientMessages {
    constructor() {
        this.sent = [];
    }
        create (to) {
            this.sent.push({to: to.to, from: to.from, body: to.body});
        }
};

class FakeTwilioClient {
    constructor() {
        this.messages = new FakeTwilioClientMessages();
    }
};

module.exports = FakeTwilioClient;


