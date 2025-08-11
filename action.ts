'use server'

import axios from "axios";

export const action = async (formData: FormData) => {
  const file = formData.get("file") as File;

  if (!file) {
    return { error: "No file provided" };
  }

  const data = new FormData();
  data.append("file", file);

  try {
    const response = await axios.post(`${process.env.API_URL}/summarize`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'blob'
    });

    return response.data

  } catch (error) {
    console.error("An error occurred:", error);
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { error: `An error occurred while summarizing the file: ${errorMessage}` };
  }
}