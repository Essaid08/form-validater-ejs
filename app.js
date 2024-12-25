const dotenv = require('dotenv')
dotenv.config()

const express = require('express') ;
const cors = require('cors')
const path = require('path')
const app = express() ;
const userRouter = require("./routes/userRouter")

app.use(cors())
app.use(express.urlencoded({extended : true}));

app.set("views" , path.join(__dirname , "views") )
app.set('view engine' , "ejs");

app.use('/' , userRouter) ;

const PORT = process.env.PORT || 3000

app.listen(PORT , () => {
    console.log("server is running on PORT : ", PORT)
})