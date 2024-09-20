import axios from "axios";

const getFollowers = async (userId) => {
	try {
		const response = await axios.get(
			`http://localhost:5000/api/followers/${userId}`
		);
		console.log("response date :", response.data);
		return response.data;
	} catch (err) {
		setError("Failed to fetch followers");
		console.error(err);
	}
};

export default getFollowers;
