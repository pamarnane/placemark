import * as dotenv from "dotenv"
import mongoose from "mongoose";
import { db } from "../models/db.js";
import { UserSpec, UserCredentialsSpec } from "../models/db/joi-schemas.js";

dotenv.config();

export const adminController = {
    index: {
      auth:{
        strategy: "session",
        scope: "admin"
      },
      handler: async function (request, h) {
        const loggedInUser = request.auth.credentials;
        const users = await db.userStore.getAllUsers();
        const categories = await db.placemarkStore.getAllCategories();
        const viewData = {
        title: "PlaceMark Admin Dashboard",
        users: users,
        categories: categories,
        }
        return h.view("admin-dashboard", viewData);
      },
    },

    deleteUser: {
      auth:{
        strategy: "session",
        scope: "admin"
      },
        handler: async function (request, h) {
          const userId = request.params.id; 
          await db.userStore.deleteUserById(userId);
          return h.redirect("/admin")       
        },
        
      },
      
      addCategory: {
        auth:{
          strategy: "session",
          scope: "admin"
        },
        handler: async function (request, h) {
        const newCategory = {
          category: request.payload.category,
          };
          await db.placemarkStore.addCategory(newCategory);
          return h.redirect("/admin")
          },
      },
      
      deleteCategory: {
        auth:{
          strategy: "session",
          scope: "admin"
        },
        handler: async function (request, h) {
          const categoryId = request.params.id;
          await db.placemarkStore.deleteCategoryById(categoryId);
          return h.redirect("/admin")
        },
      },
};
