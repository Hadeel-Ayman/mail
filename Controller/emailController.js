require('dotenv').config()
const Contact = require('../Model/emailModel')
const nodemailer = require('nodemailer')

//transport  function
exports.mail = async (req, res, next) => {

    const {
        username,
        email,
        phone,
        projectDescription,
        composition,
        targetGroup,
        vision,
        offer,
        projectOption,
        projectStatus,
        business,
        pattern,
        notes,
        typeLogo,
        checkboxes
    } = req.body;

    const newContact = new Contact({
        username,
        email,
        phone,
        projectDescription,
        composition,
        targetGroup,
        vision,
        offer,
        projectOption,
        projectStatus,
        business,
        pattern,
        notes,
        typeLogo,
        checkboxes
    });
    try {
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            port: 465,
            secure: true,
            logger: true,
            debug: true,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.PASSWORD
            },
            tls: {
                // rejectUnauthorized: true
            }
        })

        let mailOptions = {
            from: `"${newContact.email}" <${newContact.username}>`, // sender address  ,
            to: process.env.EMAIL,

            subject: "OPPORTUNITY MENTORING WEBSITE EMAIL ",
            // <p>Information /<br>Name: ${newContact.username}<br>Email: ${newContact.email}<br>Phone: ${newContact.phone}</p>
            // <p>Project Details /<br>Description of project: ${newContact.projectDescription}<br>Competitors: ${newContact.composition}<br>Target group: ${newContact.targetGroup}<br>Vision: ${newContact.vision}<br>Competitive advantage: {}<br>Project status: ${newContact.projectStatus}<br>Business serves: ${newContact.business}<br>Project name chosen: ${newContact.projectOption}</p>
            // <p>Design Details /<br>- Business Name Suggestion:<br>- Tagline Suggestion: <br>- Logo Design: <br>- Identity Elements Design:<br>- Logo and Visual Identity Development:<br>- Packaging Design:<br>- Corporate Identity and Printed Materials Design: <br>- Brand Identity Guidelines:<br>- Print Company Profile Design: <br>- Interactive Company Profile Design: </p>
            // <p>Type of Logo design /<br>- Word Mark: <br>- Letter Mark: <br>- Pictorial Mark: <br>- Abstract Mark: <br>- Mascot Logo: <br>- Combination Mark: <br>- Emblem Logo: </p>
            // <p>Preferred style: ${newContact.pattern}</p>
            html: `
            <p>${newContact.typeLogo.map((items) => (`<li>${items}</li>`).join(''))}</p>
            <p>${newContact.checkboxes.map((item) => (`<li>${item}</li>`).join(''))}</p>
            <p>Notes /<br> ${newContact.notes}</p>`,
        }
        const replyMessage = {
            from: `"MENTORING TEAM" <${process.env.EMAIL}`,
            to: newContact.email,
            subject: "Reply FROM COMPANY MENTORING ",
            html: `<p>Information /<br>Name: ${newContact.username}<br>Email: ${newContact.email}<br>Phone: ${newContact.phone}</p>
            <p>Project Details /<br>Description of project: ${newContact.projectDescription}<br>Competitors: ${newContact.composition}<br>Target group: ${newContact.targetGroup}<br>Vision: ${newContact.vision}<br>Competitive advantage: {}<br>Project status: ${newContact.projectStatus}<br>Business serves: ${newContact.business}<br>Project name chosen: ${newContact.projectOption}</p>
            <p>Design Details /<br>- Business Name Suggestion:<br>- Tagline Suggestion: <br>- Logo Design: <br>- Identity Elements Design:<br>- Logo and Visual Identity Development:<br>- Packaging Design:<br>- Corporate Identity and Printed Materials Design: <br>- Brand Identity Guidelines:<br>- Print Company Profile Design: <br>- Interactive Company Profile Design: </p>
            <p>Type of Logo design /<br>- Word Mark: <br>- Letter Mark: <br>- Pictorial Mark: <br>- Abstract Mark: <br>- Mascot Logo: <br>- Combination Mark: <br>- Emblem Logo: </p>
            <p>Preferred style: ${newContact.pattern}</p>
            <p>Notes /<br> ${newContact.notes}</p>`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
            }
            console.log("Email Sent with success")
        })
        transporter.sendMail(replyMessage, (error) => {
            if (error) {
                console.log(error)
            }
            console.log("Reply Sent with success")
        })

        res.status(201).json({
            success: true,
            newContact: req.body,
        })

    } catch (error) {
        next(error);
    }
}

//  get the message function controller
exports.contact = async (req, res) => {

    try {
        const contact = await Contact.find({});
        res.status(200).send(contact)

    } catch (error) {
        console.log(error)
    }
}