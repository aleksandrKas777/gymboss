const { GoogleSpreadsheet } = require('google-spreadsheet');


export const handler = async () => {
  const doc = new GoogleSpreadsheet(process.env.REACT_APP_SHEET_ID);
  
  await doc.useServiceAccountAuth({
    client_email: process.env.REACT_APP_CLIENT_EMAIL,
    private_key: process.env.REACT_APP_PRIVATE_KEY.replace(/\\n/gm, '\n')
  });
  await doc.getInfo()
  return doc
}



