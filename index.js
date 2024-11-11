const express = require('express');
const app = express();
const fs=require('fs')
const port = 8000;
const users = require('./MOCK_DATA.json');
app.use(express.urlencoded({extended:false}))
app.get('/api/users', (req, res) => {
    return res.json(users);
});

app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map(u => `<li>${u.first_name}</li>`).join('')}
    </ul>
    `;
    res.send(html);
});
app.route('/api/users/:id').get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user || { error: "User not found" });
}).patch((req,res)=>{ 
    return res.json({status:"pending"})
}).delete((req,res)=>{
    return res.json({status:"pending"})
})


app.post('/api/users',(req,res)=>{
    const body=req.body
    console.log("Body",body)
    users.push({...body,id: users.length+1})
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        return res.json({status:"Success",id:users.length})
    })
  
})
// app.patch('/api/users/:id',(req,res)=>{
//     //TODO edit with id
//     return res.json({status:"pending"})
//  })
//  app.delete('/api/users/:id',(req,res)=>{
//     //delete usderswith ifd
//     return res.json({status:"pending"})
//  })
// app.get('/api/users/:id',(req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find(user => user.id === id);
//     return res.json(user || { error: "User not found" });
// }); 

app.listen(port, () => {
    console.log("server started at port " + port);
});
