import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';

const ExportButton = ({ formData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filename, setFilename] = useState('');
    const inputRef = useRef(null);
    const exportButtonRef = useRef(null);
  
    // Update filename whenever formData.date changes
    useEffect(() => {
      // Replace dashes with underscores for the filename
      const formattedDate = formData.date ? formData.date.replace(/-/g, '_') : 'unspecified';
      setFilename(`workout_${formattedDate}.json`);
    }, [formData.date]);

    // Function to handle the export action with the specified filename
    const handleExport = () => {
        const dataStr = JSON.stringify(formData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        // Ensure the filename ends with .json
        let fileNameWithExtension = filename;
        if (!filename.endsWith('.json')) {
        fileNameWithExtension += '.json';
        }

        // Create a link to download the JSON file
        const link = document.createElement('a');
        link.href = url;
        link.download = fileNameWithExtension;
        link.click();

        // Cleanup
        URL.revokeObjectURL(url);

        // Close the modal
        setIsModalOpen(false);
    };

  return (
    <>
      <button className="export-button icon-text-button" onClick={() => setIsModalOpen(true)}>
        {/* Your button content, e.g., icon and text */}
        <FontAwesomeIcon icon={faFileExport} /> Export
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Export Workout Data</h3>
            <label>
              Filename:
              <input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
              />
            </label>
            <div className="modal-buttons">
              <button onClick={handleExport}>Download</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExportButton;
