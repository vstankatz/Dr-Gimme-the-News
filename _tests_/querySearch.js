import {QuerySearch} from './../src/doctor.js';

describe('QuerySearch', () => {


  test('should take in inputs into the fetch link', () => {
    let search = new QuerySearch("John", "dental", "toothache", "male", "full-name-asc");
    search.findDoctor();
  })
})
