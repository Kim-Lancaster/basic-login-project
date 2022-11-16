const express = require('express');
const app = express();
const bcryptjs = require('bcryptjs');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const url = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_KEY}@cluster0.iklsr8u.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url);
app.use(express.json());
app.use(cors());

app.post('/users/signUp', async(req, res) => {
    try{
        await client.connect();//make sure we are connect to database before we continue
        const hashedPassword = await bcryptjs.hash(req.body.userPassword, 10);
        const response = await addUser(req.body.userName, hashedPassword);
        res.status(201).send(response)
    } catch(e){
        console.error(e);
    }
})

app.post('/users/login', async(req, res) => {

    await client.connect();//make sure we are connect to database before we continue

    try{
        const response = await retrieveUser(req.body.userName, req.body.userPassword);
        res.send(response);
    } catch {
        res.status(505).send()
    }     
})

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

app.put('/users/forgotPassword', (req, res) => {
    console.log(req.body.email);
})

//used to check if user is trying to use an already taken name, and to see if user is a registered user
const userExist = async(user) => {
    return await client.db('login_database').collection('users').findOne({user: user});
}

//check first if user exist and if not add the user and password to the database
const addUser = async(attemptedUser, hashedPassword) => {
    if(await userExist(attemptedUser)){
        return {success: false, text: 'That user name already exist!'};
    } else {
        await client.db('login_database').collection('users').insertOne({user: attemptedUser, password: hashedPassword})
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
