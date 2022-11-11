const express = require('express')
const app = express();
const bcryptjs = require('bcryptjs')
const cors = require('cors');
const { MongoClient } = require('mongodb')
const dotenv = require('dotenv')
dotenv.config();

const url = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_KEY}@cluster0.iklsr8u.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url);
app.use(express.json());
app.use(cors());


app.post('/users/signUp', async(req, res) => {
    try{
        await client.connect();//make sure we are connect to database before we continue
        const hashedPassword = await bcryptjs.hash(req.body.userPassword, 10);
        const user = {user: req.body.userName, password: hashedPassword}
        const response = await addUser(req.body.userName, hashedPassword);
        res.status(201).send(response.acknowledged)
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

//used to check if user is trying to use an already taken name, and to see if user is a registered user
const userExist = async(user) => {
    return await client.db('login_database').collection('users').findOne({user: user});
}

//check first if user exist and if not add the user and password to the database
const addUser = async(user, hashedPassword) => {
    if(await userExist(user)){
        return 'That user name already exist!'
    } else {
        return await client.db('login_database').collection('users').insertOne({user: user, password: hashedPassword})
    }
}

//check if user exist and if true check if password is correct
const retrieveUser = async(attemptedUser, attemptedPassword) => {
    const { user, password } = await userExist(attemptedUser);
    if(user){
        if(await bcryptjs.compare(attemptedPassword, password)){
            return `Success login: ${user}`;
        } else {
            return 'Not Allowed';
        }
    } else {
        return'That user is not registered';
    }
   
}

app.listen(3001, () => {
    console.log('I\'m listening');
});