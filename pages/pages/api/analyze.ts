// pages/api/analyze.ts
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { photo, childAge, childWeight, carSeatModel, vehicleModel } = req.body;

    // Dummy feedback logic
    const feedback = [
      { issue: 'Harness might be too loose.', suggestion: 'Tighten it until snug with no slack.' },
      { issue: 'Chest clip position unknown.', suggestion: 'Ensure it’s at armpit level.' }
    ];

    res.status(200).json({ feedback });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
