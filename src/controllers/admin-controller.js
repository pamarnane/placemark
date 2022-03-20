import * as dotenv from "dotenv"
import mongoose from "mongoose";
import { db } from "../models/db.js";
import { UserSpec, UserCredentialsSpec } from "../models/db/joi-schemas.js";

dotenv.config();

export const adminController = {
    index: { 
      handler: async function (request, h) {
        const loggedInUser = request.auth.credentials;
        const adminID = mongoose.Types.ObjectId(process.env.admin_id);
        if (loggedInUser._id.equals(adminID)) { 
            const users = await db.userStore.getAllUsers();
            const categories = await db.placemarkStore.getAllCategories();
            const viewData = {
            title: "PlaceMark Admin Dashboard",
            users: users,
            categories: categories,
            };
            return h.view("admin-dashboard", viewData);
            }
        return h.redirect("/dashboard");
      },
    },

    deleteUser: {
        handler: async function (request, h) {
          const loggedInUser = request.auth.credentials;
          const adminID = mongoose.Types.ObjectId(process.env.admin_id);
          if (loggedInUser._id.equals(adminID)) {
          await db.userStore.deleteUserById(user._id);
          return h.view("admin-dashboard", viewData);
            }
        return h.redirect("/dashboard");
        },
      },
      
      addCategory: {
        handler: async function (request, h) {
        const loggedInUser = request.auth.credentials;
        const adminID = mongoose.Types.ObjectId(process.env.admin_id);
          if (loggedInUser._id.equals(adminID)) {
            const newCategory = {
              category: request.payload.category,
            };
            await db.placemarkStore.addCategory(newCategory);
            return h.view("admin-dashboard", viewData);
          }
          return h.redirect("/dashboard");
        },
      },
      
      deleteCategory: {
        handler: async function (request, h) {
          const loggedInUser = request.auth.credentials;
          const adminID = mongoose.Types.ObjectId(process.env.admin_id);
          if (loggedInUser._id.equals(adminID)) {
            const categoryId = request.params.id;
            await db.placemarkStore.deleteCategoryById(categoryId);
            return h.view("admin-dashboard", viewData);
          }
        return h.redirect("/dashboard");
        },
      },
};
