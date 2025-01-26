'use client';
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

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
          <Input className="m-2" value={formData.name} onChange={handleChange} type="text" placeholder="Name" />
          <Input className="m-2"  value={formData.email} onChange={handleChange} type="email" placeholder="Email" />
          <Input className="m-2"  value={formData.source} onChange={handleChange} type="text" placeholder="Source" />

        <Button onClick={handleSubmit}>Submit</Button>

      </div>
  );
}
