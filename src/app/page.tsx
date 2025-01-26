'use client';
import React, {useState} from "react";

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', source: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    alert('Lead submitted successfully!');

  };

  return (
      <div className="p-6 max-w-lg mx-auto">
        <input
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
        />
        <input
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
        />
        <input
            placeholder="Source"
            name="source"
            value={formData.source}
            onChange={handleChange}
        />

        <button onClick={handleSubmit}>Submit</button>

      </div>
  );
}
