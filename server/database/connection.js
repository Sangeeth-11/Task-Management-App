const mongoose = require('mongoose')
const connectionString = process.env.connectionString

mongoose.connect(connectionString).then(()=>{
    console.log("connected successfull")
}).catch(err=>{console.log(err)})