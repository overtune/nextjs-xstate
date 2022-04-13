import "../styles/globals.css";
import Link from "next/link";
import { inspect } from "@xstate/inspect";

if (typeof document !== "undefined") {
	inspect({
		url: "https://statecharts.io/inspect",
		iframe: false
	});
}

function MyApp({ Component, pageProps }) {
	return (
		<main>
			<nav>
				<ul>
					<li>
						<Link href="/">
							<a>Home</a>
						</Link>
					</li>
					<li>
						<Link href="/list-1">
							<a>List 1</a>
						</Link>
					</li>
					<li>
						<Link href="/list-2">
							<a>List 2</a>
						</Link>
					</li>
					<li>
						<Link href="/list-3">
							<a>List 3</a>
						</Link>
					</li>
				</ul>
			</nav>
			<Component {...pageProps} />
		</main>
	);
}

export default MyApp;
