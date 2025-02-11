import jwt from 'jsonwebtoken';

//admin auth
export const authAdmin = async (req,res,next) =>{
    try {
        const {token} = req.headers;
        if(!token){
            return res.json({success:false,message:'Invalid token or token expired'});
        }
        const token_decoded = jwt.verify(token,process.env.SECRET_KEY);

        if(token_decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PWD){
            return res.json({success:false,message:'Not Authorized Login Again'});
        }

        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}