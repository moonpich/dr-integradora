import { API_PATH } from "../../config";
export const RegisterService = async ({ username, email, password }) => {
  try {
    const requestRegister = await fetch(`${API_PATH}/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    if (requestRegister.status !== 201) {
      throw new Error(`Response status: ${requestRegister.status}`);
    }
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

export const LoginService = async ({ emailUser, password }) => {
  try {
    const login = await fetch(`${API_PATH}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailUser,
        password,
      }),
      credentials: "include",
    });
    if (!login.ok) {
      throw new Error(`Response status: ${login.status}`);
    }
    const response = await login.json();

    return response;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

export const CloseSession = async () => {
  try {
    const logOut = await fetch(`${API_PATH}/auth/logout`, {
      credentials: "include",
      method: "POST",
    });

    if (logOut.status !== 200) {
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
  }
};
