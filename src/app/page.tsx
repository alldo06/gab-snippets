import Image from "next/image";
import { db } from "@/db";

export default async function Home() {
	const snippets = await db.snippet.findMany()

	const renderedSnippets = snippets.map(snippet => {
		return (
			<div key={snippet.id} className="snippet">{snippet.title}</div>
		)
	})

  return (
		<main className="flex flex-col items-center justify-between p-24">
			<h1>Home Page</h1>
			<div className="py-5">{renderedSnippets}</div>
    </main>
  );
}
