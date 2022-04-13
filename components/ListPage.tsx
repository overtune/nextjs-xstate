/**
 * ListPage
 */

import React, { useEffect, useState } from "react";
import { useMachine } from "@xstate/react";
import { useRouter } from "next/router";
import { paginationMachine } from "../state-machines/pagination.machine";

interface ListPageProps {
	heading: string;
}

const ListPage = (props: ListPageProps): JSX.Element | null => {
	const { heading } = props;

	const router = useRouter();

	const [current, send] = useMachine(paginationMachine, {
		context: {
			pageSize: 0,
			offset: 0
		},
		devTools: true
	});

	useEffect(() => {
		send("RESET", { products: [], pageSize: 10, offset: 0 });
	}, [heading]);

	return (
		<div>
			<h1>{heading}</h1>

			{current.context.products && (
				<ul>
					{current.context.products.map(prod => (
						<li key={prod.id}>{prod.heading}</li>
					))}
				</ul>
			)}
			<button
				type="button"
				onClick={() => {
					send("PAGINATE", {
						pageSize: 10,
						offset: current.context.offset
					})
				}}
			>
				Load more
			</button>
		</div>
	)
};

export default ListPage;
