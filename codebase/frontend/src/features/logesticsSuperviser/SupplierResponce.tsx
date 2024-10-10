import React, { useState } from 'react';
import LogoContainer from '../../component/LogoContainer';
import { useGetSinglesupplierOfferApiQuery } from '../../services/supplierOffer_service';

// Define interfaces for better type safety


interface Attribute {
    name: string;
    value: string | number; // Adjust the type according to your needs
}

interface PurchaseOrder {
    id: number;
    category: string;
    product: string;
    quantity: number;
    unitPrice: number;
    attributes: Attribute[]; // Specify the type of elements in the attributes array
}


// Example demo data for multiple rows

{ }

const purchaseOrders: PurchaseOrder[] = [

    {
        id: 1,
        category: 'Electronics',
        product: 'Lenovo',
        quantity: 20,
        unitPrice: 20000,
        attributes: {
            category: 'Electronics',
            subCategory: 'Computer',
            attributes: 'ID',
            battery: '3500mAh',
        },
    }
    //,
    //     {
    //         id: 2,
    //         category: 'Furniture',
    //         product: 'Office Chair',
    //         quantity: 15,
    //         unitPrice: 3000,
    //         attributes: {
    //             category: 'Furniture',
    //             subCategory: 'Office Equipment',
    //             attributes: 'Ergonomic',
    //             battery: 'N/A',
    //         },
    //     },
    //     {
    //         id: 3,
    //         category: 'Stationery',
    //         product: 'Printer Paper',
    //         quantity: 100,
    //         unitPrice: 50,
    //         attributes: {
    //             category: 'Stationery',
    //             subCategory: 'Office Supplies',
    //             attributes: 'A4 Size',
    //             battery: 'N/A',
    //         },
    //     },
];

const SupplierResponce: React.FC = () => {
    const [unitPrices, setUnitPrices] = useState<number[]>(purchaseOrders.map(order => order.unitPrice));
    const [showattributes, setShowattributes] = useState<boolean[]>(new Array(purchaseOrders.length).fill(false));

    const { data: supplierOffer } = useGetSinglesupplierOfferApiQuery()

    const handleUnitPriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newPrices = [...unitPrices];
        newPrices[index] = Number(e.target.value);
        setUnitPrices(newPrices);
    };

    const toggleattributes = (index: number) => {
        const newShowattributes = [...showattributes];
        newShowattributes[index] = !newShowattributes[index];
        setShowattributes(newShowattributes);
    };

    const handleSubmit = () => {
        const orderattributes = purchaseOrders.map((order, index) => ({
            id: order.id,
            category: order.category,
            product: order.product,
            quantity: order.quantity,
            unitPrice: unitPrices[index],
            totalPrice: unitPrices[index] * order.quantity,
        }));

        const grandTotal = orderattributes.reduce((acc, order) => acc + order.totalPrice, 0);

        console.log('Order attributes:', orderattributes);
        console.log('Grand Total:', grandTotal);
    };

    return (
        <div className="mx-auto bg-white rounded-lg shadow-lg">
            <div className='w-full bg-[#002a47] py-2 px-4 flex justify-between items-center'>
                <LogoContainer />
            </div>
            <h2 className="mt-4 text-2xl font-semibold mx-4">Supplier Information</h2>
            <div className="mx-4 text-lg pt-2">
                <p>
                    <strong>To: </strong> <span className='text-black'>{supplierOffer?.supplayerId.fullName}</span>
                </p>
            </div>
            <h2 className="mt-4 text-2xl font-semibold mx-[2%]">Purchase Orders</h2>
            <table className="min-w-[90%] m-auto border-collapse border border-gray-300 mt-4">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">No</th>
                        <th className="border border-gray-300 p-2">Categories</th>
                        <th className="border border-gray-300 p-2">Product</th>
                        <th className="border border-gray-300 p-2">Quantity</th>
                        <th className="border border-gray-300 p-2">Unit Price</th>
                        <th className="border border-gray-300 p-2">Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {purchaseOrders.map((order, index) => (
                        <React.Fragment key={order.id}>
                            <tr>
                                <td className="border border-gray-300 p-2">{order.id}</td>
                                <td className="border border-gray-300 p-2">{order.category}</td>
                                <td className="border border-gray-300 p-2">{order.product}</td>
                                <td className="border border-gray-300 p-2">{order.quantity}</td>
                                <td className="border border-gray-300 p-2 flex gap-3">
                                    <input
                                        type="number"
                                        value={unitPrices[index]}
                                        onChange={(e) => handleUnitPriceChange(e, index)}
                                        className="border border-gray-400 p-1 rounded w-full"
                                        aria-label={`Unit price for ${order.product}`}
                                    />
                                    <span>Birr</span>
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <div className='flex justify-between items-center'>
                                        {unitPrices[index] * order.quantity}
                                        <button
                                            onClick={() => toggleattributes(index)}
                                            className="font-semibold rounded px-4 py-2"
                                            aria-label={`Toggle attributes for ${order.product}`}
                                        >
                                            {showattributes[index] ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="#002a47" d="M11.293 8.293a1 1 0 0 1 1.414 0l5.657 5.657a1 1 0 0 1-1.414 1.414L12 10.414l-4.95 4.95a1 1 0 0 1-1.414-1.414z"></path></g></svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" ><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="#002a47" d="M12 15.586l4.95-4.95a1 1 0 1 1 1.414 1.414l-5.657 5.657a1 1 0 0 1-1.414 0l-5.657-5.657a1 1 0 1 1 1.414-1.414L12 15.586z"></path></g></svg>
                                            )}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            {showattributes[index] && (
                                <tr>
                                    <td colSpan={6} className="border border-gray-300 p-2">
                                        <strong>attributes:</strong>
                                        <p><strong>Sub-Category:</strong> {order.attributes.subCategory}</p>
                                        <p><strong>Attributes:</strong> {order.attributes.attributes}</p>
                                        <p><strong>Battery:</strong> {order.attributes.battery}</p>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <div className="my-10 font-bold flex justify-end me-[10%] text-xl">
                <p>Total Price: {unitPrices.reduce((acc, price, index) => acc + price * purchaseOrders[index].quantity, 0)}</p>
            </div>
            <button
                onClick={handleSubmit}
                className="bg-[#002a47] text-white px-4 py-2 rounded m-4  transition"
                aria-label="Submit Purchase Orders"
            >
                Submit Purchase Orders
            </button>
        </div>
    );
};

export default SupplierResponce;
