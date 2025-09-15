import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center', padding: '2rem' }}>
      <Head>
        <title>SafeSeat AI</title>
      </Head>
      <h1>SafeSeat AI</h1>
      <p>
        Most car seats are installed incorrectly. Upload a photo of yours and get feedback instantly.
      </p>
      <Link href="/check">
        <button style={{ padding: '1rem 2rem', fontSize: '1.2rem', marginTop: '1rem' }}>
          Start Check
        </button>
      </Link>
    </div>
  );
}
