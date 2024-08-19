import storeSchem from "./storeScheme.js";
import prisma from "../../config/prisma.js";

const storeController = {
  getSingleStore: async (req, res, next) => {
    try {
      const storeId = parseInt(req.params.id, 10);
      if (isNaN(storeId)) {
        return res.status(403).json({
          success: false,
          message: "invalid store id",
        });
      }
      const store = await prisma.store.findUnique({
        where: {
          id: storeId,
        },
      });

      if (!store) {
        return res.status(404).json({
          success: false,
          message: "store not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: store,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "error while fetching single store",
      });
    }
  },
  getAllStore: async (req, res, next) => {
    try {
      const stores = await prisma.store.findMany({});
      return res.status(200).json({
        success: true,
        message: "fetching all store",
        data: stores,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "error while fetching stores",
      });
    }
  },
  createStore: async (req, res, next) => {
    try {
      const requiredFields = ["name", "country", "city", "subCity"];
      for (const field of requiredFields) {
        if (!req.body[field]) {
          return res.status(403).json({
            success: false,
            message: `${field} is required`,
          });
        }
      }
      const data = storeSchem.registor.parse(req.body);
      const isstoreExist = await prisma.store.findFirst({
        where: {
          name: data.name,
        },
      });

      if (isstoreExist) {
        return res.status(403).json({
          success: false,
          message: "this store is already registered",
        });
      }
      // check id the address exist
      let addressId;
      const isAdressExist = await prisma.address.findFirst({
        where: {
          country: data.country,
          city: data.city,
          subCity: data.subCity,
        },
      });
      if (isAdressExist) {
        addressId = isAdressExist.id;
      } else {
        const newAddress = await prisma.address.create({
          data: {
            country: data.country,
            city: data.city,
            subCity: data.subCity,
          },
        });
        addressId = newAddress.id;
      }

      const newStore = await prisma.store.create({
        data: {
          name: data.name,
          addressId: +addressId,
        },
      });
      return res.status(200).json({
        success: true,
        message: "store created successfully",
        data: newStore,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: `error : ${error}`,
      });
    }
  },
  updateStore: async (req, res, next) => {
    try {
      const storeId = parseInt(req.params.id, 10);
      if (isNaN(storeId)) {
        return res.status(403).json({
          success: false,
          message: "invalid store id",
        });
      }
      const data = storeSchem.update.parse(req.body);

      const isstoreExist = await prisma.store.findFirst({
        where: {
          id: +storeId,
        },
      });

      if (!isstoreExist) {
        return res.status(403).json({
          success: false,
          message: "this store is not exist",
        });
      }

      // is there name allready taken
      if (data.name != null) {
        const isstoreExist2 = await prisma.store.findFirst({
          where: {
            name: data.name,
          },
        });

        if (isstoreExist2) {
          return res.status(403).json({
            success: false,
            message: "this store name already registered",
          });
        }
      }

      // check id the address exist
      let addressId;
      const isAdressExist = await prisma.address.findFirst({
        where: {
          country: data.country,
          city: data.city,
          subCity: data.subCity,
        },
      });
      if (isAdressExist) {
        addressId = isAdressExist.id;
      } else {
        const newAddress = await prisma.address.create({
          data: {
            country: data.country,
            city: data.city,
            subCity: data.subCity,
          },
        });
        addressId = newAddress.id;
      }

      const updatedstore = await prisma.store.update({
        where: {
          id: +storeId,
        },
        data: {
          addressId: +addressId,
          name: data.name != null ? data.name : isstoreExist.name,
        },
      });
      return res.status(200).json({
        success: true,
        message: "store updated successfully",
        data: updatedstore,
      });
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({
          success: false,
          message: "store not found",
        });
      }

      console.error(error);
      return res.status(500).json({
        success: false,
        message: "error while updating store",
      });
    }
  },
  deleteStore: async (req, res, next) => {
    try {
      const storeId = parseInt(req.params.id, 10);
      if (isNaN(storeId)) {
        return res.status(403).json({
          success: false,
          message: "invalid store id",
        });
      }
      const isstoreExist = await prisma.store.findFirst({
        where: {
          id: +storeId,
        },
      });

      if (!isstoreExist) {
        return res.status(403).json({
          success: false,
          message: "this store is not exist",
        });
      }
      const deletestore = await prisma.store.delete({
        where: {
          id: +storeId,
        },
      });
      return res.status(200).json({
        success: true,
        message: "store deleted successfully",
        data: deletestore,
      });
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({
          success: false,
          message: "store not found",
        });
      }

      console.error(error);
      return res.status(500).json({
        success: false,
        message: "error while deleting store",
      });
    }
  },
};

export default storeController;
