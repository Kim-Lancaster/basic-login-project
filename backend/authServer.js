const express = require('express')
const app = express();
const bcryptjs = require('bcryptjs')
const cors = require('cors');

const users = [{
    user: "me",
    password: "password"
}]
app.use(express.json());
app.use(cors());

app.get('/users', (req, res) => {
    res.json(users);
})

app.post('/users/signUp', async(req, res) => {
    try{
        const hashedPassword = await bcryptjs.hash(req.body.password, 10);
        
        const user = {user: req.body.user, password: hashedPassword}
        users.push(user)
        res.status(201).send()
    } catch(e){
        console.error(e);
    }
    
})

app.post('/users/login', async(req, res) => {
    const user = users.find(user => user.user === req.body.userName);
    try{
        if(req.body.userPassword === user.password){
            console.log('success')
            return res.status(200).send('success')
        } else {
            console.log('Incorrect password')
            return res.status(200).send("incorrect password")
        }
    } catch {
        res.status(505).send('something went wrong!')
    }
    // console.log(user);
    // if(user === null) {
    //     return res.status(400).send('Can not find user');
    // }
    // try{
    //     if(await bcryptjs.compare(req.body.password, user.password)){
    //         return res.send('Success');
    //     } else {
    //         return res.send('Not Allowed')
    //     }
    // } catch {
    //     res.status(505).send()
    // }     
})

app.listen(3001, () => {
    console.log('I\'m listening');
});