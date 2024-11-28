import React, { useState, useEffect } from 'react';
import api from '../../Utils/api';
import EditModal from '../EditModal/EditModal';
import './ProductManagement.css';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        category: '',
        minPrice: '',
        maxPrice: '',
        name: '',
        owner: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [newProductData, setNewProductData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
    });

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('/products/search', { params: filters });
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchProductById = async (id) => {
        try {
            const { data } = await api.get(`/products/single/${id}`);
            return data;
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const updateProduct = async (id, updatedData) => {
        try {
            await api.put(`/products/${id}`, updatedData);
            fetchProducts();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await api.delete(`/products/${id}`);
            fetchProducts();
            setIsConfirmModalOpen(false);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const createProduct = async (e) => {
        e.preventDefault();
        // Logique pour créer un produit via l'API
    };

    const openEditModal = (id) => {
        setSelectedProductId(id);
        setIsModalOpen(true);
    };

    const closeEditModal = () => {
        setIsModalOpen(false);
        setSelectedProductId(null);
    };

    const openConfirmModal = (id) => {
        setProductToDelete(id);
        setIsConfirmModalOpen(true);
    };

    const closeConfirmModal = () => {
        setIsConfirmModalOpen(false);
        setProductToDelete(null);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProducts();
    };

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    return (
            <div className="product-management-container">
                <h2>Product Management</h2>

                {/* Formulaire de recherche */}
                <form onSubmit={handleSearch} className="filter-form">
                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={filters.category}
                        onChange={handleFilterChange}
                        className="filter-input"
                    />
                    <input
                        type="number"
                        name="minPrice"
                        placeholder="Min Price"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        className="filter-input"
                    />
                    <input
                        type="number"
                        name="maxPrice"
                        placeholder="Max Price"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        className="filter-input"
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={filters.name}
                        onChange={handleFilterChange}
                        className="filter-input"
                    />
                    <input
                        type="text"
                        name="owner"
                        placeholder="Owner (username or email)"
                        value={filters.owner}
                        onChange={handleFilterChange}
                        className="filter-input"
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>

                {/* Ajouter un produit */}
                <button onClick={() => setIsCreateModalOpen(true)} className="add-product-button">Add Product</button>

                {/* Liste des produits */}
                <ul className="product-list">
                    {products.map((product) => (
                        <li key={product._id} className="product-item">
                            <strong>{product.name}</strong> - ${product.price} ({product.category}){' '}
                            <button onClick={() => openEditModal(product._id)} className="edit-button">Edit</button>
                            <button onClick={() => openConfirmModal(product._id)} className="delete-button">Delete</button>
                        </li>
                    ))}
                </ul>

                {/* Modal de confirmation de suppression */}
                {isConfirmModalOpen && (
                    <div className="confirm-modal">
                        <h3>Are you sure you want to delete this product?</h3>
                        <button onClick={() => deleteProduct(productToDelete)} className="confirm-button">Yes, Delete</button>
                        <button onClick={closeConfirmModal} className="cancel-button">Cancel</button>
                    </div>
                )}

                {/* Modal de création */}
                {isCreateModalOpen && (
                    <div className="create-product-form">
                        <h3>Create Product</h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                createProduct();
                            }}
                        >
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={newProductData.name}
                                onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
                                required
                            />
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={newProductData.description}
                                onChange={(e) => setNewProductData({ ...newProductData, description: e.target.value })}
                                required
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={newProductData.price}
                                onChange={(e) => setNewProductData({ ...newProductData, price: e.target.value })}
                                required
                            />
                            <input
                                type="number"
                                name="stock"
                                placeholder="Stock"
                                value={newProductData.stock}
                                onChange={(e) => setNewProductData({ ...newProductData, stock: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                name="category"
                                placeholder="Category"
                                value={newProductData.category}
                                onChange={(e) => setNewProductData({ ...newProductData, category: e.target.value })}
                                required
                            />
                            <button type="submit">Create</button>
                            <button type="button" onClick={() => setIsCreateModalOpen(false)}>
                                Cancel
                            </button>
                        </form>
                    </div>
                )}

                {/* Modal d'édition */}
                <EditModal
                    isOpen={isModalOpen}
                    onClose={closeEditModal}
                    itemId={selectedProductId}
                    fetchItem={fetchProductById}
                    updateItem={updateProduct}
                    typeItem="product"
                />
            </div>

    );
};

export default ProductManagement;
