const { GoogleSpreadsheet } = require("google-spreadsheet");
const credentials = require("../testproject-388207-981ad0337879.json");

const doc = new GoogleSpreadsheet(
  "1Sukko14MjIQaywtZbBAOD5Ze1v_lDHpHVrDPC8MdPIY"
);

insertData = async (req, res) => {
  try {
    await doc.useServiceAccountAuth(credentials);

    await doc.loadInfo(); // loads document properties and worksheets
 
    await doc.updateProperties({ title: "Test Insertion" });
   
    const sheet = doc.sheetsByIndex[0];
   
    const headers = ["Date", "Feedback"];
    await sheet.setHeaderRow(headers);
   
    const feedback = req.body.feedback;
    const date = req.body.date;
    
    const insertion = { Date: date, Feedback: feedback };

    await sheet.addRow(insertion);
  
    res.status(200).send({ message: "Success!" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Something Went Wrong!" });
  }
};
module.exports = insertData;
