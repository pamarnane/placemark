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
        const activities = await db.placemarkStore.getAllActivities();
        const viewData = {
        title: "PlaceMark Admin Dashboard",
        users: users,
        categories: categories,
        activities: activities,
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
      addActivity: {
        auth:{
          strategy: "session",
          scope: "admin"
        },
        handler: async function (request, h) {
        const newActivity = {
          activity: request.payload.activity,
          };
          await db.placemarkStore.addActivity(newActivity);
          return h.redirect("/admin")
          },
      },
      
      deleteActivity: {
        auth:{
          strategy: "session",
          scope: "admin"
        },
        handler: async function (request, h) {
          const activityId = request.params.id;
          await db.placemarkStore.deleteActivityById(activityId);
          return h.redirect("/admin")
        },
      },


      
};
