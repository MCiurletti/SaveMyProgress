import './App.css';
import React, { useState } from 'react';
import GlobalFields from './components/GlobalFields';
import ExportButton from './components/ExportButton';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    goal: '',
    notes: '',
  });

  return (
    <div className="app-container">
      <h1>SaveMyProgress</h1>
      <GlobalFields formData={formData} setFormData={setFormData} />
      <ExportButton formData={formData} />
    </div>
  );
}

export default App;
