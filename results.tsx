import { useRouter } from 'next/router';

export default function Results() {
  const router = useRouter();
  const feedback = router.query.feedback ? JSON.parse(router.query.feedback as string) : [];

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Results</h1>
      {feedback.map((f: any, i: number) => (
        <div key={i} style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '1rem' }}>
          <strong>{f.issue}</strong>
          <p>{f.suggestion}</p>
        </div>
      ))}
    </div>
  );
}