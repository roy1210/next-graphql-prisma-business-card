import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center w-full min-h-screen items-center bg-gray-100">
        <div className="h-96 w-1/2 bg-white flex justify-center items-center rounded-full">
          <div>
            <Link href="/add">
              <a className="bg-gray-900 text-white text-2xl font-semibold rounded-md hover:bg-gray-800 px-6 py-3">
                Add your business card
              </a>
            </Link>
            <Link href="/search">
              <a className="bg-gray-900 text-white text-2xl font-semibold rounded-md hover:bg-gray-800 px-6 py-3 ml-4">
                Find People
              </a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
