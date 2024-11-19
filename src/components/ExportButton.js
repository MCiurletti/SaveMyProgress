import React from 'react';

const ExportButton = ({ formData }) => {
  const exportJSON = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Create a link to download the JSON file
    const link = document.createElement('a');
    link.href = url;
    link.download = 'workout.json';
    link.click();

    // Cleanup
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={exportJSON}>Export to JSON</button>
  );
};

export default ExportButton;
