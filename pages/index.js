import Head from "next/head";
import Layout from "../components/Layout";

export default function Home({ results }) {
  const user = {
    name: results[0].name,
    email: results[0].status,
    imageUrl: results[0].image,
  };
  return (
    <>
      <Head>
        <title>Rick and Morty</title>
        <meta name="description" content="App Rick and Morty" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout user={user}>
        <h1>Rick and Morty</h1>
        <div className="bg-white">
          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
              Customers also purchased
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {results.map((result) => (
                <div key={result.id} className="group relative">
                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <img
                      src={result.image}
                      alt={result.name}
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={result.href}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {result.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {result.color}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {result.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch("https://rickandmortyapi.com/api/character/");
    const data = await res.json();
    const { results } = data;
    return {
      props: {
        results,
      },
    };
  } catch (error) {
    console.error(error);
  }
}
