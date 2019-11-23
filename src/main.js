import {Specialist, QuerySearch} from './doctor.js';
import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';


function translateInput(input) {
  const getComma = input.replace(",", "%2C")
  const splitInput = getComma.split(" ");
  const newOutput = splitInput.join("%20");
  return newOutput;
};



$(document).ready(function() {
  let specQuery = new Specialist();
      $('select#docSpec').change(function() {
        let specList = $("select#specList")
        let htmlForSpecInfo = "";
        specList.empty();
    if($(this).val()==="medical") {
      $(".specList").show();
      (async function () {
      let response = await specQuery.findSpecialty();
      response.data.forEach(function(option) {
        if (option.category === "medical") {
          htmlForSpecInfo += "<option value='" + option.uid + "'>" + option.name + "</option>"
        }
        specList.html(htmlForSpecInfo)
      })
    })()
  } else if ($(this).val()==="dental") {
    $(".specList").show();
    (async function () {
    let response = await specQuery.findSpecialty();
    response.data.forEach(function(option) {
      if (option.category === "dental") {
        htmlForSpecInfo += "<option value='" + option.uid + "'>" + option.name + "</option>"
      }
      specList.html(htmlForSpecInfo)
    })
  })()
} else if ($(this).val()==="vision") {
  $(".specList").show();
  (async function () {
  let response = await specQuery.findSpecialty();
  response.data.forEach(function(option) {
    if (option.category === "vision") {
      htmlForSpecInfo += "<option value='" + option.uid + "'>" + option.name + "</option>"
    }
    specList.html(htmlForSpecInfo)
  })
})()
} else if ($(this).val()==="therapy") {
  $(".specList").show();
  (async function () {
  let response = await specQuery.findSpecialty();
  response.data.forEach(function(option) {
    if (option.category === "therapy") {
      htmlForSpecInfo += "<option value='" + option.uid + "'>" + option.name + "</option>"
    }
    specList.html(htmlForSpecInfo)
  })
})()
} else if ($(this).val()==="services") {
  $(".specList").show();
  (async function () {
  let response = await specQuery.findSpecialty();
  response.data.forEach(function(option) {
    if (option.category === "services") {
      htmlForSpecInfo += "<option value='" + option.uid + "'>" + option.name + "</option>"
    }
    specList.html(htmlForSpecInfo)
  })
})()
} else {
  $(".specList").hide();

  let newSpec = "";
}

})


  $("form#searchDoctor").submit(function(event) {
    event.preventDefault();
    let inputName = $('input#docName').val();
    let inputSpec = $('select#specList').val();
    let inputHelp = $('input#docHelp').val();
    let newSex = $('input:radio[name=gender]:checked').val();
    let newSort = $('select#docSort').val();
    let docList = $("ul#docList");
    let htmlForDocInfo = "";




    (async function () {
      let undefinedVar = /undefined/gi;
      let newName = translateInput(inputName);
      let newHelp = translateInput(inputHelp);
      let newSpec
        if (inputSpec === null) {
         newSpec = "";
        } else {
          newSpec = inputSpec;
        }
      const search = new QuerySearch(newName, newSpec, newHelp, newSex, newSort);
      let response = await search.findDoctor(newName, newSpec, newHelp, newSex, newSort);

      console.log(newSpec);
      console.log(search);
      response.data.forEach(function(doctor) {

        htmlForDocInfo += "<hr> <li> <img class='docPic' src=" +  doctor.profile.image_url + " " + "'></li>" +
        '<li>' + "Doctor " + doctor.profile.first_name + " " + doctor.profile.middle_name + " " + doctor.profile.last_name + ", " + doctor.profile.title + ".</li><br>"


        doctor.practices.forEach(function(location) {

          htmlForDocInfo += "<ul><li>Address: " + location.visit_address.street + " " + location.visit_address.city + ", " + location.visit_address.state + " " + location.visit_address.zip +  "<br>Currently accepting new patients: " + location.accepts_new_patients + "<br>" + location.phones[0].type + " number: " + location.phones[0].number + ".</li></ul><br>"
        })

        doctor.specialties.forEach(function(specialty) {
          htmlForDocInfo += "<li>Specialty: " +  specialty.name
        })

        htmlForDocInfo += "</li>"
        let removeUndefined = htmlForDocInfo.replace(undefinedVar, "")
        docList.html(removeUndefined);

      });


    })();



    $('#ifSuccess').text();
  })
})
