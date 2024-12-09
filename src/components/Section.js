import React from 'react';
import Exercise from './Exercise';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const Section = ({ sectionData, formData, setFormData, sectionIndex }) => {
  const { id, name, notes, exercises } = sectionData;

  // Handle changes in section name and notes
  const handleSectionChange = (e) => {
    const { name, value } = e.target;
    const updatedSections = formData.sections.map((section) => {
      if (section.id === id) {
        return { ...section, [name]: value };
      }
      return section;
    });
    setFormData({ ...formData, sections: updatedSections });
  };

  // Function to add a new exercise
  const addExercise = () => {
    const newExercise = {
      id: Date.now(),
      name: '',
      reps: '',
      sets: '',
      weight: '',
    };
    const updatedSections = formData.sections.map((section) => {
      if (section.id === id) {
        return {
          ...section,
          exercises: [...section.exercises, newExercise],
        };
      }
      return section;
    });
    setFormData({ ...formData, sections: updatedSections });
  };

  // Function to remove this section
  const removeSection = () => {
    const updatedSections = formData.sections.filter((section) => section.id !== id);
    setFormData({ ...formData, sections: updatedSections });
  };

  return (
    <div className="section">
      <h3>Section {sectionIndex + 1}</h3>
      <label>
        Section Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleSectionChange}
        />
      </label>
      <br />
      <label>
        Notes:
        <textarea
          name="notes"
          value={notes}
          onChange={handleSectionChange}
        />
      </label>
      <br />

      {/* Render Exercises */}
      {exercises.map((exercise, index) => (
        <Exercise
          key={exercise.id}
          exerciseData={exercise}
          sectionId={id}
          formData={formData}
          setFormData={setFormData}
          exerciseIndex={index}
        />
      ))}

      {/* Buttons Container */}
      <div className="section-buttons-container">
        <button onClick={addExercise} className="icon-text-button">
          <FontAwesomeIcon icon={faPlus} /> Add Exercise
        </button>
        <button onClick={removeSection} className="remove-section-button icon-text-button">
          <FontAwesomeIcon icon={faTrash} /> Remove Section
        </button>
      </div>
    </div>
  );
};

export default Section;
