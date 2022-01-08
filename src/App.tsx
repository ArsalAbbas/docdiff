import { useEffect } from "react";
import Views from "./Views";
function App() {
	useEffect(() => {
		const code =
			window.location.href.match(/\?code=(.*)/) &&
			window.location.href.match(/\?code=(.*)/)![1];
		if (code) {
			fetch(`http://localhost:4000/authenticate/${code}`)
				.then((response) => response.json())
				.then(({ token }) => {
					localStorage.setItem("token", token);
				});
		}
	});
	return <Views />;
}

export default App;
