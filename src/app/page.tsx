import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/db';

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderedSnippets = snippets.map((snippet) => {
    return (
      <Link
        key={snippet.id}
        href={`/snippets/${snippet.id}`}
        className="flex justify-between items-center p-2 border rounded"
      >
				<div className="">{snippet.title}</div>
				<div>View</div>
      </Link>
    );
  });

  return (
		<main className="flex flex-col items-center p-12">
			<div className="flex justify-between m-2 items-center w-full">
				<h1 className="text-xl font-bold">Snippets</h1>
				<Link href={`/snippets/new`} className='border p-2 rounded'>New</Link>
			</div>
      <div className="py-5 w-full flex flex-col gap-2">{renderedSnippets}</div>
    </main>
  );
}
