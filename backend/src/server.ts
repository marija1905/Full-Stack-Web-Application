import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './routers/user.router'
import vRouter from './routers/vikendica.router'

const app = express()

app.use(express.json({ 
    limit: '50mb' // Novi limit, npr. 50 megabajta
}));

app.use(cors())
app.use(express.json())


mongoose.connect('mongodb://127.0.0.1:27017/planinska_vikendica_2025')
const conn = mongoose.connection
conn.once('open', ()=>{
    console.log("DB ok")
})

const router = express.Router()
router.use("/users", userRouter)
router.use("/vikendica", vRouter)

app.use('/', router)
app.listen(4000, ()=>console.log('Express running on port 4000'))
