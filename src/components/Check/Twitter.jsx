import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import verify from "../../scripts/tweetVerification.js";
import axios from "axios";

export default function Twitter({ isVerified }) {
	const apiUrl =
		import.meta.env.VITE_API_URL ||
		"https://sky-money.onrender.com/";

	console.log("twitter apiUrl", apiUrl);

	const [isFollowing, setIsFollowing] = useState(false);
	const [isPost, setIsPost] = useState(false);
	const [url, setUrl] = useState("");

	const twitterUrl = "https://twitter.com/intent/tweet";
	const text = `MakerDAO is now Sky! Get ready to upgrade to $USDS and $SKY on 18 Sept.
Just signed up for the Early Bird Bonus on http://Sky.Money.
Get double rewards for the first month after launch if you're eligible 
@SkyEcosystem`;

	const postHref = `${twitterUrl}?text=${encodeURIComponent(text)}`;

	useEffect(() => {
		const check = async () => {
			try {
				const response = await axios.get(
					`${apiUrl}`
				);

				const result = response.data;
				console.log(
					"check verification alive",
					result,
					response
				);
			} catch (err) {
				console.error(err);
			}
		};

		check();
	}, [isFollowing]);

	const handleSubmit = (e) => {
		e.preventDefault(); // Prevents default form behavior
		handleVerify(url); // Call verify function with the username
	};

	const handleVerify = async (url) => {
		console.log("url", url);
		if (isFollowing) {
			try {
				const result = await verify(
					apiUrl,
					url
				); // Assuming `verify` is an async function
				console.log("result", result);

				if (result) {
					setIsPost(true); // Update state if result is true
					isVerified(true); // Mark as verified
				} else {
					console.log(
						"Verification failed"
					);
				}
			} catch (error) {
				console.error(
					"Error during verification:",
					error
				);
			}
		} else {
			console.log("User is not following");
		}
	};

	return (
		<div className="bg-[#5a3ba2] m-2 p-3 text-white rounded-lg">
			<div className="flex flex-row items-center gap-3 font-semibold pb-3">
				<div className="rounded-full bg-[#2d2d52] px-[1.125rem] py-2.5">
					1
				</div>
				<h3>
					Join Sky.money, and tell the
					world about Sky
				</h3>
			</div>

			<ul className=" p-4 ps-6">
				<li className="pb-2 flex flex-row">
					Follow on X:{" "}
					<a
						className="bg-[#2d2d52] px-2.5 py-1.5 rounded-xl ms-2"
						href="https://x.com/SkyEcoSystem"
						target="_blank"
						rel="noopener noreferrer"
						onClick={() => {
							setIsFollowing(
								true
							);
						}}
					>
						@SkyEcoSystem
					</a>
					{isFollowing && (
						<div className="ms-2 bg-blue-600 rounded-full px-3 flex justify-center items-center">
							<FontAwesomeIcon
								icon={
									faCheck
								}
							/>
						</div>
					)}
					{/* check functionality */}
				</li>
				<li className="pb-2 flex flex-row">
					Click Post to share the Promo
					Announcement:
					<a
						className="bg-[#2d2d52] px-2.5 py-1.5 rounded-xl ms-2"
						href={postHref}
						target="_blank"
						rel="noopener noreferrer"
					>
						Post
					</a>
					{isPost && (
						<div className="ms-2 bg-blue-600 rounded-full px-3 flex justify-center items-center">
							<FontAwesomeIcon
								icon={
									faCheck
								}
							/>
						</div>
					)}
					{/* check functionality */}
				</li>
				<li>
					Verifying the link to your
					shared tweet:
				</li>
			</ul>

			<div className="flex items-center bg-[#2d2d52] rounded-full p-2">
				<input
					type="text"
					placeholder="Insert your post link here"
					className="bg-transparent text-[#d8d8e8] text-base flex-1 outline-none pl-4"
					value={url}
					onChange={(e) =>
						setUrl(
							e.target
								.value
						)
					} // Update state with input value
				/>
				<button
					className="bg-[#6a4bc2] text-white rounded-full px-5 py-2 hover:bg-[#5a3ba2]"
					onClick={handleSubmit}
				>
					Verify
				</button>
			</div>
		</div>
	);
}
