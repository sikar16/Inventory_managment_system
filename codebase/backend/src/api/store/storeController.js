import storeSchem from "./storeScheme.js";
import prisma from "../../config/prisma.js";

const storeController = {
  getSingleStore: async (req, res) => {
    try {
      const storeId = parseInt(req.params.id, 10);
      if (isNaN(storeId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid store ID",
        });
      }
  
      const store = await prisma.store.findFirst({
        where: { id: storeId },
        include: {
          address: true, 
        },
      });
  
      if (!store) {
        return res.status(404).json({
          success: false,
          message: "Store not found",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Store fetched successfully",
        data: store,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: `Server error: ${error.message}`,
      });
    }
  },
  
  

  getAllStores: async (req, res) => {
    try {
      const stores = await prisma.store.findMany({
        include: {
          address: {
            include: {
              // profile: true,
              // suppliers: true,
              // store: true,
            },
          },
        },
      });

      return res.status(200).json({
        success: true,
        message: "All stores fetched successfully",
        data: stores,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: `Server error: ${error.message}`,
      });
    }
  },

  createStore: async (req, res) => {
    try {
      const requiredFields = ["name", "country", "city", "subCity", "wereda"];
      for (const field of requiredFields) {
        if (!req.body[field]) {
          return res.status(400).json({
            success: false,
            message: `${field} is required`,
          });
        }
      }

      const data = storeSchem.registor.parse(req.body);

      const existingStore = await prisma.store.findFirst({
        where: { name: data.name },
      });

      if (existingStore) {
        return res.status(400).json({
          success: false,
          message: "This store is already registered",
        });
      }

      const existingAddress = await prisma.address.findFirst({
        where: {
          country: data.country,
          city: data.city,
          subCity: data.subCity,
          wereda: data.wereda,
        },
      });

      const addressId = existingAddress
        ? existingAddress.id
        : (await prisma.address.create({
            data: {
              country: data.country,
              city: data.city,
              subCity: data.subCity,
              wereda: data.wereda,
            },
          })).id;

      const newStore = await prisma.store.create({
        data: {
          name: data.name,
          addressId: +addressId,
        },
      });

      return res.status(201).json({
        success: true,
        message: "Store created successfully",
        data: newStore,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: `Server error: ${error.message}`,
      });
    }
  },

  updateStore: async (req, res) => {
    try {
      const storeId = parseInt(req.params.id, 10);
      if (isNaN(storeId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid store ID",
        });
      }

      const data = storeSchem.update.parse(req.body);

      const existingStore = await prisma.store.findFirst({
        where: { id: storeId },
      });

      if (!existingStore) {
        return res.status(404).json({
          success: false,
          message: "Store not found",
        });
      }

      if (data.name) {
        const storeWithSameName = await prisma.store.findFirst({
          where: { name: data.name },
        });

        if (storeWithSameName && storeWithSameName.id !== storeId) {
          return res.status(400).json({
            success: false,
            message: "This store name is already registered",
          });
        }
      }

      const addressId = await prisma.address.findFirst({
        where: {
          country: data.country,
          city: data.city,
          subCity: data.subCity,
          wereda: data.wereda,
        },
      })?.id || (await prisma.address.create({
        data: {
          country: data.country,
          city: data.city,
          subCity: data.subCity,
          wereda: data.wereda,
        },
      })).id;

      const updatedStore = await prisma.store.update({
        where: { id: storeId },
        data: {
          name: data.name || existingStore.name,
          addressId,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Store updated successfully",
        data: updatedStore,
      });
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({
          success: false,
          message: "Store not found",
        });
      }

      console.error(error);
      return res.status(500).json({
        success: false,
        message: `Server error: ${error.message}`,
      });
    }
  },

  deleteStore: async (req, res) => {
    try {
      const storeId = parseInt(req.params.id, 10);
      if (isNaN(storeId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid store ID",
        });
      }

      const store = await prisma.store.findFirst({
        where: { id: storeId },
      });

      if (!store) {
        return res.status(404).json({
          success: false,
          message: "Store not found",
        });
      }

      const deletedStore = await prisma.store.delete({
        where: { id: storeId },
      });

      return res.status(200).json({
        success: true,
        message: "Store deleted successfully",
        data: deletedStore,
      });
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({
          success: false,
          message: "Store not found",
        });
      }

      console.error(error);
      return res.status(500).json({
        success: false,
        message: `Server error: ${error.message}`,
      });
    }
  },
};

export default storeController;
