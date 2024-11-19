import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const Exercise = ({ exerciseData, sectionId, formData, setFormData }) => {
  const { id, name, reps, sets, weight } = exerciseData;

  // Handle changes in exercise data
  const handleExerciseChange = (e) => {
    const { name: fieldName, value } = e.target;
    const updatedSections = formData.sections.map((section) => {
      if (section.id === sectionId) {
        const updatedExercises = section.exercises.map((exercise) => {
          if (exercise.id === id) {
            return { ...exercise, [fieldName]: value };
          }
          return exercise;
        });
        return { ...section, exercises: updatedExercises };
      }
      return section;
    });
    setFormData({ ...formData, sections: updatedSections });
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
      <h4>Exercise</h4>
      <label>
        Exercise Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleExerciseChange}
        />
      </label>
      <br />
      <label>
        Reps:
        <input
          type="number"
          name="reps"
          value={reps}
          onChange={handleExerciseChange}
        />
      </label>
      <br />
      <label>
        Sets:
        <input
          type="number"
          name="sets"
          value={sets}
          onChange={handleExerciseChange}
        />
      </label>
      <br />
      <label>
        Weight:
        <input
          type="number"
          name="weight"
          value={weight}
          onChange={handleExerciseChange}
        />
      </label>
      <br />
      {/* Button to remove this exercise */}
      <button onClick={removeExercise} className="remove-exercise-button">
        <FontAwesomeIcon icon={faTrash} /> Remove Exercise
      </button>
    </div>
  );
};

export default Exercise;
