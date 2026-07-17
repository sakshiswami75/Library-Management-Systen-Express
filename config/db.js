const mongoose = require('mongoose')

async function connectDB(){
    try{
        await mongoose.connect(process.env.URI)
        console.log("DB Connected")
    }catch(e){
        console.log(e)
        process.exit(1)
    }
}

module.exports=connectDB