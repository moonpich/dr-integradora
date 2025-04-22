import { API_PATH } from "../../config";

export const SaveTodo = async ({ formData }) => {
  try {
    const addRequest = await fetch(`${API_PATH}/todos`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (addRequest.status !== 201) {
      return false;
    }
    const response = await addRequest.json();
    console.log({ response });
    return true;
  } catch (error) {
    throw new Error(`Request Error ${error}`);
  }
};

export const UpdateTodo = async ({ name, status, id }) => {
  try {
    const addRequest = await fetch(`${API_PATH}/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name,
        status,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (addRequest.status !== 200) {
      return false;
    }
    const response = await addRequest.json();
    console.log({ response });
    return true;
  } catch (error) {
    throw new Error(`Request Error ${error}`);
  }
};

export const FindAll = async () => {
  try {
    const findAllRequest = await fetch(`${API_PATH}/todos`, {
      method: "GET",
      credentials: "include",
    });
    if (!findAllRequest.ok) {
      return [];
    }
    const jsonResponse = await findAllRequest.json();

    return jsonResponse.result;
  } catch (error) {
    throw new Error(`Request Error ${error}`);
  }
};
