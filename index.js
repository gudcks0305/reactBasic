var express = require('express')
var app = express()
const mongoose = require('mongoose')
const {user, User} = require('./models/User')
const bodyParser = require('body-parser')
const config = require('./config/key')
app.use(bodyParser.urlencoded({extended:true}))

app.use(bodyParser.json());
mongoose.connect(config.mongoURL,{  
    useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex : true, useFindAndModify:false
}).then(() => console.log('connect is good'))
   .catch(err => console.log(err))

app.get('/', function (req, res) {
  res.send('Hello World!rr')
})
app.post('/register',(req,res)=> {
  // 회원가입 필요정보 
  const user = new User(req.body)
  user.save((err,userInfo)=>{
    if(err) return res.json({success : false, err})
    return res.status(200).json({
      success : true
    })
  })
})
app.listen(3000,console.log('is goo'))