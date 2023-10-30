export const requestToLoginUser = async ({
  username,
  email,
  password,
}: {
  username?: string;
  email?: string;
  password: string;
}) => {
  try {
    const res = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    return json;
  } catch (error) {
    throw new Error("error unable  login!");
  }
};
