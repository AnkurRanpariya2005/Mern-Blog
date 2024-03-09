import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './routes/user.route.js'
import authRoute from './routes/auth.route.js'
import cors from 'cors'

const app = express();
dotenv.config()
app.use(express.json())
app.use(cors())
// getting port from env
const port = process.env.PORT

// Mongobd databses
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Mongoose connected Sucessulggul   "))
.catch((err) => console.log(err))


//Create server
app.listen(port, ()=>{
    console.log(`App is listen on 8000`)
})


//Router
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute)


//middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"
    res.status(statusCode).json({
        statusCode,
        success: false,
        message
    })
})