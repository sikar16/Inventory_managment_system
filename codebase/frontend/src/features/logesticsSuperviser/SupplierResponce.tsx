import React, { useState, useEffect } from "react";
import LogoContainer from "../../component/LogoContainer";
import { useGetSingleSupplierOfferByIdApiQuery } from "../../services/supplierOffer_service";
import { useParams } from "react-router-dom";

interface ProductAttribute {
  id: number;
  productId: number;
  templateAttributeId: number;
  value: string;
}

interface Subcategory {
  id: number;
  categoryId: number;
  name: string;
  createdAt: string; // ISO date string
}

interface Product {
  id: number;
  subcategoryId: number;
  name: string;
  createdAt: string; // ISO date string
  productAttributes: ProductAttribute[];
  subcategory: Subcategory;
}

interface PurchasedOrder {
  id: number;
  userId: number;
  createdAt: string; // ISO date string
  user: User;
}

interface User {
  id: number;
  email: string;
  activeStatus: string;
  role: string;
  createdAt: string; // ISO date string
  departmentId: number;
  department?: Department; // Optional if department is not always present
}

interface Department {
  id: number;
  name: string;
  createdAt: string; // ISO date string
}

interface Item {
  id: number;
  purchasOrderId: number;
  productId: number;
  quantityToBePurchased: string; // Assuming it's a string based on the example
  remark: string;
  products: Product;
  purchasedOrder: PurchasedOrder;
}

interface Count {
  items: number;
  SupplayerOffer: number;
  grn: number;
  winner: number;
}

export interface SupplayerOfferType {
  id: number;
  userId: number;
  createdAt: string; // ISO date string
  _count: Count;
  items: Item[];
  user: User;
}

const SupplierResponse: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: supplierOffer } = useGetSingleSupplierOfferByIdApiQuery({
    params: +parseInt(id as string, 10),
  });

  const [unitPrices, setUnitPrices] = useState<number[]>(
    () => supplierOffer?.items.map(() => 0) || []
  );
  const [showAttributes, setShowAttributes] = useState<boolean[]>(
    new Array(supplierOffer?.items.length || 0).fill(false)
  );

  useEffect(() => {
    if (supplierOffer) {
      setUnitPrices(supplierOffer.items.map(() => 0));
      setShowAttributes(new Array(supplierOffer.items.length).fill(false));
    }
  }, [supplierOffer]);

  const handleUnitPriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newPrices = [...unitPrices];
    newPrices[index] = Number(e.target.value);
    setUnitPrices(newPrices);
  };

  const toggleAttributes = (index: number) => {
    const newShowAttributes = [...showAttributes];
    newShowAttributes[index] = !newShowAttributes[index];
    setShowAttributes(newShowAttributes);
  };

  const handleSubmit = () => {
    if (!supplierOffer) return; // Ensure supplierOffer is available

    const items = supplierOffer.items.map((order, index) => ({
      productId: order.productId,
      quantity: parseInt(order.quantityToBePurchased, 10), // Ensure quantity is a number
      unitPrice: unitPrices[index],
    }));

    const totalPrice = items.reduce(
      (acc, item, index) => acc + item.unitPrice * item.quantity,
      0
    );

    const outputData = {
      purchasedOrderId: supplierOffer.id, // Adjust this if needed based on your data structure
      supplayerId: supplierOffer.userId,
      totalPrice: totalPrice,
      items: items,
    };

    console.log("Output Data:", JSON.stringify(outputData, null, 2));
  };

  return (
    <div className="mx-auto bg-white rounded-lg shadow-lg">
      <div className="w-full bg-[#002a47] py-2 px-4 flex justify-between items-center">
        <LogoContainer />
      </div>
      <h2 className="mt-4 text-2xl font-semibold mx-4">Supplier Information</h2>
      <div className="mx-4 text-lg pt-2">
        <p>
          <strong>From: </strong>{" "}
          <span className="text-black">{supplierOffer?.user.email}</span>
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
          {supplierOffer?.items.map((order, index) => (
            <React.Fragment key={order.id}>
              <tr>
                <td className="border border-gray-300 p-2">{order.id}</td>
                <td className="border border-gray-300 p-2">
                  {order.products.subcategory.name}
                </td>
                <td className="border border-gray-300 p-2">
                  {order.products.name}
                </td>
                <td className="border border-gray-300 p-2">
                  {order.quantityToBePurchased}
                </td>
                <td className="border border-gray-300 p-2 flex gap-3">
                  <input
                    type="number"
                    value={unitPrices[index] || 0}
                    onChange={(e) => handleUnitPriceChange(e, index)}
                    className="border border-gray-400 p-1 rounded w-full"
                    aria-label={`Unit price for ${order.products.name}`}
                  />
                  <span>Birr</span>
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="flex justify-between items-center">
                    {unitPrices[index] *
                      parseInt(order.quantityToBePurchased, 10)}
                    <button
                      onClick={() => toggleAttributes(index)}
                      className="font-semibold rounded px-4 py-2"
                      aria-label={`Toggle attributes for ${order.products.name}`}
                    >
                      {showAttributes[index] ? (
                        // Replace with your collapse SVG here
                        <span>-</span>
                      ) : (
                        // Replace with your expand SVG here
                        <span>+</span>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              {showAttributes[index] && (
                <tr>
                  <td colSpan={6} className="border border-gray-300 p-2">
                    <strong>Attributes:</strong>
                    {order.products.productAttributes.map((attr) => (
                      <p key={attr.id}>
                        <strong>{attr.templateAttributeId}:</strong>{" "}
                        {attr.value}
                      </p>
                    ))}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="my-10 font-bold flex justify-end me-[10%] text-xl">
        {supplierOffer && (
          <p>
            Total Price:{" "}
            {unitPrices.reduce(
              (acc, price, index) =>
                acc +
                price *
                  parseInt(
                    supplierOffer.items[index]?.quantityToBePurchased || "0",
                    10
                  ),
              0
            )}
          </p>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-[#002a47] text-white px-4 py-2 rounded m-4 transition"
        aria-label="Submit Purchase Orders"
      >
        Submit Purchase Orders
      </button>
    </div>
  );
};

export default SupplierResponse;
