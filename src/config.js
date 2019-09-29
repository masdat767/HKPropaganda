const config = {
	baseUrl: process.env.NODE_ENV === 'development' ?
		"http://localhost:3000/api/" : "https://api.mylennonbuddy.com/api/"
};

export default config