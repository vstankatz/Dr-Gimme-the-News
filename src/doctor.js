export class QuerySearch {
  constructor(docName, docSpec, docHelp, docSex, docSort) {
    this.docName = docName;
    this.docSpec = docSpec;
    this.docHelp = docHelp;
    this.docSex = docSex;
    this.docSort = docSort;

  }

  async findDoctor(docName, docHelp, docSpec, docSex, docSort) {
    try {
      let response = await fetch (`https://api.betterdoctor.com/2016-03-01/doctors?name=${docName}%20K&query=${docHelp}&specialty_uid=${docSpec}&location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&gender=${docSex}&sort=${docSort}&skip=0&limit=20&user_key=${process.env.API_KEY}`);
      let jsonifiedResponse = await response.json();
      return jsonifiedResponse;
    } catch(error) {
      console.log("There was an error handling your request: " + error.message);
    }
  }
}
