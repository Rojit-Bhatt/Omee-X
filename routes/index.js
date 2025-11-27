const express = require('express');
const router = express.Router();
const userModel = require('./user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('../config/google-oauth');
const crypto = require('crypto');

require('dotenv').config();





const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });
  
  // Define a function to send email
  async function sendEmail(to, subject, html) {
  
    try {
      // Compose the email
      const mailOptions = {
        from: 'ppoudel_be23@thapar.edu',
        to: to,
        subject: subject,
        html: html,
  
      };
  
      // Send the email
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  




router.get(
    "/auth/google", 
    passport.authenticate("google", {
        scope: ['profile', 'email'],
    }),
    function(req, res) {}
);

router.get('/auth/google/callback', (req, res, next) => {
  passport.authenticate('google', { failureRedirect: '/', session: false }, async (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect('/');
    }

    if (user && user._id) {
      const token = jwt.sign(user.email, process.env.TOKEN);
      res.cookie('token', token);
      return res.redirect('/profile');
    }

    try {
      const randomSecret = crypto.randomBytes(32).toString('hex');
      const passwordHash = await bcrypt.hash(randomSecret, saltRounds);

      req.session.signupData = {
        fullName: user.fullName,
        email: user.email,
        passwordHash,
        fromOAuth: true
      };

      req.session.save(() => {
        res.redirect('/signup-2');
      });
    } catch (hashError) {
      next(hashError);
    }
  })(req, res, next);
});





router.get('/', (req, res) => {
    res.render('warning');
});
router.get('/welcome', (req, res) => {
  res.render('welcome');
});
router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/signup', (req, res) => {
  delete req.session.signupData;
  res.render('signup');
});
router.get('/signup-2', (req, res) => {
  if (!req.session.signupData) {
    return res.redirect('/signup');
  }
  res.render('signup-2', { signupData: req.session.signupData });
});
router.get('/chat',isLoggedin,async (req, res) => {
  email= req.user;
  user = await userModel.findOne({email: email});
  console.log(user);
    res.render('chat',{fullname: user.fullName, email: user.email,branch: user.branch});
});
router.post('/login', async function(req, res, next) {
  
    let user = await userModel.findOne({email: req.body.email});
    if (!user) {
      res.send("User not found");
      return;
    }
    else if(await bcrypt.compare(req.body.password, user.password, function(err, result){
      if(result){
        let token = jwt.sign(req.body.email,process.env.TOKEN)
        res.cookie("token",token)
        res.redirect('/profile');
      }
      else{
        res.send("Email or Password is incorrect");
      }
    })){
      
      
    }
    
  
  })
  router.post('/signup', async function(req, res, next) {
    try {
      const email = (req.body.email || '').toLowerCase().trim();
      const fullName = (req.body.name || '').trim();
      const password = req.body.password || '';

      if (!email || !fullName || !password) {
        return res.send('Please provide name, email, and password.');
      }

      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.send('User already exists');
      }

      const passwordHash = await bcrypt.hash(password, saltRounds);
      req.session.signupData = {
        fullName,
        email,
        passwordHash
      };

      req.session.save(() => {
        res.redirect('/signup-2');
      });
    } catch (error) {
      res.send(error.message);
    }
  });

  router.post('/signup-2', async function(req, res, next) {
    const signupData = req.session.signupData;
    if (!signupData) {
      return res.redirect('/signup');
    }

    try {
      const universityRollNo = (req.body.universityRollNo || '').trim();
      const branch = (req.body.branch || '').trim();
      const phoneNumber = (req.body.phoneNumber || '').trim();

      if (!universityRollNo || !branch || !phoneNumber) {
        return res.send('Please complete all required fields.');
      }

      const newUser = await userModel.create({
        fullName: signupData.fullName,
        email: signupData.email,
        password: signupData.passwordHash,
        universityRollNo,
        branch,
        phoneNumber
      });

      delete req.session.signupData;

      const token = jwt.sign(newUser.email, process.env.TOKEN);
      res.cookie('token', token);
      res.redirect('/profile');
    } catch (error) {
      if (error && error.code === 11000) {
        return res.send('Account already exists with provided information.');
      }
      res.send(error.message);
    }
  });

  function isLoggedin(req,res,next){
    let token =  req.cookies.token;
   if(!token){
     res.redirect("/login")
  }else if (token){
    let data = jwt.verify(token,process.env.TOKEN);
    req.user = data;
    next();
  }
  }
  router.get('/logout', function(req, res, next) {
    res.cookie("token","")
    res.render('welcome');
   
  });

  router.get('/profile',isLoggedin, async function(req, res, next) {
    let email= req.user;
    
    const user =await  userModel.findOne({email: email});
    if(true){
      res.render('profile',{user, footer: true });  
    }else{
      res.redirect('/verifyemail');
    }
    
  })
  router.get('/forgetpassword', function(req, res, next) {
    res.render('forgetpassword');
  });
  router.post('/reset-password', async function(req, res, next) {
   
      
      try {
        let user = await userModel.findOne({email: req.body.email});
        if (!user) {
          res.send("Email Not Found In the Database , You could Create a new Account with Email");
          }
        else{
          await sendEmail(user.email, 'Your Email And Password for Thaparmegle', `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Thaparmegle Account Details</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            padding-bottom: 20px;
        }

        .header img {
            width: 150px;
        }

        .content {
            padding: 20px;
            line-height: 1.6;
        }

        .content h1 {
            font-size: 24px;
            margin-bottom: 20px;
            color: #0073e6;
        }

        .content p {
            margin: 10px 0;
            font-size: 16px;
        }

        .button {
            display: block;
            width: 200px;
            margin: 20px auto;
            padding: 15px;
            background-color: #0073e6;
            color: #ffffff;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }

        .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #666666;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <img src="https://ik.imagekit.io/mrigkfqmvc/Black%20and%20Beige%20Minimalist%20Aesthetic%20Modern%20Simple%20Typography%20Agency%20Logo%20(2).png?updatedAt=1724216813136" alt="Thaparmegle">
        </div>
        <div class="content">
            <h1>Welcome to UU-megle!</h1>
            <p>Hi ${user.fullName},</p>
            <p>Thank you for registering on UU-megle. Below are your account details:</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Password:</strong> ${user.password}</p>
            <a href="https://thaparmegle.com/login" class="button">Login to Thaparmegle</a>
            <p>If you didn’t request these details, please contact our support team immediately.</p>
        </div>
        <div class="footer">
            <p>Thaparmegle Team</p>
            <p><a href="https://thaparmegle.com">Visit our website</a></p>
        </div>
    </div>
</body>

</html>
`);
res.send("Pls Check Your Email For Password");
        }
      } catch (error) {
        
      }
  });

module.exports = router;