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
            html: `<p>Name: ${newContact.username} ${newContact.phone} </p>
               <p>Email: ${newContact.email}</p>    
               <p>Message: ${newContact.notes}</p>`,
        }
        const replyMessage = {
            from: `"MENTORING TEAM" <${process.env.EMAIL}`,
            to: newContact.email,
            subject: "Reply FROM COMPANY MENTORING ",
            html: ` 
            <p>Thank You  ${newContact.username} ${newContact.phone}</p> <br>
            <p>for sending us Your message </p> <br>
            <p>WE WILL REPLY TO YOU AS SOON AS WE CAN `
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