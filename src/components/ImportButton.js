import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImport } from '@fortawesome/free-solid-svg-icons';

const isValidData = (data) => {
    // Basic validation checks
    if (typeof data !== 'object' || data === null) return false;
    if (!('name' in data && 'date' in data && 'sections' in data)) return false;
    if (!Array.isArray(data.sections)) return false;
    // Additional checks can be added here
    return true;
};

const ImportButton = ({ setFormData }) => {
  // Function to handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Read the file content
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
          const jsonData = JSON.parse(event.target.result);
          if (isValidData(jsonData)) {
            setFormData(jsonData);
          } else {
            alert('Invalid data format.');
          }
        } catch (error) {
          alert('Invalid JSON file.');
          console.error('Error parsing JSON:', error);
        }
    };
    reader.readAsText(file);
  };

  return (
    <label htmlFor="import-json" className="import-button icon-text-button">
      <FontAwesomeIcon icon={faFileImport} /> Import
      <input
        type="file"
        id="import-json"
        accept=".json"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </label>
  );
};

export default ImportButton;
