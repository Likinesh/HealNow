import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId,Token_name) => {
	const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
		expiresIn: "1d",
	});
	// console.log(token);
	res.cookie(Token_name, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 24 * 60 * 60 * 1000,
	});

	return token;
};