import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const whatsappURL = process.env.WHATSAPP_URL;

export const sendNotification = async (number, message) => {
  try {
    const data = {
      number,
      message,
    };

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: whatsappURL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data,
    };

    const response = await axios.request(config);
    console.log("Notification Sent:", response.data);
    return response.data;
  } catch (error) {
    console.error("Notification Error:", error.message);
    return null;
  }
};
