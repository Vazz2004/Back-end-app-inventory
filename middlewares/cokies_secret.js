import crypto from 'crypto'
import session from 'express-session'

const secret = crypto.randomBytes(32).toString('hex')

export const cokiesSecret = () =>
session({
    secret,
    resave:false,
    saveUninitialized:true,
    cookie:{
        secure:true,
        sameSite:'none'
    }
})