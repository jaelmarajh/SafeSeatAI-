import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { photo, childAge, childWeight, carSeatModel, vehicleModel } = req.body;

  const feedback = [];

  if (childWeight < 35) {
    feedback.push({ issue: 'Child is below weight limit', suggestion: 'Ensure seat is rear-facing' });
  }

  if (!photo || !carSeatModel || !vehicleModel) {
    feedback.push({ issue: 'Incomplete data', suggestion: 'Provide all required inputs for better accuracy' });
  }

  res.status(200).json({ feedback });
}