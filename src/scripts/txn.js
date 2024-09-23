import axios from "axios";

const handleSendEth = async (apiUrl, recipient, amount) => {
	try {
		// Make a POST request to the backend to initiate the transaction
		const response = await axios.post(
			`${apiUrl}/send-eth`,
			{
				recipient,
				amount,
			},
			{
				headers: {
					"Content-Type":
						"application/json",
				},
			}
		);
		console.log(
			"Transaction hash:",
			response.data.transactionHash
		);
	} catch (error) {
		console.error("Error sending ETH:", error);
	}
};

export default handleSendEth;
