/**
 * Name: Yash Patel
 * Email: Yash_Patel5@student.uml.edu
 * File: generate_table.js
 * 
 * Referred to this given resources and the following website for learning
 * about the jQuery Validator Plugin:
 *          https://jqueryvalidation.org/files/demo/
 * 
 */

// function used for adding a row to the table
function add_row(row_content) {
    return '<tr>' + row_content + '</tr>';
}

// function used for adding data to a cell of a row
function add_cell(cell_content) {
    return '<td>' + cell_content + '</td>';
}

// function used for adding the table headings
function add_heading(heading) {
    return '<th>' + heading + '</th>';
}

// function used for generating multiplication table, which is triggered when the generate button is clicked
function generate_multiplication_table() {

    // reading the values from the form, and converting them to numbers as the input values are text by default
    var min_x = Number(document.getElementById('min_x').value);
    var max_x = Number(document.getElementById('max_x').value);
    var min_y = Number(document.getElementById('min_y').value);
    var max_y = Number(document.getElementById('max_y').value);

    console.log(min_x);
    console.log(max_x);
    console.log(min_y);
    console.log(max_y);

    var mult_table = '<table>';

    // writing the column heading
    var headings = add_heading('');
    for (var x = min_x; x <= max_x; x++) {
        headings += add_heading(x);
    }
    mult_table += add_row(headings);

    // writing the rows
    for (var i = min_y; i <= max_y; i++) {
        row_content = add_cell(i);
        for (var j = min_x; j <= max_x; j++) {
            row_content += add_cell(i * j);
        }
        mult_table += add_row(row_content);
    }
    mult_table += '</table>';

    document.getElementById('multiplication_table').innerHTML = mult_table;
}

// following two functions are the custom rules for verifying that the  
// mins are smaller than the maxs and the maxs are greater than the mins
$.validator.addMethod("lessthan", function(value, element, param) {
    return parseFloat(value) < parseFloat($(param).val());
});
$.validator.addMethod("greaterthan", function(value, element, param) {
    return parseFloat(value) > parseFloat($(param).val());
});

$(document).ready(function () {
    // using validator to valid the inputs
    $("#numbers").validate({
        // rules specify that each input is required, should be a number between -50 and 50,
        // and min_x and min_y should always be less than max_x and max_y respectively, and
        // max_x and max_y should always be greater than min_x and min_y respectively.
        rules: {
            min_x: {
                required: true,
                number: true,
                range: [-50, 50],
                lessthan: "#max_x"
            },
            max_x: {
                required: true,
                number: true,
                range: [-50, 50],
                greaterthan: "#min_x"
            },
            min_y: {
                required: true,
                number: true,
                range: [-50, 50],
                lessthan: "#max_y"
            },
            max_y: {
                required: true,
                number: true,
                range: [-50, 50],
                greaterthan: "#min_y"
            }
        },
        messages: {
            min_x: {
                required: "This is required field. Please enter a number between -50 and 50.",
                number: "This field should be a number. Please enter a number between -50 and 50.",
                range: "Minimum Column Value is out of range. Please enter a number between -50 and 50.",
                lessthan: "Maximum Column Value is less than Minimum Column Value, please enter valid numbers."
            },
            max_x: {
                required: "This is required field. Please enter a number between -50 and 50.",
                number: "This field should be a number. Please enter a number between -50 and 50.",
                range: "Maximum Column Value is out of range. Please enter a number between -50 and 50.",
                greaterthan: "Minimum Column Value is greater than Maximum Column Value, please enter valid numbers."
            },
            min_y: {
                required: "This is required field. Please enter a number between -50 and 50.",
                number: "This field should be a number. Please enter a number between -50 and 50.",
                range: "Minimum Row Value is out of range. Please enter a number between -50 and 50.",
                lessthan: "Maximum Row Value is less than Minimum Row Value, please enter valid numbers."
            },
            max_y: {
                required: "This is required field. Please enter a number between -50 and 50.",
                number: "This field should be a number. Please enter a number between -50 and 50.",
                range: "Maximum Row Value is out of range. Please enter a number between -50 and 50.",
                greaterthan: "Minimum Row Value is greater than Maximum Row Value, please enter valid numbers."
            }
        },
        submitHandler: function () { // this is called when numbers are valid and the form is submitted.
            generate_multiplication_table();
        }
    });
});
