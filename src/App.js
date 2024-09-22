import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

const App = () => {
  const [inputData, setInputData] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Define the options for filtering
  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase', label: 'Highest Lowercase Alphabet' }
  ];

  // Handle changes to input data
  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  // Handle the submission of the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jsonData = JSON.parse(inputData); // Parse input to validate JSON format
      setError(''); // Reset error state if the input is valid

      // Send POST request to backend API with input JSON
      const response = await axios.post('https://bajaj-backend-wtxb.onrender.com/bfhl', jsonData);
      setResponseData(response.data); // Set the response data
    } catch (err) {
      setError('Invalid JSON input. Please check your format.');
      setResponseData(null); // Clear previous response data
    }
  };

  // Handle changes in the select filter options
  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  // Function to render filtered response based on selected options
  const renderResponse = () => {
    if (!responseData) return null;

    return (
      <div className="card">
        <h3>Filtered Response:</h3>
        {selectedOptions.map((option) => (
          <div key={option.value} style={{ marginBottom: '10px' }}>
            {option.value === 'alphabets' && responseData.alphabets && (
              <div>Alphabets: {responseData.alphabets.join(', ')}</div>
            )}
            {option.value === 'numbers' && responseData.numbers && (
              <div>Numbers: {responseData.numbers.join(', ')}</div>
            )}
            {option.value === 'highest_lowercase' && responseData.highest_lowercase_alphabet && (
              <div>Highest Lowercase: {responseData.highest_lowercase_alphabet}</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Your Roll Number</h1>
      <form onSubmit={handleSubmit}>
        <label>API Input</label>
        <textarea
          value={inputData}
          onChange={handleInputChange}
          placeholder='Enter JSON here...'
          rows='5'
        />
        <button type='submit'>Submit</button>
      </form>

      {/* Display error message if JSON input is invalid */}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* Display multi-select options for filtering response once data is fetched */}
      {responseData && (
        <Select
          isMulti
          options={options}
          onChange={handleSelectChange}
          placeholder="Select response data to display..."
          className="select"
        />
      )}

      {/* Render the filtered response */}
      {renderResponse()}
    </div>
  );
};

export default App;
