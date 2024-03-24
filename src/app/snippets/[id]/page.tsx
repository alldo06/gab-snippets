import { db } from "@/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { deleteSnippet } from "@/actions";

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

	const deleteSnippetAction = deleteSnippet.bind(null, snippet.id)

	return (
    <div className="detail-page">
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-2">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded"
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button type="submit" className="p-2 border rounded">
              Delete
            </button>
          </form>
        </div>
      </div>

      <pre className="p-3 rounded bg-gray-200 borde-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}