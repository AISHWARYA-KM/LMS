import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrgSidebarLayout from '../../components/orgsidebarlayout';
import '../../styles/org-list-batches.css';
import { useNavigate } from 'react-router-dom';

const ListBatches = () => {
  const [batches, setBatches] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('access');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/org/batches/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBatches(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch batches:', err);
        setError('Unable to load batches');
      }
    };
    fetchBatches();
  }, []);

  const handleAssignUser = (batchId) => {
    if (!batchId) return;
    navigate(`/org/batches/${batchId}/add-user/`);
  };

  const handleAssignCourse = (batchId) => {
    if (!batchId) return;
    navigate(`/org/batches/${batchId}/add-course/`);
  };

  return (
    <OrgSidebarLayout>
      <div className="batch-container">
        <h2>📋 All Created Batches</h2>

        {error && <p className="error-msg">{error}</p>}

        {batches.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No batches found.</p>
        ) : (
          <ul className="batch-list">
            {batches.map((batch) => (
              <li className="batch-card" key={batch.id}>
                <span className="batch-name"> {batch.name}</span>
                <div className="batch-actions">
                  <button onClick={() => handleAssignUser(batch.id)}>Assign User</button>
                  <button onClick={() => handleAssignCourse(batch.id)}>Assign Course</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </OrgSidebarLayout>
  );
};

export default ListBatches;
