import { useState, useRef, useEffect } from 'react';
import AddProduct from './admin/product/AddProduct';
import { FaPlus } from 'react-icons/fa';
import DialogTitle from '@mui/material/DialogTitle';

interface Category {
    id: number;
    name: string;
    subcategories: string[];
}

interface Product {
    id: number;
    name: string;
    attributes: {
        RAM: string;
        ROM: string;
    };
}

interface FormData {
    category: string;
    subcategory: string;
    products: number[];
    quantity: string;
    unit: string;
    desiredDate: string;
    reason: string;
}

const MaterialRequestForm: React.FC = () => {
    const categories: Category[] = [
        { id: 1, name: 'Electronics', subcategories: ['Computer', 'Smartphone'] },
        { id: 2, name: 'Furniture', subcategories: ['Chair', 'Table'] },
    ];

    const productsData: Record<string, Product[]> = {
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

    const initialFormData: FormData = {
        category: '',
        subcategory: '',
        products: [],
        quantity: '',
        unit: '',
        desiredDate: '',
        reason: '',
    };

    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [requests, setRequests] = useState<FormData[]>([]);
    const categoryRef = useRef<HTMLSelectElement | null>(null);
    const [isAddProductOpen, setIsAddProductOpen] = useState<boolean>(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const toggleAddProduct = () => {
        setIsAddProductOpen(!isAddProductOpen);
    };

    useEffect(() => {
        if (categoryRef.current) {
            categoryRef.current.focus();
        }
    }, [requests.length]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.category) {
            newErrors.category = 'Category is required';
        }

        if (!formData.subcategory) {
            newErrors.subcategory = 'Subcategory is required';
        }

        if (formData.products.length === 0) {
            newErrors.products = 'Please select at least one product';
        }

        if (!formData.quantity || Number(formData.quantity) <= 0) {
            newErrors.quantity = 'Quantity must be greater than 0';
        }

        if (!formData.unit) {
            newErrors.unit = 'Unit is required';
        }

        if (!formData.desiredDate) {
            newErrors.desiredDate = 'Desired date is required';
        } else {
            const today = new Date().toISOString().split('T')[0];
            if (formData.desiredDate < today) {
                newErrors.desiredDate = 'Desired date must be in the future';
            }
        }

        if (!formData.reason.trim()) {
            newErrors.reason = 'Reason for request is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const addRequest = () => {
        if (!validateForm()) return;

        setRequests([...requests, formData]);
        setFormData(initialFormData);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const category = e.target.value;
        setFormData({ ...formData, category, subcategory: '', products: [] });
    };

    const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const subcategory = e.target.value;
        setFormData({ ...formData, subcategory });
    };

    const handleCheckboxChange = (productId: number) => {
        setFormData(prevFormData => {
            const updatedProducts = prevFormData.products.includes(productId)
                ? prevFormData.products.filter(id => id !== productId)
                : [...prevFormData.products, productId];
            return { ...prevFormData, products: updatedProducts };
        });
    };

    return (
        <div className="px-6 bg-white rounded-lg ">
            {/* Request List Section */}
            <div className="mb-10">
                <h3 className="text-lg font-medium text-gray-700 mb-4 underline-offset-1">Request lists</h3>
                <table className="w-full border border-gray-300 rounded-lg">
                    <thead className="bg-gray-50">
                        <tr>
                            <td className="border px-4 py-2 text-left text-gray-600">Products</td>
                            <td className="border px-4 py-2 text-left text-gray-600">Quantity</td>
                            <td className="border px-4 py-2 text-left text-gray-600">Reason</td>
                        </tr>
                    </thead>
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
                    </tbody>
                </table>
            </div>

            {/* Form Section */}
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
                        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Subcategory:</label>
                        {formData.category && (
                            <select
                                name="subcategory"
                                value={formData.subcategory}
                                onChange={handleSubcategoryChange}
                                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none"
                            >
                                <option value="">Select Subcategory</option>
                                {categories
                                    .find(category => category.name === formData.category)
                                    ?.subcategories.map(sub => (
                                        <option key={sub} value={sub}>
                                            {sub}
                                        </option>
                                    ))}
                            </select>
                        )}
                        {errors.subcategory && <p className="text-red-500 text-sm">{errors.subcategory}</p>}
                    </div>
                </div>

                <div>
                    {formData.subcategory && (
                        <div>
                            <h3 className="text-lg font-medium text-gray-700 mb-4">Select Products:</h3>
                            <table className="w-full border border-gray-300 rounded-lg">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <td className="border px-4 py-2 text-left">Product Name</td>
                                        <td className="border px-4 py-2 text-left">RAM</td>
                                        <td className="border px-4 py-2 text-left">ROM</td>
                                    </tr>
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
                                                <label htmlFor={`product-${product.id}`} className="text-gray-700 text-sm cursor-pointer">
                                                    {product.name}
                                                </label>
                                            </td>
                                            <td className="border px-4 py-2 text-sm">{product.attributes.RAM}</td>
                                            <td className="border px-4 py-2 text-sm">{product.attributes.ROM}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {errors.products && <p className="text-red-500 text-sm mt-1">{errors.products}</p>}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Quantity:</label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none"
                        />
                        {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Unit:</label>
                        <input
                            type="text"
                            name="unit"
                            value={formData.unit}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none"
                        />
                        {errors.unit && <p className="text-red-500 text-sm">{errors.unit}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Desired Date:</label>
                    <input
                        type="date"
                        name="desiredDate"
                        value={formData.desiredDate}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none"
                    />
                    {errors.desiredDate && <p className="text-red-500 text-sm">{errors.desiredDate}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Reason for Request:</label>
                    <textarea
                        name="reason"
                        value={formData.reason}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none"
                    ></textarea>
                    {errors.reason && <p className="text-red-500 text-sm">{errors.reason}</p>}
                </div>

                <div className="flex justify-between items-center">
                    <button
                        type="button"
                        onClick={addRequest}
                        className="bg-[#002A47] text-white px-4 py-2 rounded-lg "
                    >
                        Add Another Request
                    </button>

                    <button
                        type="button"
                        onClick={toggleAddProduct}
                        className="flex items-center text-[#002A47] hover:underline"
                    >
                        <FaPlus className="mr-2" /> Add New Product
                    </button>
                </div>
            </form>

            {isAddProductOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-[500px]">
                        <DialogTitle>Add Product</DialogTitle>
                        <AddProduct handleCloseDialog={toggleAddProduct} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MaterialRequestForm;