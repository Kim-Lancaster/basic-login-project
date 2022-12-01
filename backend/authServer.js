const express = require('express');
const app = express();
const bcryptjs = require('bcryptjs');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
// const { ClientRequest } = require('http');

const url = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_KEY}@cluster0.iklsr8u.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url);
app.use(express.json());
app.use(cors());

////////////////SIGN UP ENDPOINT////////////////////////////////////
app.post('/users/signUp', async(req, res) => {
    try{
        await client.connect();//make sure we are connect to database before we continue
        const hashedPassword = await bcryptjs.hash(req.body.userPassword, 10);
        const response = await addUser(req.body.userName, hashedPassword, req.body.email, req.body.time);
        res.status(201).send(response)
    } catch(e){
        console.error(e);
    }
})
///////////////LOGIN ENDPOINT////////////////////////////////////////
app.post('/users/login', async(req, res) => {

    await client.connect();//make sure we are connect to database before we continue

    try{
        console.log(`user: ${req.body.userName}, password: ${req.body.userPassword}`)
        const response = await retrieveUser(req.body.userName, req.body.userPassword);
        if(response.success){
            res.send(response)
        } else {
            res.send(response);
        }
        res.send(response);
    } catch {
        res.status(505).send()
    }     
})
/////////////CHANGE PASSWORD ENDPOINT////////////////////////////////
app.put('/users/update', async(req, res) => {
    await client.connect();//make sure we are connect to database before we continue
    try {
        const hashedNewPassword = await bcryptjs.hash(req.body.newPassword, 10);
        const response = await updatePassword(req.body.userName, hashedNewPassword);
        res.status(201).send();
    } catch {
        res.status(505).send();
    }
})
///////////////PORGOT PASSWORD ENDPOINT//////////////////////////////////
app.post('/users/forgotpassword', async(req, res) => {
    console.log('weeee lets send an email')
    await client.connect();
    const user = await client.db('login_database').collection('users').findOne({email: req.body.email})
    console.log(user)
    if(user){
        //Create transporter if client exist
        let transporter = nodemailer.createTransport({
            service: "protonmail",
            secure: false,
            auth: {
                user: '',//only added for testing
                pass: ''//no peeking at my credentials!
            }
        })
        //Create token and date to add to database and send in email
        const date = new Date();
        const key = req.body.email + String(date); //something that is unique each time a token is created
        const resetToken = crypto.createHash('sha512').update(key).digest('hex');
        const hashedResetToken = await bcryptjs.hash(resetToken, 10);
        await client.db('login_database').collection('users').updateOne({email: req.body.email}, {$set: {token: hashedResetToken, date: date}})
        //Create email template to send with nodemailer
        //Token is un-hashed in email - read that this was the way it was done
        const options = {
            from: "You made a request!",
            to: user.email,
            subject: "Test",
            text: 'Hi this is a test'//`http://localhost:3000/reset/${resetToken}&${req.body.email}&${date}`
        };
        let info = await transporter.sendMail(options);
        console.log("Message sent: %s", info.messageId);
    } else {
        res.send('That email does not match.')
    }
})
//////////////////////ENDED HERE!!!!!!!!!!!!!!///////////////////////////
//////////////////////RESET PASSWORD ENDPOINT////////////////////////////////
app.post('http://localhost:3000/resetpassword', async(req, res) => {
    console.log('im going!')
    const email = req.query.email;
    const token = req.query.token;
    const date = req.query.date;
    const response = await client.db('login_database').collection('users').findOne({email: email})
    if(response && await bcryptjs.compare(response.date, date)){
        console.log('Im going to reset')
        res.redirect(`/reset`);
    } else {
        res.redirect('/expired');
    }
})

//used to check if user is trying to use an already taken name, and to see if user is a registered user
const userExist = async(user) => {
    return await client.db('login_database').collection('users').findOne({user: user});
}

//check first if user exist and if not add the user and password to the database
const addUser = async(attemptedUser, hashedPassword, email, time) => {
    if(await userExist(attemptedUser)){
        return {success: false, text: 'That user name already exist!'};
    } else {
        await client.db('login_database').collection('users').insertOne({user: attemptedUser, password: hashedPassword, email: email, createdAt: time})
        return {success: false, text: 'Account created!'};
    }
}

//check if user exist and if true check if password is correct
const retrieveUser = async(attemptedUser, attemptedPassword) => {
    if(await userExist(attemptedUser)){
        const { user, password } = await userExist(attemptedUser);  
        if(await bcryptjs.compare(attemptedPassword, password)){
            return {success: true, text: user};
        } else {
            return {success: false, text: 'Not Allowed'};
        }
    } else {
        return {success: false, text: 'That user is not registered'};
    }
    
}

const updatePassword = async(userName, newPassword) => {
    await client.db('login_database').collection('users').updateOne({user: userName}, {$set: {password: newPassword}})
}

app.listen(3001, () => {
    console.log('I\'m listening');
});
