const express = require('express')
const app = express()
require('dotenv/config')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const Recaptcha = require('express-recaptcha').RecaptchaV2
const recaptcha = new Recaptcha(process.env.SITEKEY, process.env.SECRETKEY)

app.set('view engine', 'ejs')

app.get('/', recaptcha.middleware.render,(req, res)=> {
    res.render('index', { captcha:res.recaptcha })
  })

app.post('/', recaptcha.middleware.verify, (req, res)=> {
    if (!req.recaptcha.error) {
      console.log('success code')
      res.send("It's OK!!!")
    } else {
      console.log('error code')
      res.send("Look the Captcha...")
    }
  })

app.listen(3000, ()=> console.log('running...'))

