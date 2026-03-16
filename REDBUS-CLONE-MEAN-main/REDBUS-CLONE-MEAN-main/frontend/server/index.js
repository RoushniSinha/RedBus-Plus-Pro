const express=require('express')
const bodyparser=require('body-parser')
const cors =require('cors')
const mongoose=require('mongoose')

require('dotenv').config()

const app=express();

app.use(cors());
app.use(bodyparser.json())
app.use('/stories', bodyparser.json({ limit: '10mb' }))
const customerroutes=require("./routes/customer");
const routesroute=require("./routes/route");
const bookingroute=require("./routes/booking")
const authroute=require("./routes/auth")
const travelStoryRoute=require("./routes/travelStory")
const reviewRoute=require("./routes/review")
const routePlanningRoute=require("./routes/routePlanning")
app.use(bookingroute)
app.use(routesroute)
app.use(customerroutes)
app.use(authroute)
app.use(travelStoryRoute)
app.use(reviewRoute)
app.use(routePlanningRoute)

const DBURL=process.env.MONGODB_URI || "mongodb://localhost:27017/redbus"
mongoose.connect(DBURL)
.then(()=> console.log("Mongodb connected"))
.catch(err=> console.error('Mongodb connection error:' ,err))

app.get('/',(req,res)=>{
    res.send('Hello , Ted bus is working')
})

const PORT= process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
