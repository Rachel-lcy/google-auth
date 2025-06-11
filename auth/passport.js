// npm passport and passport-google-oauth20
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Users  from "../dbManager.js";
import { config } from "dotenv";

config()



passport.use(new GoogleStrategy({
  clientID:process.env.GOOGLE_CLIENT_ID,
  clientSecret:process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:"/auth/google/callback"
}, (accessToken, refreshToke, profile, done) => {
  const user = {
    id: profile.id,
    username: profile.displayName,
    role: 'user',
  }
  // save user data in DB
  Users[user.id] = user;
  return done(null, profile)
}))

// provide serialization/ deserialization logic
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => done(null, Users[id]))

export default passport