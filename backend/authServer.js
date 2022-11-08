const express = require('express')
const app = express();
const bcryptjs = require('bcryptjs')

const users = [{
    user: "me",
    password: "password"
}]
app.use(express.json());

app.get('/users', (req, res) => {
    res.json(users);
})

app.post('/users', async(req, res) => {
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
    const user = users.find(user => user.user === req.body.user);
    console.log(user);
    if(user === null) {
        return res.status(400).send('Can not find user');
    }
    try{
        if(await bcryptjs.compare(req.body.password, user.password)){
            return res.send('Success');
        } else {
            return res.send('Not Allowed')
        }
    } catch {
        res.status(505).send()
    }     
})

app.listen(3000, () => {
    console.log('I\'m listening');
});