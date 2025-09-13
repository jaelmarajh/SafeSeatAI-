import type { NextApiRequest, NextApiResponse } from 'next';
import carSeatData from '../../../data/carSeats.json';
import vehicleData from '../../../data/vehicles.json';

type Feedback = {
  issue: string;
  suggestion: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { carSeatModel, vehicleModel, childAge, childWeight } = req.body;
  const feedback: Feedback[] = [];

  feedback.push({ issue: 'Chest clip appears low', suggestion: 'Slide the clip up to armpit level.' });

  const carSeat = carSeatData[carSeatModel?.toLowerCase()];
  if (carSeat && childWeight > carSeat.maxWeight) {
    feedback.push({ issue: 'Child may exceed max weight', suggestion: 'Consider a new seat.' });
  }

  if (carSeat?.mustBeRearFacing && childAge < 2) {
    feedback.push({ issue: 'Must be rear-facing under 2 years', suggestion: 'Adjust if necessary.' });
  }

  const vehicle = vehicleData[vehicleModel?.toLowerCase()];
  if (vehicle && !vehicle.centerLatch) {
    feedback.push({ issue: 'No center LATCH', suggestion: 'Use side positions instead.' });
  }

  res.status(200).json({
    status: feedback.length > 0 ? 'warning' : 'safe',
    feedback,
    disclaimer: 'Simulated feedback. Not a certified check.'
  });
}