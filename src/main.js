import {QuerySearch} from './doctor.js';
import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';


// function displayDoctors(doctorArrayItem) {
//   let docList = $("ul#docList");
//   let htmlForDocInfo = "";
//
//   doctorArrayItem.forEach(function(doctor) {
//     htmlForDocInfo += '<li>' + doctor.name + doctor.city + doctor.spec + doctor.address + doctor.phone + doctor.website + "</li><hr>"
//   })
// };

function translateInput(input) {
  const getComma = input.replace(",", "%2C")
  const splitInput = getComma.split(" ");
  const newOutput = splitInput.join("%20");
  return newOutput;
};



$(document).ready(function() {
  $("form#searchDoctor").submit(function(event) {
    event.preventDefault();
    let inputName = $('input#docName').val();
    console.log(inputName);
    let inputSpec = $('input#docSpec').val();
    let inputHelp = $('input#docHelp').val();
    let newSex = $('input:radio[name=gender]:checked').val();
    let newSort = $('select#docSort').val();
    let docList = $("ul#docList");
    let htmlForDocInfo = "";

    (async function () {
      let newName = translateInput(inputName);
      let newSpec = translateInput(inputSpec);
      let newHelp = translateInput(inputHelp);
              console.log(`${process.env.API_KEY}`);
      const search = new QuerySearch(newName, newSpec, newHelp, newSex, newSort);
      let response = await search.findDoctor(newName, newSpec, newHelp, newSex, newSort);

      response.data.forEach(function(doctor) {
        if (doctor.profile.middle_name === undefined) {
          let middleName = "";
        } else {
          let middleName = doctor.profile.middle_name;
        }
        htmlForDocInfo += '<hr><li>' + "Doctor " + doctor.profile.first_name + " " + middleName + " " + doctor.profile.last_name + ", " + doctor.profile.title + "."
        docList.html(htmlForDocInfo);

        doctor.practices.forEach(function(location) {

          console.log(location.phones[0].number);
          htmlForDocInfo += "<br>Address: " + location.visit_address.street + " " + location.visit_address.city + ", " + location.visit_address.state + " " + location.visit_address.zip +  "<br>Currently accepting new patients: " + location.accepts_new_patients + "<br>" + location.phones[0].type + " number: " + location.phones[0].number + ".<br>"
        })

        doctor.specialties.forEach(function(specialty) {
          console.log(specialty.name);
          htmlForDocInfo += "<br>Specialty: " +  specialty.name
        })

        htmlForDocInfo += "</li>"

      });

      // displayDoctors(search);
    })();






    $('#ifSuccess').text();
  })
})
