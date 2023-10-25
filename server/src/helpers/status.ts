const successMessage = { status: "success", message: "" };
const errorMessage = { status: "error", error: "" };
const statusCode = {
  success: 200,
  error: 500,
  notfound: 404,
  unauthorized: 401,
  conflict: 409,
  created: 201,
  bad: 400,
  no_content: 204,
};

export { errorMessage, successMessage, statusCode };
