import React, { useState, useEffect } from 'react';

const EditModal = ({ isOpen, onClose, itemId, fetchItem, updateItem, typeItem }) => {
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        if (isOpen && itemId) {
            const loadData = async () => {
                const data = await fetchItem(itemId);
                setFormData(data);
            };
            loadData();
        }
    }, [isOpen, itemId, fetchItem]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateItem(itemId, formData);
        onClose(); // Ferme le modal après mise à jour
    };

    if (!isOpen || !formData) return null;

    return (
        <>
            <div className="modal-backdrop" onClick={onClose}></div>
            <div className="modal-content">
                <h3 className="modal-header">Edit {typeItem === "user" ? formData["username"] : formData["name"]}</h3>
                <form onSubmit={handleSubmit}>
                    {Object.keys(formData).map((key) => (
                        <div key={key}>
                            <label>{key}</label>
                            <input
                                type="text"
                                name={key}
                                value={key !== "password" ? formData[key] : ""}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                    <div className="modal-actions">
                        <button type="submit">Save</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditModal;
