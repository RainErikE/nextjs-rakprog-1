import FetchButton from "@/components/todo/fetchbutton";

export default function Index() {
	return (
		<>
			<main className="flex-1 flex flex-col gap-6 px-4">
				<h1 className="text-2xl">Todo List</h1>
				<FetchButton />
			</main>
		</>
	);
}
