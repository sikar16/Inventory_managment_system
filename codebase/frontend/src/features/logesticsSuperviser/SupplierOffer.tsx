import React, { useState } from "react";
import LogoContainer from "../../component/LogoContainer";

const SupplierOffer: React.FC = () => {
    // State to manage which dropdown is open
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);

    // Dummy data for the table (this can be dynamic in a real case)
    const orders = [
        {
            category: "Electronics",
            product: "Lenovo",
            quantity: 20,
            unit: "-",
            desiredDate: "08-16-2024",
            attributes: {
                subCategory: "Computer",
                ram: "8GB",
                storage: "512GB",
                screenSize: "14 Inch",
                battery: "3500mAh",
            },
        },
        {
            category: "Electronics",
            product: "HP",
            quantity: 10,
            unit: "-",
            desiredDate: "08-18-2024",
            attributes: {
                subCategory: "Computer",
                ram: "16GB",
                storage: "1TB",
                screenSize: "15 Inch",
                battery: "4000mAh",
            },
        },
        // Add more orders as needed
    ];

    // Toggle dropdown based on the selected index
    const toggleDropdown = (index: number) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    return (
        <div>

            <div className=' py-2 px-3 flex justify-between  items-center bg-[#002a47]'>
                <LogoContainer />
            </div>
            <div className="py-8 bg-gray-100 min-h-screen w-full flex flex-col items-center">
                {/* Supplier Information */}
                <div className="w-full max-w-4xl mb-6">
                    <h2 className="text-xl font-bold bg-[#002a47] text-white py-2 px-4 ">
                        Supplier Information
                    </h2>
                    <p className="p-4 bg-white rounded-b-md ">
                        To: Vector Four Engineering PLC
                    </p>
                </div>

                {/* Purchase Orders */}
                <div className="w-full max-w-4xl mb-6">
                    <h2 className="text-xl font-bold bg-[#002a47] text-white py-2 px-4 rounded-t-md">
                        Purchase Orders
                    </h2>
                    <div className="p-4 bg-white rounded-b-md shadow">
                        {/* Table */}
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-gray-200 text-left">
                                    <th className="p-2 border">No</th>
                                    <th className="p-2 border">Category</th>
                                    <th className="p-2 border">Product</th>
                                    <th className="p-2 border">Quantity</th>
                                    <th className="p-2 border">Unit</th>
                                    <th className="p-2 border">Desired Date</th>
                                    <th className="p-2 border"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <td className="p-2 border">{index + 1}</td>
                                            <td className="p-2 border">{order.category}</td>
                                            <td className="p-2 border">{order.product}</td>
                                            <td className="p-2 border">{order.quantity}</td>
                                            <td className="p-2 border">{order.unit}</td>
                                            <td className="p-2 border">{order.desiredDate}</td>
                                            <td className="p-2 border">
                                                <button
                                                    onClick={() => toggleDropdown(index)}
                                                    className="text-blue-600 underline"
                                                >
                                                    {openDropdown === index ?

                                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" ><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="#002a47" d="M11.293 8.293a1 1 0 0 1 1.414 0l5.657 5.657a1 1 0 0 1-1.414 1.414L12 10.414l-4.95 4.95a1 1 0 0 1-1.414-1.414z"></path></g></svg> :
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" ><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="#002a47" d="M12.707 15.707a1 1 0 0 1-1.414 0L5.636 10.05A1 1 0 1 1 7.05 8.636l4.95 4.95l4.95-4.95a1 1 0 0 1 1.414 1.414z"></path></g></svg>}
                                                </button>
                                            </td>
                                        </tr>

                                        {/* Dropdown with product details */}
                                        {openDropdown === index && (
                                            <tr>
                                                <td colSpan={7} className="p-4">
                                                    <div className="p-4 bg-gray-50 border rounded-md">
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <p>
                                                                    <strong>Categories:</strong> {order.category}
                                                                </p>
                                                                <p>
                                                                    <strong>Sub-Categories:</strong>{" "}
                                                                    {order.attributes.subCategory}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p>
                                                                    <strong>Product:</strong> {order.product}
                                                                </p>
                                                                <p>
                                                                    <strong>Quantity:</strong> {order.quantity}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4 grid grid-cols-3 gap-4">
                                                            <p>
                                                                <strong>RAM:</strong> {order.attributes.ram}
                                                            </p>
                                                            <p>
                                                                <strong>Storage:</strong> {order.attributes.storage}
                                                            </p>
                                                            <p>
                                                                <strong>Screen Size:</strong>{" "}
                                                                {order.attributes.screenSize}
                                                            </p>
                                                            <p>
                                                                <strong>Battery Capacity:</strong>{" "}
                                                                {order.attributes.battery}
                                                            </p>
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
                </div>

                {/* Send Button */}
                <div className="w-full max-w-4xl flex ">
                    <button className="bg-[#002a47] text-white py-2 px-10 rounded-md ">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SupplierOffer;
