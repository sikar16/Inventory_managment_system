
const deliveryInfo = {
    noteNo: '#12345',
    date: '8/7/2024',
    name: 'John Smith'
};

const supplierInfo = {
    name: 'Tech Suppliers Ltd.',
    address: '123 Supplier Ave, Citytown',
    information: 'Supplier ID: #987654'
};

const items = [
    {
        description: 'Laptop',
        unit: 'pcs',
        quantityOrder: 20,
        quantityReceived: 20,
        unitPrice: 20000,
        totalPrice: 400000,
        remark: 'Delivered in good condition'
    },
    {
        description: 'Monitor',
        unit: 'pcs',
        quantityOrder: 15,
        quantityReceived: 15,
        unitPrice: 15000,
        totalPrice: 225000,
        remark: 'Packaging slightly damaged'
    },
    {
        description: 'Keyboard',
        unit: 'pcs',
        quantityOrder: 50,
        quantityReceived: 50,
        unitPrice: 2000,
        totalPrice: 100000,
        remark: ''
    },
    {
        description: 'Mouse',
        unit: 'pcs',
        quantityOrder: 50,
        quantityReceived: 48,
        unitPrice: 1000,
        totalPrice: 48000,
        remark: '2 units missing'
    }
];

const GoodReceiverNote = ({ receivedBy }: { receivedBy: any }) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantityReceived, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);
    return (
        <div className="p-5 w-[80%] mx-auto border border-gray-300">
            <h1 className="text-center text-3xl mb-5 text-[#002344] font-medium">Good Receiver Note</h1>
            <div className="flex justify-between mb-5">
                <div>
                    <p><strong>Delivery Note no:</strong> {deliveryInfo.noteNo}</p>
                    <p><strong>Date:</strong> {deliveryInfo.date}</p>
                </div>
            </div>

            <div className="flex justify-between mb-5">
                <div>
                    <p className="text-xl">Delivery Information</p>
                    <p><strong>Delivery Id:</strong> {deliveryInfo.noteNo}</p>
                    <p><strong>Delivery Name:</strong> {deliveryInfo.name}</p>
                    <p><strong>Delivery Date:</strong> {deliveryInfo.date}</p>
                </div>
                <div>
                    <p className="text-xl">Supplier Information</p>
                    <p><strong>Supplier Name:</strong> {supplierInfo.name}</p>
                    <p><strong>Supplier Address:</strong> {supplierInfo.address}</p>
                    <p><strong>Supplier Information:</strong> {supplierInfo.information}</p>
                </div>
            </div>

            <div className="mb-5">
                <p><strong>Received By:</strong> {receivedBy}</p>
            </div>

            <table className="w-full border-collapse mb-5">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">No</th>
                        <th className="border border-gray-300 p-2">Item Description</th>
                        <th className="border border-gray-300 p-2">Unit</th>
                        <th className="border border-gray-300 p-2">Quantity Order</th>
                        <th className="border border-gray-300 p-2">Quantity Received</th>
                        <th className="border border-gray-300 p-2">Unit Price</th>
                        <th className="border border-gray-300 p-2">Total Price</th>
                        <th className="border border-gray-300 p-2">Remark</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 p-2">{index + 1}</td>
                            <td className="border border-gray-300 p-2">{item.description}</td>
                            <td className="border border-gray-300 p-2">{item.unit}</td>
                            <td className="border border-gray-300 p-2">{item.quantityOrder}</td>
                            <td className="border border-gray-300 p-2">{item.quantityReceived}</td>
                            <td className="border border-gray-300 p-2">{item.unitPrice}</td>
                            <td className="border border-gray-300 p-2">{item.totalPrice}</td>
                            <td className="border border-gray-300 p-2">{item.remark}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-between mt-5">
                <p><strong>Total Items:</strong> {totalItems}</p>
                <p><strong>Total Price:</strong> {totalPrice}</p>
            </div>
        </div>
    );
};

export default GoodReceiverNote;