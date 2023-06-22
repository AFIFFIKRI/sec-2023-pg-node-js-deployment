import { log } from "console";
import query from "../../db/index.js";
import axios from "axios";

const downloadUserInformation = async (req, res) => {
  try {
    const templateId = "4d35d60";
    const apiKey = "lCIUvSewSxmF0-h87JAjr";
    const apiUrl = `https://pdfgen.app/api/generate?templateId=${templateId}`;
  
    const requestData = {
      data: {
        id: 1,
        email: "fikri@gmail.com",
        is_admin: false,
        password:
          "abcd1234",
        username: "fikrifikri",
        created_at: "2023-05-31T13:23:30.457Z",
        deleted_at: null,
      },
    };

    const response = await axios.post(apiUrl, requestData, {
      headers: {
        "Content-Type": "application/json",
        api_key: apiKey,
      },
      responseType: "stream",
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=mypdf.pdf");
    console.log(response);
    res.send(response.data);
  } catch (error) {
    console.error("Error generating PDF:", error.message);
    res.status(500).send("Error generating PDF");
  }
};

export default downloadUserInformation;
