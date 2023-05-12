const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema(
    {
        company:{
            type:String,
            required:[true,'Please provide a company name'],
            maxlength:50
        },
        position:{
            type:String,
            required:[true,'Please provide a position name'],
            maxlength:50
        },
        status:{
            type:String,
            enum:['pending','interview','declined'],
            default:'pending'
        },
        createdBy:{
            type:mongoose.Types.ObjectId,
            ref:'User',
            required:[true,"please provide a user"]
        }
    },
    {timestamps:true}
)

module.exports = mongoose.model('Jobs',jobSchema)