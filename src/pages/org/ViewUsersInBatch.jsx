import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrgSidebarLayout from '../../components/orgsidebarlayout';
import '../../styles/ViewUsersInAllBatches.css';

const ViewUsersInAllBatches = () => {
  const [batches, setBatches] = useState([]);
  const token = localStorage.getItem('access');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/org/batches-with-users/', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setBatches(res.data));
  }, []);

  return (
    <OrgSidebarLayout>
      <div className="batch-users-container">
        <h2>📦 Batches and Assigned Users</h2>
        
        {batches.length === 0 ? (
          <p className="no-data-text">No batches available.</p>
        ) : (
          <div className="batch-grid-wrapper">
            {batches.map(batch => (
              <div className="batch-card" key={batch.id}>
                <h3>{batch.name}</h3>
                {batch.users.length === 0 ? (
                  <p className="no-data-text">No users in this batch.</p>
                ) : (
                  <ul>
                    {batch.users.map(user => (
                      <li key={user.id}>{user.username}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </OrgSidebarLayout>
  );
};

export default ViewUsersInAllBatches;
