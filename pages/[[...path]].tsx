import { useEffect } from "react";
import { GetServerSideProps } from "next";
import ListPage from '../components/ListPage';

interface PageProps {
		path?: string[];
}

const Page = ({ path }: PageProps): JSX.Element => {
	if (!path) {
		return <h1>Hello</h1>;
	} else {
		return <ListPage heading={path.join("/")} />;
	}
};

// This function gets called at request time on server-side.
export const getServerSideProps: GetServerSideProps = async context => {
	const path = context?.params?.path || null;

	return {
		props: {
			path
		}
	};
};

export default Page;
