import { db } from "@/db";
import { notFound } from "next/navigation";

interface SnippetShowPageProps {
	params: {
		id: string,
	}
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
	await new Promise((r) => setTimeout(r,2000))
	const snippet = await db.snippet.findFirst({
		where: { id: parseInt(props.params.id) }
	})
	console.log(snippet);
	
	if (!snippet) {
		return notFound()
	}

	return (
		<div className="detail-page">
    <div className="flex m-4 justify-between items-center">
      <h1 className="text-xl font-bold">{snippet.title}</h1>
			<div className="flex gap-2">
				<button className="p-2 border rounded">Edit</button>
				<button className="p-2 border rounded">Delete</button>
			</div>
			</div>
			
			<pre className="p-3 rounded bg-gray-200 borde-gray-200">
				<code>{ snippet.code }</code>
			</pre>
		</div>
  );
}