import React, { useState } from 'react';
import axios from 'axios';
import OrgSidebarLayout from '../../components/orgsidebarlayout';
import '../../styles/orgcrtbatch.css'; // ✅ CSS Import

const CreateBatchForm = () => {
  const [batchName, setBatchName] = useState('');
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('access');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/org/batches/create/', {
        name: batchName,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setMessage('✅ Batch created successfully!');
      setBatchName('');
      // Optional scroll-to-top for visibility
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to create batch.');
    }
  };

  return (
    <OrgSidebarLayout>
      <form onSubmit={handleSubmit} className="form-container">
        <h2> Create New Batch</h2>
        <input
          type="text"
          value={batchName}
          onChange={(e) => setBatchName(e.target.value)}
          placeholder="Enter Batch Name"
          required
        />
        <button type="submit">Create</button>
        {message && <p>{message}</p>}
      </form>
    </OrgSidebarLayout>
  );
};

export default CreateBatchForm;
