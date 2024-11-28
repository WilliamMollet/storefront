import React, { useState, useEffect } from 'react';
import api from '../../Utils/api';
import EditModal from '../EditModal/EditModal';
import './UserManagement.css';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const fetchUsers = async () => {
        try {
            const { data } = await api.get('/users');
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchUserById = async (id) => {
        const { data } = await api.get(`/users/${id}`);
        return data;
    };

    const updateUser = async (id, updatedData) => {
        try {
            await api.put(`/users/${id}`, updatedData);
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleEdit = (id) => {
        setEditingUserId(id);
        setIsModalOpen(true);
    };

    const openConfirmModal = (id) => {
        setUserToDelete(id);
        setIsConfirmModalOpen(true);
    };

    const closeConfirmModal = () => {
        setIsConfirmModalOpen(false);
        setUserToDelete(null);
    };

    const handleDelete = async () => {
        try {
            if (userToDelete) {
                await api.delete(`/users/${userToDelete}`);
                fetchUsers();
                closeConfirmModal();
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="user-management-container">
            <h2>User Management</h2>
            <ul className="user-list">
                {users.map((user) => (
                    <li key={user._id} className="user-item">
                        <span className="user-name">{user.username} ({user.email})</span>
                        <div className="action-buttons">
                            <button className="edit-button" onClick={() => handleEdit(user._id)}>Edit</button>
                            {user._id !== localStorage.getItem('userId') && (
                                <button className="delete-button" onClick={() => openConfirmModal(user._id)}>Delete</button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

            {isConfirmModalOpen && (
                <div className="confirm-modal">
                    <h3>Are you sure you want to delete this user?</h3>
                    <button className="confirm-button" onClick={handleDelete}>Yes, Delete</button>
                    <button className="cancel-button" onClick={closeConfirmModal}>Cancel</button>
                </div>
            )}

            <EditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                itemId={editingUserId}
                fetchItem={fetchUserById}
                updateItem={updateUser}
                typeItem="user"
            />
        </div>
    );
};

export default UserManagement;
