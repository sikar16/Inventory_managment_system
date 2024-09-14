import React, { useState } from 'react';

// Sample data
interface Column {
    id: string;
    label: string;
    minWidth: number;
    align?: 'left' | 'right' | 'center'; // Optional align property
}

const columns: Column[] = [
    { id: 'no', label: 'No', minWidth: 50 },
    { id: 'category', label: 'Category', minWidth: 70 },
    { id: 'product', label: 'Product', minWidth: 70, align: 'left' },
    { id: 'quantity', label: 'Quantity', minWidth: 70, align: 'left' },
    { id: 'unit', label: 'Unit', minWidth: 70, align: 'left' },
    { id: 'remark', label: 'Remark', minWidth: 70, align: 'left' },
    { id: 'dateOfRequest', label: 'Date of Request', minWidth: 70, align: 'left' },
];

interface Data {
    no: number; // Assuming 'no' is a number
    category: string;
    product: string;
    quantity: number; // Assuming 'quantity' is a number
    unit: string;
    remark: string;
    dateOfRequest: string; // Assuming date is represented as a string
}

function createData(
    no: number,
    category: string,
    product: string,
    quantity: number,
    unit: string,
    remark: string,
    dateOfRequest: string
): Data {
    return { no, category, product, quantity, unit, remark, dateOfRequest };
}

const rows: Data[] = [
    createData(1, "Electronics", "Hp laptop", 20, 'pieces', '...', "2024-08-26"),
    createData(2, "Electronics", "Dell laptop", 5, '-', '-', "2024-08-25"),
];

const RequestDetail: React.FC = () => {
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    const handleToggleDetails = (no: number) => {
        setExpandedRow(expandedRow === no ? null : no);
    };

    return (
        <div>
            <header className="bg-[#002a47] text-white py-2.5 px-2 rounded-e-full">
                <h2>Employee Information</h2>
            </header>
            <div className="p-5 text-sm">
                <p>Name: Zerubabel Dametew</p>
                <p>Role: Finance</p>
                <p>Email: zeru@gmail.com</p>
                <p>Phone: +251 965199682</p>
            </div>

            <h2 className="bg-[#002a47] text-white py-2.5 px-2 rounded-e-full mb-5">Material Request Overview</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        {columns.map((column) => (
                            <th key={column.id} className="p-2 font-medium" style={{ minWidth: column.minWidth }}>
                                {column.label}
                            </th>
                        ))}
                        <th className="p-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <React.Fragment key={row.no}>
                            <tr>
                                {columns.map((column) => (
                                    <td key={column.id} className="p-2" style={{ textAlign: column.align }}>
                                        {row[column.id as keyof Data]}
                                    </td>
                                ))}
                                <td className="p-2">
                                    <button onClick={() => handleToggleDetails(row.no)}>
                                        {expandedRow === row.no ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 256 256">
                                                <path fill="#002A47" d="M210.83 162.83a4 4 0 0 1-5.66 0L128 85.66l-77.17 77.17a4 4 0 0 1-5.66-5.66l80-80a4 4 0 0 1 5.66 0l80 80a4 4 0 0 1 0 5.66"></path>
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 256 256">
                                                <path fill="#002A47" d="m210.83 98.83l-80 80a4 4 0 0 1-5.66 0l-80-80a4 4 0 0 1 5.66-5.66L128 170.34l77.17-77.17a4 4 0 1 1 5.66 5.66"></path>
                                            </svg>
                                        )}
                                    </button>
                                </td>
                            </tr>
                            {expandedRow === row.no && (
                                <tr>
                                    <td colSpan={columns.length + 1} className="p-4 bg-gray-50 border-t border-gray-200 shadow-lg">
                                        <div className="space-y-4 w-[85%] justify-center m-auto p-5">
                                            <div className='flex justify-between'>
                                                <div className="flex gap-4">
                                                    <p className="text-gray-700"><strong>Category:</strong></p>
                                                    <p className="text-gray-600">{row.category}</p>
                                                </div>
                                                <div className="flex justify-between">
                                                    <p className="text-gray-700"><strong>Product Name:</strong></p>
                                                    <p className="text-gray-600">{row.product}</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="flex justify-between gap-4">
                                                    <p className="text-gray-700"><strong>Quantity:</strong></p>
                                                    <p className="text-gray-600">{row.quantity}</p>
                                                </div>
                                                <div className="flex justify-between gap-4">
                                                    <p className="text-gray-700"><strong>Unit:</strong></p>
                                                    <p className="text-gray-600">{row.unit}</p>
                                                </div>
                                                <div className="flex justify-between gap-4">
                                                    <p className="text-gray-700"><strong>Remark:</strong></p>
                                                    <p className="text-gray-600">{row.remark}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <p className="text-gray-700"><strong>Date of Request:</strong></p>
                                                <p className="text-gray-600">{row.dateOfRequest}</p>
                                            </div>
                                            <div className="flex justify-between gap-4">
                                                <p className="text-gray-700"><strong>Reason for Request:</strong></p>
                                                <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, voluptate nihil voluptas neque possimus fugit officia dolorem nostrum optio odit. Officia ipsam animi tempore vel. Mollitia eaque veniam reprehenderit iste.</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RequestDetail;