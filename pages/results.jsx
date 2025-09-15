import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type FeedbackItem = {
  issue: string;
  suggestion: string;
};

export default function Results() {
  const router = useRouter();
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [status, setStatus] = useState<'safe' | 'warning'>('safe');

  useEffect(() => {
    if (router.query.feedback) {
      try {
        const parsed = JSON.parse(router.query.feedback as string);
        setFeedback(parsed);
      } catch (e) {
        console.error('Failed to parse feedback');
      }
    }
    if (router.query.status) {
      const s = router.query.status as string;
      setStatus(s === 'warning' ? 'warning' : 'safe');
    }
  }, [router.query]);

  return (
    <div>
      <h1>Results</h1>
      <p>Status: {status}</p>
      {feedback.map((f, i) => (
        <div key={i}>
          <strong>{f.issue}</strong>
          <p>{f.suggestion}</p>
        </div>
      ))}
      <p><small>This is simulated guidance. Please consult a certified technician for final checks.</small></p>
    </div>
  );
}