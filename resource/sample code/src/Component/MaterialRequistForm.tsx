import React, { useState, useRef, useEffect } from 'react';
import AddProduct from './Admin/AddProduct'; // Import your AddProduct component
import { FaPlus } from 'react-icons/fa'; // Import plus icon from react-icons
import DialogTitle from '@mui/material/DialogTitle';

const MaterialRequestForm = () => {
    const categories = [
        { id: 1, name: 'Electronics', subcategories: ['Computer', 'Smartphone'] },
        { id: 2, name: 'Furniture', subcategories: ['Chair', 'Table'] },
    ];

    const productsData = {
        'Computer': [
            { id: 1, name: 'Laptop', attributes: { RAM: '8GB', ROM: '256GB' } },
            { id: 2, name: 'Desktop', attributes: { RAM: '16GB', ROM: '512GB' } },
        ],
        'Smartphone': [
            { id: 3, name: 'Smartphone A', attributes: { RAM: '6GB', ROM: '128GB' } },
        ],
        'Chair': [
            { id: 4, name: 'Office Chair', attributes: { RAM: 'N/A', ROM: 'N/A' } },
        ],
        'Table': [
            { id: 5, name: 'Dining Table', attributes: { RAM: 'N/A', ROM: 'N/A' } },
        ],
    };

    const initialFormData = {
        category: '',
        subcategory: '',
        products: [],
        quantity: '',
        unit: '',
        desiredDate: '',
        reason: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [requests, setRequests] = useState([]);
    const categoryRef = useRef(null);
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);

    const toggleAddProduct = () => {
        setIsAddProductOpen(!isAddProductOpen);
    };
    useEffect(() => {
        if (categoryRef.current) {
            categoryRef.current.focus();
        }
    }, [requests.length]);
    const handleAddProduct = () => {
        setFormData(initialFormData);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setFormData({ ...formData, category, subcategory: '', products: [] });
    };

    const handleSubcategoryChange = (e) => {
        const subcategory = e.target.value;
        setFormData({ ...formData, subcategory });
    };

    const handleCheckboxChange = (productId) => {
        setFormData(prevFormData => {
            const updatedProducts = prevFormData.products.includes(productId)
                ? prevFormData.products.filter(id => id !== productId)
                : [...prevFormData.products, productId];
            return { ...prevFormData, products: updatedProducts };
        });
    };

    const handleReasonChange = (e) => {
        setFormData({ ...formData, reason: e.target.value });
    };

    const addRequest = () => {
        if (!formData.category || !formData.subcategory || !formData.products.length || !formData.reason) {
            alert('Please fill out all required fields.');
            return;
        }
        setRequests([...requests, formData]);
        setFormData(initialFormData);
    };

    const handleSubmit = () => {
        if (requests.some(req => !req.category || !req.subcategory || !req.products.length || !req.reason)) {
            alert('Please fill out all fields in each request.');
            return;
        }
        console.log('Request Data:', requests);
    };

    return (
        <div className="container mx-auto px-6 bg-white rounded-lg ">
            <>

                <div className=" mb-10">
                    <h3 className="text-lg font-medium text-gray-700 mb-4 underline-offset-1">Request lists</h3>
                    <table className="w-full border border-gray-300 rounded-lg">
                        <thead className="bg-gray-50">
                            <tr>
                                <td className="border px-4 py-2 text-left text-gray-600 ">Products</td>
                                <td className="border px-4 py-2 text-left text-gray-600">Quantity</td>
                                <td className="border px-4 py-2 text-left text-gray-600">Reason</td>
                            </tr>
                        </thead>
                        {requests.length > 0 && (

                            <tbody>
                                {requests.map((req, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="border px-4 py-2">
                                            {productsData[req.subcategory]?.filter(product => req.products.includes(product.id)).map(product => product.name).join(', ')}
                                        </td>
                                        <td className="border px-4 py-2">{req.quantity}</td>
                                        <td className="border px-4 py-2">{req.reason}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <button
                                        type="button"
                                        onClick={handleAddProduct}
                                        className=" text-white px-2 py-2 rounded "
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width={21} height={24} viewBox="0 0 448 512" ><path fill="#currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256z"></path></svg>
                                    </button>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>
            </>
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Category:</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleCategoryChange}
                            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none"
                            ref={categoryRef}
                        >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Subcategory:</label>
                        {formData.category && (
                            <select
                                name="subcategory"
                                value={formData.subcategory}
                                onChange={handleSubcategoryChange}
                                className="border border-gray-300 p-3 rounded-lg w-full  focus:outline-none"
                            >
                                <option value="">Select Subcategory</option>
                                {categories
                                    .find(category => category.name === formData.category)
                                    .subcategories.map(sub => (
                                        <option key={sub} value={sub}>
                                            {sub}
                                        </option>
                                    ))}
                            </select>
                        )}
                    </div>
                </div>

                <div>
                    {formData.subcategory && (
                        <div>
                            <h3 className="text-lg font-medium text-gray-700 mb-4">Select Products:</h3>
                            <table className="w-full border border-gray-300 rounded-lg">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border px-4 py-2 text-left">Product Name</th>
                                        <th className="border px-4 py-2 text-left">RAM</th>
                                        <th className="border px-4 py-2 text-left">ROM</th>
                                    </tr>
                                    <tr></tr>
                                </thead>
                                <tbody>
                                    {productsData[formData.subcategory]?.map(product => (
                                        <tr key={product.id} className="bg-white hover:bg-blue-50 transition-colors">
                                            <td className="border px-4 py-2">
                                                <input
                                                    type="checkbox"
                                                    id={`product-${product.id}`}
                                                    checked={formData.products.includes(product.id)}
                                                    onChange={() => handleCheckboxChange(product.id)}
                                                    className="mr-3 focus:outline-none"
                                                />
                                                <label htmlFor={`product-${product.id}`} className="text-gray-700 font-semibold cursor-pointer">
                                                    {product.name}
                                                </label>
                                            </td>
                                            <td className="border px-4 py-2 text-gray-600 text-sm">
                                                {product.attributes.RAM}
                                            </td>
                                            <td className="border px-4 py-2 text-gray-600 text-sm">
                                                {product.attributes.ROM}
                                            </td>
                                            {/* Plus Icon Button */}

                                        </tr>

                                    ))}
                                    <tr>
                                        <button
                                            type="button"
                                            onClick={toggleAddProduct}
                                            className=" text-white px-2 py-2 rounded "
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width={21} height={24} viewBox="0 0 448 512" ><path fill="#currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256z"></path></svg>
                                        </button>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                    {isAddProductOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                                <DialogTitle>Add New Product</DialogTitle>
                                <AddProduct />
                                <button
                                    onClick={toggleAddProduct}
                                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                                >
                                    &times;
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Quantity:</label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Unit:</label>
                        <select
                            name="unit"
                            value={formData.unit}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-3 rounded-lg w-full"
                        >
                            <option value="">Select Unit</option>
                            <option value="Pieces">Pieces</option>
                        </select>
                    </div>
                </div>
                <div className='grid grid-cols-2'>
                    <div >
                        <label className="block text-gray-700 font-medium mb-2">Desired Date:</label>
                        <input
                            type="date"
                            name="desiredDate"
                            value={formData.desiredDate}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Reason for Request:</label>
                    <textarea
                        name="reason"
                        value={formData.reason}
                        onChange={handleReasonChange}
                        className="border border-gray-300 p-3 rounded-lg w-3/4"
                        rows="4"
                    />
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={addRequest}
                        className="bg-[#002a47] text-white px-4 py-2 rounded"
                    >
                        Add Request
                    </button>
                </div>
            </form >



            <div className="mt-6">
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-[#002a47] text-white px-6 py-3 rounded-lg transition-colors"
                >
                    Submit All Requests
                </button>
            </div>
        </div >
    );
};

export default MaterialRequestForm;
