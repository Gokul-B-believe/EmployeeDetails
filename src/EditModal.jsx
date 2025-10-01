import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './card.css'

function EditModal({ user, isOpen, onClose, onSave }) {
    const [editData, setEditData] = useState({
        name: '',
        username: '',
        email: '',
        phone: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Update form data when user prop changes
    useEffect(() => {
        if (user) {
            setEditData({
                name: user.name || '',
                username: user.username || '',
                email: user.email || '',
                phone: user.phone || ''
            });
            setErrors({});
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!editData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!editData.username.trim()) {
            newErrors.username = 'Username is required';
        }
        if (!editData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(editData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!editData.phone.trim()) {
            newErrors.phone = 'Phone is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        
        // Update the user data via API
        axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, editData)
            .then(response => {
                onSave(response.data);
                onClose();
            })
            .catch(error => {
                console.error('Error updating user:', error);
                // Even if API fails, update locally for demo purposes
                onSave({ ...user, ...editData });
                onClose();
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleCancel = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleCancel}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="card">
                    <div className="modal-header">
                        <h3>Edit User</h3>
                        <button className="close-btn" onClick={handleCancel}>×</button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="val">
                            <div className="form-group">
                                <label><b>Enter the Name:</b></label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editData.name}
                                    placeholder="Name..."
                                    onChange={handleInputChange}
                                    className={errors.name ? 'error' : ''}
                                />
                                {errors.name && <span className="error-message">{errors.name}</span>}
                            </div>
                            
                            <div className="form-group">
                                <label><b>UserName:</b></label>
                                <input
                                    type="text"
                                    name="username"
                                    value={editData.username}
                                    placeholder="UserName..."
                                    onChange={handleInputChange}
                                    className={errors.username ? 'error' : ''}
                                />
                                {errors.username && <span className="error-message">{errors.username}</span>}
                            </div>
                            
                            <div className="form-group">
                                <label><b>Email:</b></label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editData.email}
                                    placeholder="Email..."
                                    onChange={handleInputChange}
                                    className={errors.email ? 'error' : ''}
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>
                            
                            <div className="form-group">
                                <label><b>Phone:</b></label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={editData.phone}
                                    placeholder="Phone..."
                                    onChange={handleInputChange}
                                    className={errors.phone ? 'error' : ''}
                                />
                                {errors.phone && <span className="error-message">{errors.phone}</span>}
                            </div>
                        </div>
                        <br />
                        <div className="modal-buttons">
                            <button 
                                type="submit" 
                                className="btn-sub" 
                                disabled={isLoading}
                            >
                                {isLoading ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button 
                                type="button" 
                                className="btn-back" 
                                onClick={handleCancel}
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditModal;
