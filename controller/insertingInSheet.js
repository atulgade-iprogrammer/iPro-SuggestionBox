
const { GoogleSpreadsheet } = require("google-spreadsheet");
const credentials = require("../testproject-388207-981ad0337879.json");
const request = require("postman-request");
const doc = new GoogleSpreadsheet(
  "1Sukko14MjIQaywtZbBAOD5Ze1v_lDHpHVrDPC8MdPIY"
);

insertData = async (req, res) => {
  try {
    console.log("Body", req.body);
    await doc.useServiceAccountAuth(credentials);

    await doc.loadInfo(); // loads document properties and worksheets

    await doc.updateProperties({ title: "Test Insertion" });

    const sheet = doc.sheetsByIndex[0];

    const headers = ["Date", "Feedback", "City"];
    await sheet.setHeaderRow(headers);

    const feedback = req.body.feedback;
    const date = req.body.date;

    const location = req.cookies.location;
    console.log("Cookie", req.cookies);
    if (location) {
      const [latitude, longitude] = location.split(",");
      console.log(
        `User's location: latitude ${latitude}, longitude ${longitude}`
      );
      const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=2&appid=a4c1960b910777a958021d9d44238da1`;

      const city = await new Promise((resolve, reject) => {
        request(url, { json: true }, (error, response, body) => {
          if (error) {
            console.error("Error:", error);
            reject(error);
          } else {
            // Extract the city name from the response body
            const cityName = body[0]?.name;
            console.log(cityName); // Output: City name (if available) or undefined
            resolve(cityName);
          }
        });
      });

      const insertion = { Date: date, Feedback: feedback, City: city };

      await sheet.addRow(insertion);
    }
    res.status(200).send({ message: "Success!" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Something Went Wrong!" });
  }
};

module.exports = insertData;
