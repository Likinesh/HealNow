import jwt from 'jsonwebtoken';

//admin User
export const UserAdmin = async (req,res,next) =>{
    try {
        const {utoken} = req.headers;
        if(!utoken){
            return res.json({success:false,message:'Invalid token or token expired'});
        }
        const token_decoded = jwt.verify(utoken,process.env.SECRET_KEY);

        req.body.userId = token_decoded.id
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}