var express = require('express')
var app = express()
const mongoose = require('mongoose')
const {user, User} = require('./models/User')
const bodyParser = require('body-parser')
const config = require('./config/key')
const cookieParser = require('cookie-parser')
const {auth} = require('../middleware/auth')
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser());
app.use(bodyParser.json());
mongoose.connect(config.mongoURL,{  
    useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex : true, useFindAndModify:false
}).then(() => console.log('connect is good'))
   .catch(err => console.log(err))



app.get('/', function (req, res) {
  res.send('Hello World!rr')
})


app.post('/api/users/register',(req,res)=> {
  // 회원가입 필요정보
  const user = new User(req.body)
  user.save((err,userInfo)=>{
    if(err) return res.json({success : false, err})
    return res.status(200).json({
      success : true
    })
  })
})


app.post('/api/users/login',(req,res)=>{
  // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({email : req.body.email}, (err,user)=>{
    if(!user){ 
      return res.json({
        loginSuccess: false,
        message : "제공된 이메일과 맞는 유저가 없습니다."
      })
    }
    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀 번호인지 확인
  user.comparePassword(req.body.password,(err,isMatch)=>{
    console.log(err,isMatch)
    if(!isMatch){
      return res.json({loginSuccess : false, message : "로그인이 실패했습니다."})
    }


    
  })
  // 비밀번호까지 맞다면 토큰 생성 
  user.generateToken((err,user)=>{
    if(err) return res.status(400).send(err)
    //토큰을 어디에 저장?? 로컬 , 쿠키 ??
    res.cookie('x_auth',user.token).status(200).json({loginSuccess:true,userId:user._id})
    
  })
  })

})




app.get('/api/users/auth', auth ,(req,res)=>{
 //미들웨어 통과를 햇다는건 어센틱케이션 트루
 res.status(200).json({
   _id : req.user._id,
   isAdmin : req.user.role === 0 ? false : true,
   isAuth : true,
   email: req.user.email,
   name : req.user.name,
   lastname : req.user.lastname,
   role : req.user.role,
   image:req.user.image
 })
})

app.get('/api/hello',(req,res)=>{
  res.send('안녕하세요')
})


app.get('/api/users/logout', auth , (req,res) =>{
  User.findOneAndUpdate({ _id : req.user._id} , 
    {token : ""},
    function(err,user){
      if(err) return res.json({success : false , err})
      return res.status(200).send({
        success : true
      })
    })
})

  
 
app.listen(5000,console.log('is good'))