import axios from "axios";

const findUser = async (username, wallet) => {
	try {
		const response = await axios.get(
			`http://localhost:5000/user/find?user=${encodeURIComponent(
				username
			)}&wallet=${encodeURIComponent(wallet)}`
		);

        console.log("User found:", response.data.userFound, response.data.inserted);
        if (response.data.userFound)
            return 1; // Return the user data
        else
            return -1
	} catch (error) {
		console.error("Error fetching user:", error);
		return null; // Return null in case of error
	}
};

export default findUser