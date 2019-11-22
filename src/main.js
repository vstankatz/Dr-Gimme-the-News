import {QuerySearch} from './doctor.js';
import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function translateInput(input) {
  const getComma = input.replace(",", "%2C")
  console.log(input);
  const splitInput = getComma.split(" ");
  const newOutput = splitInput.join("%20");
  return newOutput;
}


$(document).ready(function() {
  $("form#searchDoctor").submit(function(event) {
    event.preventDefault();
    let inputName = $('input#docName').val();
    console.log(inputName);
    let inputSpec = $('input#docSpec').val();
    let inputHelp = $('input#docHelp').val();
    let inputSex = $('input#docSex').val();
    let inputSort = $('input#docSort').val();

    (async function () {
      let newName = translateInput(inputName);
      let newSpec = translateInput(inputSpec);
      let newHelp = translateInput(inputHelp);

    })();


    const search = new QuerySearch();


    $('#ifSuccess').text();
  })
})
