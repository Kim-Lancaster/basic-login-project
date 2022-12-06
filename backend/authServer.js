const express = require('express');
const app = express();
const bcryptjs = require('bcryptjs');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const url = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_KEY}@cluster0.iklsr8u.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url);
app.use(express.json());
app.use(cors());

////////////////SIGN UP ENDPOINT////////////////////////////////////
app.post('/users/signup', async(req, res) => {
    try{
        await client.connect();//make sure we are connect to database before we continue
        console.log(req.body)
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
        res.send(await retrieveUser(req.body.userName, req.body.userPassword));
    } catch {
        res.status(505).send()
    }     
})
/////////////CHANGE PASSWORD ENDPOINT////////////////////////////////
app.put('/users/update', async(req, res) => {
    await client.connect();//make sure we are connect to database before we continue
    try {
        const hashedNewPassword = await bcryptjs.hash(req.body.newPassword, 10);
        await updatePassword(req.body.userName, hashedNewPassword);
        res.status(201).send();
    } catch {
        res.status(505).send();
    }
})
///////////////FORGOT PASSWORD ENDPOINT//////////////////////////////////
app.post('/users/forgotpassword', async(req, res) => {
    await client.connect();//make sure we are connect to database before we continue
    const user = await client.db('login_database').collection('users').findOne({email: req.body.email})
    if(user){
        //Create transporter for NODEMAILER if client exist
        let transporter = nodemailer.createTransport({
            service: "hotmail",
            secure: false,
            auth: {
                user: 'developement_test@outlook.com',
                pass: process.env.EMAIL_PASSWORD
            }
        })
        //Create TOKEN and DATE to add to database and send in email
        const date = String(new Date().getHours()) + String(new Date().getMinutes()); //The hour and minute is needed
        const key = req.body.email + date; //something that is unique each time a token is created
        const resetToken = crypto.createHash('sha512').update(key).digest('hex'); //create token to be send in email
        const hashedResetToken = await bcryptjs.hash(resetToken, 10); //hash token that will be saved to Mongodb

        //save the token and date to the database
        await client.db('login_database').collection('users').updateOne({email: req.body.email}, {$set: {token: hashedResetToken, date: date}})
        //Create email template to send with NODEMAILER
        const options = {
            from: "You made a request!",
            to: user.email,
            subject: "Test",
            text: `Per your request we has send you a reset token,
            http://localhost:3000/reset/${user.user}&${resetToken}&${req.body.email}&${date}
            please click to be re-directed to a reset page.`
        };
        let info = await transporter.sendMail(options); // saving response from sending the email
        //checking if any value is saved to the accepted array -> if yes then our API did it's part (no telling what the email provider will do)
        if(info.accepted.length > 0){
            res.send({success: true, text: 'Email sent, please check your inbox'})
        } else {
            res.send({success: false, text: 'We\'re sorry, something when wrong!'})
        }
    } else { //this is for if the email entered by the user did not match any in the database
        res.send({success: false, text: 'That email does not match.'})
    }
})
//////////////////////RESET PASSWORD ENDPOINT////////////////////////////////
app.post('/resetpassword', async(req, res) => {
    await client.connect();//make sure we are connect to database before we continue
    const { user, token, changedPassword } = req.body;
    //hashing the new password
    const hashedPassword = await bcryptjs.hash(changedPassword, 10);
    //retrieving the user from the database
    const response = await client.db('login_database').collection('users').findOne({user: user})
    //if the USER and TOKEN match in the database ONLY THEN is the password updated
    if(response && await bcryptjs.compare(token, response.token)){
        console.log('Im going to reset')
        await updatePassword(user, hashedPassword)
        res.send({success: true, text: 'Your password has been reset!'})
    } else {
        res.send({success: false, text: 'Either the user or the token did not match our database'});
    }
})
////////////////////////END OF ALL ENDPOINTS//////////////////////////////////////////////

/////////////////////////HELPER FUNCTIONS BELOW////////////////////////////////////////////////
//used to check if user is trying to use an already taken name, and to see if user is a registered user
const userExist = async(user) => {
    return await client.db('login_database').collection('users').findOne({user: user});
}

//check first if user exist and if FALSE add the user and password to the database
const addUser = async(attemptedUser, hashedPassword, email, time) => {
    if(await userExist(attemptedUser)){
        return {success: false, text: 'That user name already exist!'};
    } else {
        await client.db('login_database').collection('users').insertOne({user: attemptedUser, password: hashedPassword, email: email, createdAt: time})
        return {success: true, text: 'Account created!'};
    }
}

//check if user exist and ifTRUE check if password is correct
const retrieveUser = async(attemptedUser, attemptedPassword) => {
    if(await userExist(attemptedUser)){
        const { user, password } = await userExist(attemptedUser);  
        if(await bcryptjs.compare(attemptedPassword, password)){
            return {success: true, text: user};
        } else {
            return {success: false, text: 'User and password do not match!'};
        }
    } else {
        return {success: false, text: 'That user is not registered'};
    }
    
}
//update the password for a user - used by both update and reset endpoint
const updatePassword = async(userName, newPassword) => {
    await client.db('login_database').collection('users').updateOne({user: userName}, {$set: {password: newPassword}})
}

app.listen(3001, () => {
    console.log('I\'m listening');
});
