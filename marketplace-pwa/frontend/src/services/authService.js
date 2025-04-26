import api from "./api";

const authService = {
  login: async (username, password) => {
    const response = await api.post("login", { username, password });
    if (response.token) {
      // localStorage.setItem('user', JSON.stringify(response.user)); //  Don't store the whole user object here.  Just the token.
      localStorage.setItem("token", response.token);
    }
    return response;
  },

  signup: async (username, email, password) => {
    const response = await api.post("register", { username, email, password });
    if (response.token) {
      localStorage.setItem("token", response.token);
    }
    return response;
  },

  logout: () => {
    localStorage.removeItem("token");
    // localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Call the /decode endpoint and token will be passed as JSON data 2nd body parameter and not as 3rd token parameter in deed because of security reasons given by Copilot
        const response = await api.post("decode", { token });
        if (response && response.user) {
          return response.user; // Return the user object from the backend
        } else {
          return null; // Or handle the error as appropriate
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        return null; // Handle the error
      }
    }
    return null;
  },

  getToken: () => {
    return localStorage.getItem("token");
  },
};

export default authService;
