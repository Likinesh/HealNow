import Doctor_model from "../models/doctorModel.js";

export const change_Avail = async(req,res)=>{
    try {
        const {docId} =req.body;
        const docData = await Doctor_model.findById(docId);
        await Doctor_model.findByIdAndUpdate(docId,{available : !docData.available});
        res.json({success:true,message:'Availability changed'})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}