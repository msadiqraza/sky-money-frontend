import { Route, Routes } from "react-router-dom";
import Check from "./Check";
import Home from "./Home";

export default function Routing() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/Check" element={<Check />} />
		</Routes>
	);
}
