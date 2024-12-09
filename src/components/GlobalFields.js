import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';

const GlobalFields = ({ formData, setFormData }) => {
  const { name, date, goal, notes, customFields = [] } = formData;
  const [newFieldName, setNewFieldName] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addCustomField = () => {
    if (newFieldName.trim() === '') return;
    const updatedFields = [...customFields, { name: newFieldName, value: '' }];
    setFormData({ ...formData, customFields: updatedFields });
    setNewFieldName('');
  };

  const handleCustomFieldChange = (index, value) => {
    const updatedFields = [...customFields];
    updatedFields[index].value = value;
    setFormData({ ...formData, customFields: updatedFields });
  };

  const removeCustomField = (index) => {
    const updatedFields = customFields.filter((_, i) => i !== index);
    setFormData({ ...formData, customFields: updatedFields });
  };

  return (
    <div className="global-fields">
      <h2>Workout Details</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Notes:
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />
      </label>
      <div className="add-custom-field">
        <label>
            Add field:
            <input
            type="text"
            placeholder="Field name"
            value={newFieldName}
            onChange={(e) => setNewFieldName(e.target.value)}
            />
        </label>
        <button onClick={addCustomField} className="add-field-button icon-button">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
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
    </div>
  );
};

export default GlobalFields;
