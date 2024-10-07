"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "../ui/button";

const FetchButton: React.FC = () => {
	const [todos, setTodos] = useState<any[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const fetchTodos = async () => {
		setLoading(true);
		const supabase = createClient();

		try {
			let { data, error } = await supabase.from("todos").select("*");

			if (error) throw error;

			if (!data || data.length === 0) {
				setTodos([]);
				setError("No todos found.");
			} else {
				setTodos(data);
				setError(null);
			}
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("An unknown error occurred");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<Button onClick={fetchTodos}>{loading ? "Loading..." : "Fetch Todos"}</Button>

			{error && <p className="text-red-500 mt-4">{error}</p>}

			<div className="mt-6">{todos.length > 0 ? <pre>{JSON.stringify(todos, null, 2)}</pre> : !loading && <p>No todos loaded.</p>}</div>
		</div>
	);
};

export default FetchButton;
