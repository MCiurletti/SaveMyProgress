import './App.css';
import React, { useState, useEffect } from 'react';
import GlobalFields from './components/GlobalFields';
import ExportButton from './components/ExportButton';
import ImportButton from './components/ImportButton';
import Section from './components/Section'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    notes: '',
    sections: [],
    customFields: [],
  });

  // Theme state: 'light' or 'dark'
  const [theme, setTheme] = useState('light');

  // Function to toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    // Save preference to localStorage
    localStorage.setItem('theme', newTheme);
  };

  // Load theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Apply theme class to the root element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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
      {/* Theme Toggle Button */}
      <div className="header-container">
        <h1>SaveMyProgress</h1>
        <button
            className="theme-toggle-button"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? (
            <FontAwesomeIcon icon={faMoon} />
          ) : (
            <FontAwesomeIcon icon={faSun} />
          )}
        </button>
      </div>
      <GlobalFields formData={formData} setFormData={setFormData} />

      {/* Render Sections */}
      {formData.sections.map((section, index) => (
        <Section
          key={section.id}
          sectionData={section}
          setFormData={setFormData}
          formData={formData}
          sectionIndex={index}
        />
      ))}

      {/* Buttons Container */}
      <div className="buttons-container">
        
        <button onClick={addSection} className="icon-text-button">
          <FontAwesomeIcon icon={faPlus} /> Add Section
        </button>
        <div className="json-buttons-container">
          <ExportButton formData={formData} />
          <ImportButton setFormData={setFormData} />
        </div>
      </div>
    </div>
  );
}

export default App;

