// initialize a npm project(npm init -y) in this folder
//Create a simple express app to handle get request on home('/') route

import express from 'express'
import session from 'express-session'
import helmet from 'helmet'
import { config } from 'dotenv'
import http from 'http'
import passport from './auth/passport.js'
import router from './authRoutes.js'

//load environment variables from .env file by calling config function
config()

// const express = require('express')
// const session = require('express-session')
// const passport = require('passport')
// const GoogleStrategy = require('passport-google-oauth20').Strategy
// const helmet = require('helmet')

const app = express()
app.use(helmet())

// Adding session configuration using express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized: false,
  cookie: {secure: false}
}))

//Adding passport as middleware in express app
app.use(passport.initialize())
app.use(passport.session())

// Adding authentication routes to the express app
app.use(router)

app.get('/', (req, res) => {
  res.send('<h1>Welcome to my GoogleOAuth Lab</h1>')
})

app.get('/dashboard', (req, res) => {
  if(req.isAuthenticated()) {
    res.send("<h1> User is authenticated, Yayyy!! </h1>")
  } else{
    res.redirect('/')
  }
})
http.createServer(app).listen(3000, ()=> {
  console.log('Server started at port 3000')
})