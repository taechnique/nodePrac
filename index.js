
const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config/key')

const { User } = require("./models/User")


//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true})) ;

app.use(bodyParser.json());
app.use(cookieParser());
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('MongoDB Connected ...'))
    .catch(err => console.log(err))



app.get('/', (req, res) => {
    res.send('Hello World dd!')
})

app.post('/register',(req,res) => {
    const user = new User(req.body)

    user.save((err,userInfo) => {
       if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/login',(req,res) =>{
    //요청된 이메일을 데이터베이스에서 중복확인
    User.findOne({email: req.body.email },(err,user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "없는 이메일입니다."
            })
        }
        //비밀번호 확인
        user.comparePassword(req.body.password,(err,isMatch) => {
            if(!isMatch)
                return res.json({loginSuccess: false, message:"비밀번호가 틀림"})
        })
        //비밀번호 맞다면 토큰생성
        user.generateToken((err, user) =>{
            if(err) return res.status(400).send(err)

            res.cookie("x_auth",user.token)
                .status(200)
                .json({loginSuccess: true, userId: user._id})

        })
    })


})
app.listen(port, () => {
    console.log('Example app listening at http://localhost:'+port)
})