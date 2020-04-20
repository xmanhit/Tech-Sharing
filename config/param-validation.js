module.exports = {
  // POST /api/users
  createUser: {
    properties: {
      body: {
        type: "object",
        required: ["username", "password", "mobileNumber"],
        username: {
          type: "string",
        },
        password: {
          type: "string",
        },
        mobileNumber: {
          type: "string",
          pattern: "/^[0-9][0-9]{9}$/",
        },
      },
    },
  },

  // UPDATE /api/users/:userId
  updateUser: {
    properties: {
      body: {
        type: "object",
        required: ["username", "password", "mobileNumber"],
        username: {
          type: "string",
        },
        password: {
          type: "string",
        },
        mobileNumber: {
          type: "string",
          pattern: "/^[0-9][0-9]{9}$/",
        },
      },
      params: {
        type: "object",
        required: ["userId"],
        userId: {
          type: "string",
          format: "uuid",
        },
      },
    },
  },

  // POST /api/auth/login
  login: {
    properties: {
      body: {
        type: "object",
        required: ["username", "password"],
        username: {
          type: "string",
        },
        password: {
          type: "string",
        },
      },
    },
  },
};
