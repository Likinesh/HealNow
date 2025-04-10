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

// import jwt from "jsonwebtoken";

// export const authDoc = (req, res, next) => {
//     const token = req.cookies.dtoken;
//     if (!token) return res.json({ success: false, message: "Unauthorized - no token provided" });
//     try {
//         const decoded = jwt.verify(token, process.env.SECRET_KEY);

//         if (!decoded) return res.json({ success: false, message: "Unauthorized - invalid token" });

//         next();
//     } catch (error) {
//         console.log("Error in verifyToken ", error);
//         return res.json({ success: false, message: "Server error" });
//     }
// };