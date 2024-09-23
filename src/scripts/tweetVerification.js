import axios from "axios";

const verify = async(apiUrl, url) => {
	try {
		console.log("api alive", apiUrl)
		const response = await axios.get(
			`${apiUrl}/tweet?message=${encodeURIComponent((url))}`,
		);

		const result = response.data.verified;
		console.log("tweet verification", result, response);

		return result

	} catch (err) {
		console.error(err);
	}
};

export default verify;
