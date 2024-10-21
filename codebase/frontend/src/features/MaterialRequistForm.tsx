import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetAllproductSubCategoryQuery } from "../services/productSubcategory_service";
import { ProductCategoryType } from "../_types/productCategory_type";
import { ProductSubCategoryType } from "../_types/productSubcategory_type";
import { ProductType } from "../_types/product_type";
import { useGetAllproductQuery } from "../services/product_service";
import { TemplateAttributeType } from "../_types/template_type";
import { useGetAllproductCategoryQuery } from "../services/productCategorySerivce";
import { useNavigate } from "react-router-dom";
import { useAddNewMaterialReqMutation } from "../services/materialReq_service";
import { useToast } from "../context/ToastContext";
interface FormData {
  categoryId: string;
  subcategoryId: string;
  products: string[];
  quantity: string;
  unit: string;
  desiredDate: string;
  reason: string;
  departmentHeadId: number;
}

const MaterialRequestForm: React.FC = () => {
  const { toastData, setToastData } = useToast();
  const { isSuccess: isCategorySuccess, data: categoryList = [] } =
    useGetAllproductCategoryQuery();
  const { data: subCategoriesList = [] } =
    useGetAllproductSubCategoryQuery("subcategory");
  const { data: productList = [] } = useGetAllproductQuery("product");

  const [selectedProductAttributes, setSelectedProductAttributes] = useState<{
    [key: number]: TemplateAttributeType[];
  }>({});

  const categories: ProductCategoryType[] = isCategorySuccess
    ? categoryList
    : [];
  const subCategories: ProductSubCategoryType[] = subCategoriesList || [];
  const products: ProductType[] = productList || [];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      categoryId: "",
      subcategoryId: "",
      products: [],
      quantity: "",
      unit: "",
      desiredDate: "",
      reason: "",
      departmentHeadId: 5,
    },
  });

  const [requests, setRequests] = useState<FormData[]>([]);
  const categoryId = watch("categoryId");
  const subcategoryId = watch("subcategoryId");

  const addProductToRequest = (data: FormData) => {
    setRequests((prev) => [...prev, data]);
    reset(); // Reset form after adding a product
  };
  const [addNewMaterialReq] = useAddNewMaterialReqMutation();
  const submitRequest = async () => {
    const validatedRequests = requests.map((request) => ({
      departmentHeadId: request.departmentHeadId,
      items: request.products.map((productId) => ({
        productId: Number(productId),
        quantityRequested: Number(request.quantity),
        remark: request.reason,
      })),
    }));

    const requestData = {
      items: validatedRequests.flatMap((i) => i.items),
    };
    console.log(requestData);

    try {
      await addNewMaterialReq({
        items: requestData.items,
      });
      console.log("Request submitted successfully");
      setToastData({
        message: "Request submitted successfully",
        success: true,
      });
      navigate(-1);
    } catch (error: any) {
      setToastData({
        message: error.message,
        success: false,
      });
      console.error("Error submitting request:", error);
    }
  };

  // Fetch product attributes when subcategory changes
  useEffect(() => {
    if (subcategoryId) {
      const selectedProducts = products.filter(
        (p) => p.subcategoryId === Number(subcategoryId)
      );
      const attributesMap: { [key: number]: TemplateAttributeType[] } = {};
      selectedProducts.forEach((product) => {
        attributesMap[product.id] = product.templateAttributeType || [];
      });
      setSelectedProductAttributes(attributesMap);
    }
  }, [subcategoryId, products]);

  const getProductNames = (productIds: string[]) => {
    return productIds
      .map((id) => {
        const product = products.find((p) => p.id === Number(id));
        return product ? product.name : "";
      })
      .join(", ");
  };

  const navigate = useNavigate();

  return (
    <div className="px-6 bg-white rounded-lg pb-8">
      {/* Request List Section */}
      <div className="mb-10">
        <div className="flex justify-between">
          <p className="text-[#002A47] rounded-e-full pe-20 ps-2 py-[10px] w-1/2 mb-6 text-2xl">
            Material Request Form
          </p>
          <p
            className="hover:underline text-black text-sm flex justify-start"
            onClick={() => navigate(-1)}
          >
            Back
          </p>
        </div>
        <div className="flex gap-4">
          <p>Requests List</p>
        </div>
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="border px-4 py-2 text-left text-gray-600">
                Products
              </th>
              <th className="border px-4 py-2 text-left text-gray-600">
                Quantity
              </th>
              <th className="border px-4 py-2 text-left text-gray-600">
                Reason
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border px-4 py-2">
                  {getProductNames(req.products)}
                </td>
                <td className="border px-4 py-2">{req.quantity}</td>
                <td className="border px-4 py-2">{req.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form Section */}
      <form className="space-y-6" onSubmit={handleSubmit(addProductToRequest)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Category:
            </label>
            <select
              {...register("categoryId", { required: "Category is required" })}
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-red-500 text-sm">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Subcategory:
            </label>
            {categoryId && (
              <select
                {...register("subcategoryId", {
                  required: "Subcategory is required",
                })}
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none"
              >
                <option value="">Select Subcategory</option>
                {subCategories
                  .filter((sub) => sub.categoryId === Number(categoryId))
                  .map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
              </select>
            )}
            {errors.subcategoryId && (
              <p className="text-red-500 text-sm">
                {errors.subcategoryId.message}
              </p>
            )}
          </div>
        </div>

        {/* Products Selection */}
        {subcategoryId && (
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Select Products:
            </h3>
            <table className="w-full border border-gray-300 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-left">Product Name</th>
                  <th className="border px-4 py-2 text-left">Attributes</th>
                </tr>
              </thead>
              <tbody>
                {products
                  .filter((p) => p.subcategoryId === Number(subcategoryId))
                  .map((prod) => (
                    <tr
                      key={prod.id}
                      className="bg-white hover:bg-blue-50 transition-colors"
                    >
                      <td className="border px-4 py-2">
                        <input
                          type="checkbox"
                          value={prod.id}
                          {...register("products", {
                            required: "At least one product must be selected",
                          })}
                          className="mr-3 focus:outline-none"
                        />
                        <label className="text-gray-700 text-sm cursor-pointer">
                          {prod.name}
                        </label>
                      </td>
                      <td className="border px-4 py-2 text-sm">
                        {selectedProductAttributes[prod.id]?.length > 0 ? (
                          <ul>
                            {selectedProductAttributes[prod.id].map((attr) => (
                              <li key={attr.id}>{attr.name}:</li>
                            ))}
                          </ul>
                        ) : (
                          "No attributes available"
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {errors.products && (
              <p className="text-red-500 text-sm">{errors.products.message}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Quantity:
            </label>
            <input
              type="number"
              {...register("quantity", {
                required: "Quantity is required",
                validate: (value) =>
                  Number(value) > 0 || "Quantity must be greater than 0",
              })}
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Unit:
            </label>
            <select
              {...register("unit", { required: "Unit is required" })}
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none"
            >
              <option value="">Select a unit</option>
              <option value="units">Units</option>
              <option value="units">Pieces</option>
              <option value="kg">Kilograms (kg)</option>
              <option value="g">Grams (g)</option>
              <option value="mg">Milligrams (mg)</option>
              <option value="liters">Liters (L)</option>
              <option value="ml">Milliliters (ml)</option>
              <option value="cm">Centimeters (cm)</option>
              <option value="m">Meters (m)</option>
              <option value="mm">Millimeters (mm)</option>
            </select>
            {errors.unit && (
              <p className="text-red-500 text-sm">{errors.unit.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Desired Date:
            </label>
            <input
              type="date"
              {...register("desiredDate", {
                required: "Desired date is required",
              })}
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none"
            />
            {errors.desiredDate && (
              <p className="text-red-500 text-sm">
                {errors.desiredDate.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Reason:
            </label>
            <textarea
              {...register("reason", { required: "Reason is required" })}
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none"
              rows={3}
            />
            {errors.reason && (
              <p className="text-red-500 text-sm">{errors.reason.message}</p>
            )}
          </div>
        </div>
        <div>
          <input
            type="hidden"
            {...register("departmentHeadId", {
              required: "Department Head ID is required",
            })}
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="text-[#002a47]  px-6 py-2 rounded-lg  transition-colors"
          >
            Add Request
          </button>
          <button
            type="button"
            onClick={submitRequest}
            className="bg-[#002a47] text-white px-6 py-2 rounded-lg  transition-colors"
          >
            Submit All Requests
          </button>
        </div>
      </form>
    </div>
  );
};

export default MaterialRequestForm;
