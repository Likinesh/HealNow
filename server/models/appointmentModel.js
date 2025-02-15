import mongoose from "mongoose";

const appointment_schema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    docId:{
        type:String,
        required:true
    },
    slotDate:{
        type:String,
        required:true
    },
    slotTime:{
        type:String,
        required:true
    },
    userData:{
        type:Object,
        required:true
    },
    docData:{
        type:Object,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Number,
        required:true    
    },
    cancelled:{
        type:Boolean,
        default:false
    },
    payment:{
        type:Boolean,
        default:false
    },
    isCompleted:{
        type:Boolean,
        default:false
    }
})

const appointment_Model = mongoose.models.appointment || mongoose.model('appointment',appointment_schema);
export default appointment_Model;