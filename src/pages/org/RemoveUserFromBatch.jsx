import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrgSidebarLayout from '../../components/orgsidebarlayout';
import '../../styles/RemoveUserFromBatchPage.css';

function RemoveUserFromBatchPage() {
  const [batches, setBatches] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const token = localStorage.getItem('access');
        const res = await axios.get('http://127.0.0.1:8000/api/org/batches-with-users/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBatches(res.data);
      } catch (error) {
        console.error('Failed to fetch batches', error);
      }
    };
    fetchBatches();
  }, []);

  const handleRemove = async (batchId, username) => {
    try {
      const token = localStorage.getItem('access');
      await axios.delete(`http://127.0.0.1:8000/api/org/batches/${batchId}/remove-user/${username}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(`Removed ${username} from batch ${batchId}`);
      setBatches((prev) =>
        prev.map((batch) =>
          batch.id === batchId
            ? { ...batch, users: batch.users.filter((u) => u.username !== username) }
            : batch
        )
      );
    } catch (error) {
      console.error('Error removing user:', error);
      setMessage(`Failed to remove ${username} from batch.`);
    }
  };

  return (
    <OrgSidebarLayout>
      <div className="remove-user-container">
        <h2>Remove Users from Batches</h2>
        {message && <p className="message-success">{message}</p>}

        <div className="batch-grid-wrapper">
          {batches.map((batch) => (
            <div key={batch.id} className="batch-box">
              <h3>Batch: {batch.name}</h3>
              {batch.users.length > 0 ? (
                <ul className="user-list">
                  {batch.users.map((user) => (
                    <li key={user.username} className="user-item">
                      <span>{user.username}</span>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemove(batch.id, user.username)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No users assigned to this batch.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </OrgSidebarLayout>
  );
}

export default RemoveUserFromBatchPage;
