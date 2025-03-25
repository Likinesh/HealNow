// import jwt from 'jsonwebtoken';

// //admin auth
// export const authAdmin = async (req,res,next) =>{
//     try {
//         const {token} = req.headers;
//         if(!token){
//             return res.json({success:false,message:'Invalid token or token expired'});
//         }
//         const token_decoded = jwt.verify(token,process.env.SECRET_KEY);

//         if(token_decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PWD){
//             return res.json({success:false,message:'Not Authorized Login Again'});
//         }

//         next();
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:error.message});
//     }
// }


import jwt from "jsonwebtoken";

export const authAdmin = (req, res, next) => {
	const token = req.cookies.token;
	if (!token) return res.json({ success: false, message: "Unauthorized - no token provided" });
	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY);

		if (!decoded) return res.json({ success: false, message: "Unauthorized - invalid token" });

		next();
	} catch (error) {
		console.log("Error in verifyToken ", error);
		return res.status(500).json({ success: false, message: "Server error" });
	}
};