import axios from "axios";

const verify = async(url) => {
	try {
		const response = await axios.get(
			`http://localhost:5000/tweet?message=${encodeURIComponent((url))}`,
		);

		const result = response.data.verified;
		console.log("tweet verification", result, response);

		return result

	} catch (err) {
		console.error(err);
	}
};

export default verify;
