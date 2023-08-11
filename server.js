const express = require('express')
const bodyParser = require('body-parser')
const mailgun = require('mailgun-js')
const path = require('path')

var api_key = '788f69442bf76ec1c334f8b3437ef6f4-28e9457d-e4952c89';
var domain = 'sandboxae85c5628055435ba5a485f3fa85dc18.mailgun.org';

const mail = mailgun({ apiKey: api_key, domain: domain });


const application = express();
application.use(bodyParser.urlencoded({ extended: true }));

application.use(express.static(path.join(__dirname, 'public')));
application.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
});


application.post('/subscribe', (req, res) => {
    const Email = req.body.Email

    const to_say = {
        from: 'Aryan Sharma <aryansharma772004@gmail.com>',
        to: Email,
        subject: "Welcome",
        text: "Welcome, Thanks to Subscribing to our product, you will recieve daily updates here."
    };

    mail.messages().send(to_say, (error,body) => {

        if(error) {
            console.log(error);
            return res.status(500).send('Their was an error');
        }

        console.log(body);
        res.send(__dirname + '/index.html');
    });

});

application.listen(5500, () => {
    console.log("Server is running at port 5500")
})