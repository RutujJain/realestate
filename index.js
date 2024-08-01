const express = require('express');
const cors = require('cors');
const bcryt = require('bcrypt');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/Reactdata')
const Regi = require('./models/Regidata')
const nodemailer = require('nodemailer');

const transorter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
    },
})

app.use(express.json());
app.use(cors(
    // {
    //     origin:["http://localhost:5173"],
    //     methods:["GET","POST"],
    //     credentials:true
    // }
));

mongoose.connect('mongodb://127.0.0.1:27017/Realestate', { useNewUrlParser: true })

app.post('/insert', async (req, res) => {
    const name = req.body.name
    const phone = req.body.phone
    const email = req.body.email
    var mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: phone,
        message: `Hi ${name} Thank you for responding Ou Team will Contact you soon Please Stay in alert`
    }
    transorter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        }
        else {
            console.log('Email send Successfully')
        }
    })
    const formData = new User(
        {
            name: name,
            phone: phone,
            email: email
        }
    )
    try {
        await formData.save();
        res.send('inserted data...')
    } catch (error) {
        console.log(error)
    }
})


app.post('/regi', async (req, res) => {
    const urname = req.body.urname
    const uremail = req.body.uremail
    const urpassword = req.body.urpassword

    const RegData = new Regi(
        {
            urname: urname,
            uremail: uremail,
            urpassword: urpassword
        }
    )
    try {
        await RegData.save();
        res.sendFile("inseted...")
    } catch (error) {
        console.log(error)
    }
})

app.post('/login', async (req, res) => {
    const { uremail, urpassword } = req.body
    const usr = await Regi.findOne({ uremail })
    if (!usr) {
        return res.json({ message: 'User is Not Registerd' });
    }
    const validpass = await bcryt.compare(urpassword, usr.urpassword)
    if (!validpass) {
        return res.json({ message: "Passowrd is incorrect" });
    }
    return res.json({ message: "Login Successfully" });
})


app.listen(3001, () => {
    console.log("Server running on port 3001");
});
