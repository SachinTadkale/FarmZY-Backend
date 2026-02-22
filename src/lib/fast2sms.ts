import axios from "axios";

export const sendSMS = async (phone: string, message: string) => {
  try {
    await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q",
        message,
        language: "english",
        numbers: phone,
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY!,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("SMS sending failed:", error);
  }
};