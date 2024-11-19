import './App.css';
import React, { useState } from 'react';
import GlobalFields from './components/GlobalFields';
import ExportButton from './components/ExportButton';
import Section from './components/Section'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    goal: '',
    notes: '',
    sections: [], // Add sections array
  });

  // Function to add a new section
  const addSection = () => {
    const newSection = {
      id: Date.now(), // Simple unique ID
      name: '',
      notes: '',
      exercises: [],
    };
    setFormData({
      ...formData,
      sections: [...formData.sections, newSection],
    });
  };

  return (
    <div className="app-container">
      <h1>SaveMyProgress</h1>
      <GlobalFields formData={formData} setFormData={setFormData} />

      {/* Render Sections */}
      {formData.sections.map((section) => (
        <Section
          key={section.id}
          sectionData={section}
          setFormData={setFormData}
          formData={formData}
        />
      ))}

      {/* Buttons Container */}
      <div className="buttons-container">
        <button onClick={addSection}>
          <FontAwesomeIcon icon={faPlus} /> Add Section
        </button>
        <ExportButton formData={formData} />
      </div>
    </div>
  );
}

export default App;

