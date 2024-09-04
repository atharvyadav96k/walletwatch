import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
export default function Main() {
    const { userid } = useParams();
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [editingCategoryName, setEditingCategoryName] = useState(''); // Track editing category name
    const [spends, setSpends] = useState([]);
    const [showSpendForm, setShowSpendForm] = useState(false);
    const url = 'https://walletwatch-server.vercel.app';

    // Memoize getCategories to prevent unnecessary re-creations
    const getCategories = useCallback(async () => {
        try {
            const response = await axios.get(`${url}/api/users/categorys/${userid}`);
            console.log('Categories Response:', response.data.response);
            setCategories(response.data.response || []);
        } catch (error) {
            console.error('Error fetching categories:', error.response ? error.response.data : error.message);
            setCategories([]);
        }
    }, [userid]); 


    const getSpends = useCallback(async (categoryId) => {
        try {
            const response = await axios.get(`${url}/api/users/categorys/spends/${categoryId}`);
            console.log('Spends Response:', response.data.response.spendIds);
            setSpends(Array.isArray(response.data.response.spendIds) ? response.data.response.spendIds : []);
        } catch (error) {
            console.error('Error fetching spends:', error.response ? error.response.data : error.message);
            setSpends([]);
        }
    }, [url]);

    const categoryForm = async (e) => {
        e.preventDefault();
        const categoryName = e.target.categoryName.value;
        const data = {
            categoryName: categoryName,
            shareable: false
        };
        try {
            const response = await axios.post(`${url}/api/users/categorys/create/${userid}`, data);
            console.log(response.data);
            getCategories();
            e.target.reset();
        } catch (error) {
            console.error('Error creating category:', error.response ? error.response.data : error.message);
        }
    };

    const editCategory = async (id, newName) => {
        const data = {
            categoryName: newName,
            categoryId: id
        };
        try {
            const response = await axios.put(`${url}/api/users/categorys/edit/${userid}`, data);
            console.log('Category updated:', response.data);
            getCategories();
            setEditingCategoryId(null);
            setEditingCategoryName('');
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    const deleteCategory = async (id) => {
        const data = {
            data: { categoryId: id }
        };
        try {
            await axios.delete(`${url}/api/users/categorys/delete/${userid}`, data);
            getCategories();
            setSelectedCategoryId(null);
            setSpends([]);
        } catch (error) {
            console.error('Error deleting category:', error.response ? error.response.data : error.message);
        }
    };

    const handleCategoryClick = (categoryId) => {
        setSelectedCategoryId(categoryId);
        getSpends(categoryId);
        setShowSpendForm(false);
    };

    const spendFormSubmit = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const sharable = e.target.sharable.checked;
        const amount = e.target.amount.value;
        const description = e.target.description.value;
        const paymentMethod = e.target.paymentMethod.value;
        const data = {
            title: title,
            sharable: sharable,
            description: description,
            amount: amount,
            paymentMethod: paymentMethod
        };
        try {
            await await axios.post(`${url}/api/users/categorys/spends/create/${selectedCategoryId}`, data);
            // console.log('Spend Created:', response.data);
            getSpends(selectedCategoryId);
            e.target.reset();
            setShowSpendForm(false);
        } catch (error) {
            console.error('Error creating spend:', error.response ? error.response.data : error.message);
        }
    };

    const handelCategoryName = (name) => {
        return name.length > 14 ? name.substring(0, 15) + "..." : name;
    };

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-4'>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>Categories</h5>
                            <form method='post' onSubmit={categoryForm} className="mb-3">
                                <div className='input-group'>
                                    <input type='text' name='categoryName' className='form-control' placeholder='Add New Category' required />
                                    <button type='submit' className='btn btn-primary'>Add</button>
                                </div>
                            </form>
                            {categories.map((ele) => (
                                <div key={ele._id} className="d-flex justify-content-between align-items-center mt-2">
                                    {editingCategoryId === ele._id ? (
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                editCategory(ele._id, editingCategoryName);
                                            }}
                                            className="d-flex"
                                        >
                                            <input
                                                type="text"
                                                value={editingCategoryName}
                                                onChange={(e) => setEditingCategoryName(e.target.value)}
                                                className="form-control me-2"
                                            />
                                            <button type="submit" className="btn btn-success btn-sm me-2">Save</button>
                                            <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditingCategoryId(null)}>Cancel</button>
                                        </form>
                                    ) : (
                                        <>
                                            <span onClick={() => handleCategoryClick(ele._id)} style={{ cursor: 'pointer' }}>
                                                {handelCategoryName(ele.categoryName)}
                                            </span>
                                            <div>
                                                <button className='btn btn-warning btn-sm me-2' onClick={() => {
                                                    setEditingCategoryId(ele._id);
                                                    setEditingCategoryName(ele.categoryName);
                                                }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                                    </svg>
                                                </button>
                                                <button onClick={() => deleteCategory(ele._id)} className='btn btn-danger btn-sm me-2'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.998.92h-6.23a1 1 0 0 1-.998-.92L3.042 3.5H12.958zM5.5 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='col-md-8'>
                    <div className='card'>
                        <div className='card-body'>
                            {selectedCategoryId ? (
                                <div>
                                    <h5>Spends for Selected Category</h5>
                                    <button className='btn btn-success mb-3' onClick={() => setShowSpendForm(!showSpendForm)}>
                                        {showSpendForm ? 'Cancel' : 'Add New Spend'}
                                    </button>

                                    {showSpendForm && (
                                        <form onSubmit={spendFormSubmit} className="mb-3">
                                            <div className="mb-3">
                                                <label className="form-label">Title</label>
                                                <input type='text' name='title' className='form-control' required />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Amount</label>
                                                <input type='number' name='amount' className='form-control' required />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Description</label>
                                                <input type='text' name='description' className='form-control' required />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Payment Method</label>
                                                <select name='paymentMethod' className='form-select' required>
                                                    <option value='online'>Online</option>
                                                    <option value='offline'>Offline</option>
                                                </select>
                                            </div>
                                            <div className="mb-3 form-check">
                                                <input type='checkbox' className='form-check-input' name='sharable' />
                                                <label className="form-check-label">Sharable</label>
                                            </div>
                                            <button type='submit' className='btn btn-primary'>Create Spend</button>
                                        </form>
                                    )}

                                    {spends.length > 0 ? (
                                        spends.map(spend => (
                                            <div key={spend._id} className="border p-2 mb-2">
                                                <p><strong>Title:</strong> {spend.title}</p>
                                                <p><strong>Amount:</strong> {spend.amount}</p>
                                                <p><strong>Description:</strong> {spend.description}</p>
                                                <p><strong>Payment Method:</strong> {spend.paymentMethod}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No spends available for this category.</p>
                                    )}
                                </div>
                            ) : (
                                <p>Please select a category to view its spends.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
