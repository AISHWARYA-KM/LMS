import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OrgSidebarLayout from '../../components/orgsidebarlayout.jsx';
import '../../styles/AssignUserToBatch.css';

const AssignUserToBatch = () => {
  const token = localStorage.getItem('access');
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/users/non-admin/', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setUsers(res.data))
      .catch(err => console.error('Failed to fetch users:', err));

    axios.get('http://127.0.0.1:8000/api/org/batches/', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setBatches(res.data))
      .catch(err => console.error('Failed to fetch batches:', err));
  }, [token]);

  const handleAssign = () => {
    if (!selectedUser || !selectedBatch) {
      return alert("Please select both user and batch.");
    }

    axios.post(`http://127.0.0.1:8000/api/org/batches/${selectedBatch}/add-user/`, {
      user_id: selectedUser
    }, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      alert("User assigned successfully!");
      navigate('/org/batches');
    }).catch(err => {
      console.error(err);
      alert("Failed to assign user.");
    });
  };

  return (
    <OrgSidebarLayout>
      <div className="main-content">
        <div className="assign-form-container">
          <h2>Assign User to Batch</h2>

          <label>Select Batch:</label>
          <select value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)}>
            <option value="">-- Choose Batch --</option>
            {batches.map((batch) => (
              <option key={batch.id} value={batch.id}>{batch.name}</option>
            ))}
          </select>

          <label>Select User:</label>
          <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="">-- Choose User --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.username}</option>
            ))}
          </select>

          <button onClick={handleAssign}>Assign</button>
        </div>
        </div>
      
    </OrgSidebarLayout>
  );
};

export default AssignUserToBatch;
