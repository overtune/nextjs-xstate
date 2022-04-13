import { createMachine, assign } from "xstate";

interface Product {
	id: number;
	heading: string;
}

type PaginateEventType = {
	type: "PAGINATE";
	pageSize: number;
	offset: number;
};

type ResetEventType = {
	type: "RESET";
	products: Product[];
	pageSize: number;
	offset: number;
};

type PaginationEventTypes = PaginateEventType | ResetEventType;

export type ContextType = {
	products: Product[];
	error: any;
	pageSize: number;
	offset: number;
};

// Simulate a fetch
const fetchProducts = (pageSize: number, offset: number): any => {
	return new Promise<any>((resolve) => {
		const products = [];

		for (let i = offset; i < offset + pageSize; i++) {
			products.push({ id: i, heading: `Product no ${i}` });
		}

		return resolve({ products, offset: offset + 10 });
	});
};

export const paginationMachine = createMachine<
	ContextType,
	PaginationEventTypes
>(
	{
		id: "paginationMachine",
		initial: "idle",
		context: {
			products: [],
			error: undefined,
			pageSize: 0,
			offset: 0
		},
		states: {
			idle: {
				on: {
					PAGINATE: "paginationLoading"
				}
			},
			paginationLoading: {
				invoke: {
					id: "getProducts",
					src: (_context, _event) => {
						const event = _event as PaginateEventType;
						return fetchProducts(event.pageSize, event.offset);
					},
					onDone: {
						target: "success",
						actions: assign({
							products: (context, event) => [
								...context.products,
								...event.data.products
							],
							offset: (_, event) => event.data.offset
						})
					},
					onError: {
						target: "failure",
						actions: assign({
							error: (_context, event) => event.data
						})
					}
				}
			},
			success: {
				on: {
					PAGINATE: "paginationLoading"
				}
			},
			failure: {
				on: {
					PAGINATE: "paginationLoading"
				}
			}
		},
		on: {
			RESET: {
				target: "paginationLoading",
				actions: [
					assign({
						products: (_, _event) => {
							const event = _event as ResetEventType;
							return event.products;
						},
						offset: (_, _event) => {
							const event = _event as ResetEventType;
							return event.offset;
						},
						pageSize: (_, _event) => {
							const event = _event as ResetEventType;
							return event.pageSize;
						}
					})
				]
			}
		}
	}
);
