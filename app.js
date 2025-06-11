// initialize a npm project(npm init -y) in this folder
//Create a simple express app to handle get request on home('/') route

import express from 'express'
import session from 'express-session'
import helmet from 'helmet'
import { config } from 'dotenv'
import http from 'http'

//load environment variables from .env file by calling config function
config()

// const express = require('express')
// const session = require('express-session')
// const passport = require('passport')
// const GoogleStrategy = require('passport-google-oauth20').Strategy
// const helmet = require('helmet')

const app = express()

// adding session configuration using express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized: false,
  cookie: {secure: false}
}))

app.get('/', (req, res) => {
  res.send('<h1>Welcome to my GoogleOAuth Lab</h1>')
})




http.createServer(app).listen(3000, ()=> {
  console.log('Server started at port 3000')
})