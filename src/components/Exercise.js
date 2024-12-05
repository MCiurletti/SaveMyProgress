import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';

const Exercise = ({ exerciseData, sectionId, formData, setFormData, exerciseIndex }) => {
  const { id, name, customFields = [] } = exerciseData;
  const [newFieldName, setNewFieldName] = useState('');

  // Handle changes in exercise name
  const handleExerciseNameChange = (e) => {
    const { value } = e.target;
    updateExerciseData({ name: value });
  };

  // Function to update exercise data
  const updateExerciseData = (updatedFields) => {
    const updatedSections = formData.sections.map((section) => {
      if (section.id === sectionId) {
        const updatedExercises = section.exercises.map((exercise) => {
          if (exercise.id === id) {
            return { ...exercise, ...updatedFields };
          }
          return exercise;
        });
        return { ...section, exercises: updatedExercises };
      }
      return section;
    });
    setFormData({ ...formData, sections: updatedSections });
  };

  // Function to add a new custom field
  const addCustomField = () => {
    if (newFieldName.trim() === '') return;

    const updatedCustomFields = [...customFields, { name: newFieldName, value: '' }];
    updateExerciseData({ customFields: updatedCustomFields });
    setNewFieldName('');
  };

  // Function to handle changes in custom field values
  const handleCustomFieldChange = (index, value) => {
    const updatedCustomFields = [...customFields];
    updatedCustomFields[index].value = value;
    updateExerciseData({ customFields: updatedCustomFields });
  };

  // Function to remove a custom field
  const removeCustomField = (index) => {
    const updatedCustomFields = customFields.filter((_, i) => i !== index);
    updateExerciseData({ customFields: updatedCustomFields });
  };

  // Function to remove this exercise
  const removeExercise = () => {
    const updatedSections = formData.sections.map((section) => {
      if (section.id === sectionId) {
        const updatedExercises = section.exercises.filter((exercise) => exercise.id !== id);
        return { ...section, exercises: updatedExercises };
      }
      return section;
    });
    setFormData({ ...formData, sections: updatedSections });
  };

  return (
    <div className="exercise">
      <h4>Exercise {exerciseIndex + 1}</h4>
      <label>
        Exercise Name:
        <input
          type="text"
          value={name}
          onChange={handleExerciseNameChange}
        />
      </label>
      <br />

      {/* Field to add new custom fields */}
      <div className="add-custom-field">
        <label>
            Add field:
            <input
            type="text"
            placeholder="e.g. Reps"
            value={newFieldName}
            onChange={(e) => setNewFieldName(e.target.value)}
            />
        </label>
        <button onClick={addCustomField} className="add-field-button icon-button">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      {/* List of custom fields */}
      {customFields.map((field, index) => (
        <div key={index} className="custom-field">
          <label>
            {field.name}:
            <input
              type="text"
              value={field.value}
              onChange={(e) => handleCustomFieldChange(index, e.target.value)}
            />
          </label>
          <button onClick={() => removeCustomField(index)} className="remove-field-button icon-button">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      ))}

      {/* Button to remove this exercise */}
      <button onClick={removeExercise} className="remove-exercise-button">
        <FontAwesomeIcon icon={faTrash} /> Remove Exercise
      </button>
    </div>
  );
};

export default Exercise;