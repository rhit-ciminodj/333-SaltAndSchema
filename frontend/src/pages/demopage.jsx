// UserCRUD.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UserCRUD() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ userId: "", username: "", address: "" });
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/users");
      setUsers(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const createUser = async () => {
    try {
      await axios.post("/api/users", { username: form.username, address: form.address });
      setForm({ userId: "", username: "", address: "" });
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const updateUsername = async () => {
    try {
      await axios.put(`/api/users/${form.userId}/username`, null, { params: { newUsername: form.username } });
      setForm({ userId: "", username: "", address: "" });
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const editUser = (user) => {
    setForm({ userId: user.userId, username: user.username, address: user.address });
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/users");
        setUsers(res.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>User CRUD Demo</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <section>
        <h2>{form.userId ? "Edit User" : "Add User"}</h2>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />
        {form.userId ? (
          <button onClick={updateUsername}>Update Username</button>
        ) : (
          <button onClick={createUser}>Add User</button>
        )}
        {form.userId && (
          <button onClick={() => setForm({ userId: "", username: "", address: "" })}>Cancel</button>
        )}
      </section>

      <section>
        <h2>Users</h2>
        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.userId}>
                {user.username} ({user.address}){" "}
                <button onClick={() => editUser(user)}>Edit</button>{" "}
                <button onClick={() => deleteUser(user.userId)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
