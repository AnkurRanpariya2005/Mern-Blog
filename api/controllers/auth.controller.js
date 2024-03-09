import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'

const signup = async(req, res, next) => {

    // getting details from body
    const {username, email, password } = req.body;

    if(!username || !password || !email || username === '' || email === '' || password === ''){
        // we use errorhandler here because we know that our middlware takes error as a argument but we doesn't have an error (in catch() we have error that's why we doesn't use error handler their). So we create our custom error in errorhandler from utils folder which return error by taking 2 arguent)
        next(errorHandler(400, "All field is required" ))
    }

    // hasing password and hashSync is used as await 
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // create newUser to save data
    const newUser = new User({
        username, 
        email, 
        password : hashedPassword
    });

    // if no error then save to databases
    try {
        await newUser.save();
        return res.status(200).json("Signup Succesfully")

    } catch (error) {
        // pass to the middleware for handling error
        next(error);
    }
    
}

const signin = async(req, res, next) => {
    
    const {email, password} = req.body;
    console.log(email)
    if(!password || !email || email === '' || password === ''){
        // we use errorhandler here because we know that our middlware takes error as a argument but we doesn't have an error (in catch() we have error that's why we doesn't use error handler their). So we create our custom error in errorhandler from utils folder which return error by taking 2 arguent)
        next(errorHandler(400, "All field is required" ))
    }

    try {
        const validUser = await User.findOne({email})

        if(!validUser){
            return next(errorHandler(400, "Email doesn't exits" ))
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if(!validPassword){
            return next(errorHandler(400, "Invalid Password" ))
        }

        const token = jwt.sign(
            {id: validUser._id},process.env.JWT_SECRETE_KEY, {expiresIn : '1d'}
        )

        const {password: pass, ...rest} = validUser._doc;

        res.status(200).cookie('access token', token, {
            httpOnly: true
        }).json(rest)

    } catch (error) {
        next(error.message)
    }
}

export {signup, signin};