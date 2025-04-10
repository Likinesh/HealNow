import jwt from 'jsonwebtoken';

//admin User
export const UserAdmin = async (req,res,next) =>{
    try {
        const {utoken} = req.headers;
        console.log(utoken);
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

// import jwt from "jsonwebtoken";

// export const UserAdmin = (req, res, next) => {
//     const token = req.cookies.utoken;
//     if (!token) return res.json({ success: false, message: "Unauthorized - no token provided" });
//     try {
//         const decoded = jwt.verify(token, process.env.SECRET_KEY);

//         if (!decoded) return res.json({ success: false, message: "Unauthorized - invalid token" });
//         console.log(decoded);
//         req.user=decoded;
//         next();
//     } catch (error) {
//         console.log("Error in verifyToken ", error);
//         return res.status(500).json({ success: false, message: "Server error" });
//     }
// };