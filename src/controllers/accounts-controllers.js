 import { db } from "../models/db.js";
 import { UserSpec, UserUpdateSpec, UserCredentialsSpec } from "../models/db/joi-schemas.js";


export const accountsController = {
  index: {
    auth: false,
    handler: async function (request, h) {
      const placemarks = await db.placemarkStore.getAllPlacemarks();
      const viewData = {
        placemarks: placemarks,
        title: "Welcome to Placemark",
      };
      return h.view("main", viewData);
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up" });
    },
  },
  signup: {
    auth: false,
    validate: {    
      payload: UserSpec,
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;
      user.scope = "user";
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login" });
    },
  },
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },
  logout: {
    auth: false,
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },
  showAccount: {
    // auth: false,
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const userDetails = await db.userStore.getUserByEmail(loggedInUser.email);
      const viewData = {
        title: "Account",
        user: userDetails,
      };
      return h.view("account-view", viewData);
    },
  },
  update: {
    auth: false,
     validate: {    
      payload: UserUpdateSpec,
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },  
    handler: async function (request, h) {
      const user = request.payload;
      const userDetails = await db.userStore.getUserByEmail(user.email);
      const updatedDetails = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password
      }
      await db.userStore.updateUser(userDetails._id, updatedDetails);
      return h.redirect("/dashboard");
    },
  },

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { valid: false };
    }
    return { valid: true, credentials: user };
    },
};