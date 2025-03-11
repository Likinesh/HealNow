import jwt from 'jsonwebtoken';

//admin auth
export const authDoc = async (req,res,next) =>{
    try {
        const {dToken} = req.headers;
        if(!dToken){
            return res.json({success:false,message:'Invalid token or token expired'});
        }
        const token_decoded = jwt.verify(dToken,process.env.SECRET_KEY);

        req.body.docId = token_decoded.id;

        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}