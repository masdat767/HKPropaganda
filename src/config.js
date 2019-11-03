const config = {
	baseUrl: process.env.NODE_ENV === 'development' 
		? "https://api-dev.mylennonbuddy.com/api/"
	 	: "https://api.mylennonbuddy.com/api/",

	authUrl: process.env.NODE_ENV === 'development' 
		? "https://api-dev.mylennonbuddy.com/auth/google"
	 	: "https://api.mylennonbuddy.com/auth/google"
};

export default config
