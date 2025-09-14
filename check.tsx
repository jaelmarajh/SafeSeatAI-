import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Check() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [childAge, setChildAge] = useState('');
  const [childWeight, setChildWeight] = useState('');
  const [carSeatModel, setCarSeatModel] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !childAge || !childWeight) return alert('Please complete all required fields');
    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          photo: base64Image,
          childAge: parseFloat(childAge),
          childWeight: parseFloat(childWeight),
          carSeatModel,
          vehicleModel,
        }),
      });
      const result = await res.json();
      router.push({ pathname: '/results', query: { feedback: JSON.stringify(result.feedback) } });
    };
    reader.readAsDataURL(file);
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Upload Your Car Seat</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
        <input type="number" placeholder="Child Age (years)" value={childAge} onChange={e => setChildAge(e.target.value)} />
        <input type="number" placeholder="Child Weight (lbs)" value={childWeight} onChange={e => setChildWeight(e.target.value)} />
        <input type="text" placeholder="Car Seat Model" value={carSeatModel} onChange={e => setCarSeatModel(e.target.value)} />
        <input type="text" placeholder="Vehicle Model" value={vehicleModel} onChange={e => setVehicleModel(e.target.value)} />
        <button type="submit">{loading ? 'Analyzing...' : 'Submit'}</button>
      </form>
    </div>
  );
}