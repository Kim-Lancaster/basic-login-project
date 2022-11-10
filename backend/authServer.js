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
        const hashedPassword = await bcryptjs.hash(req.body.userPassword, 10);
        const user = {user: req.body.userName, password: hashedPassword}
        users.push(user)
        console.log(user)
        res.status(201).send(user)
    } catch(e){
        console.error(e);
    }
})

app.post('/users/login', async(req, res) => {
    const user = users.find(user => user.user === req.body.userName);
    
    console.log(user);
    if(user === null) {
        return res.status(400).send('Can not find user');
    }
    try{
        if(await bcryptjs.compare(req.body.userPassword, user.password)){
            return res.send(`Success: ${user.user}`);
        } else {
            return res.send('Not Allowed')
        }
    } catch {
        res.status(505).send()
    }     
})

app.listen(3001, () => {
    console.log('I\'m listening');
});