import Head from "next/head";
export default function Layout({ children, title, description }) {
  return (
    <main>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      {children}
    </main>
  );
}
