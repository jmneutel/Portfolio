var express = require("express");
var router = express.Router();
var path = require("path");
var nodemailer = require("nodemailer");

router.get('/', function(req, res) {
    res.render('index');
})

router.post('/contact/send', function(req, res, next) {
    var transporter = nodemailer.createTransport({

        service: 'Gmail',
        auth: {
            user: 'codeemailtester@gmail.com',
            pass: 'password12345'
        }
    });

    var mailOptions = {

        from: 'Website User <codeemailtester@gmail.com>',
        to: 'jaredneutel@gmail.com',
        subject: 'Website Submission from jaredneutel.com',
        text: 'You have a new submission with the folowing details...Name: ' + req.body.first_name + ' ' + req.body.last_name + ' Email: ' + req.body.email + ' Phone Number: ' + req.body.phone + ' Address: ' + req.body.address + ', ' + req.body.city + ', ' + req.body.state + ', ' + req.body.zip + ' Message: ' + req.body.comment,
        html: '<p>You got a new submission with the following details</p><ul><li>Name: ' + req.body.first_name + ' ' + req.body.last_name + '</li><li>Email: ' + req.body.email + '</li><li>Phone Number: ' + req.body.phone + '</li><li>Address: ' + req.body.address + ', ' + req.body.city + ', ' + req.body.state + ', ' + req.body.zip + '</li><li>Message: ' + req.body.comment + '</li></ul>'

    };

    transporter.sendMail(mailOptions, function(error, info) {

        if (error) {
            console.log(error);
            res.redirect('/');
        } else {
            console.log('Message Sent: ' + info.response);
            res.redirect('/');

        }
    })
});

router.use('/', express.static('public'));

module.exports = router;
