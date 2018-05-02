// require('bulma/css/bulma.min.css');
require('bootstrap/dist/css/bootstrap.min.css');
require('./css/main.css');

const template = require('./templates/app.handlebars');

// Internal
let grades = [{}, {}, {}, {}];
let grade = 90.00;

// Initialization
document.addEventListener('DOMContentLoaded', function () {
    render();
});

// UI functions
const addRow = function () {
    grades.push({});
    render();
};

const deleteRow = function (e) {
    const index = e.target.attributes.getNamedItem('data-index').value;
    grades.splice(index, 1);
    render();
}
const resetRows = function () {
    grades = [{}, {}, {}, {}];
    render();
};

const bindElements = function () {
    var addRowButton = document.getElementById('add-row');
    var resetButton = document.getElementById('reset-all');
    addRowButton.onclick = addRow;
    resetButton.onclick = resetRows;

    const deleteRows = document.querySelectorAll("#delete-row");
    for (i = 0; i < deleteRows.length; i++) {
        deleteRows[i].onclick = deleteRow;
    }

    // deleteRows.onclick = addRow;
};

const render = function () {
    const app = document.getElementById('app');

    app.innerHTML = template({
        title: 'grade calculator',
        grade: grade,
        gradeColor: getGradeColor(),
        grades: grades,
    });

    bindElements();
};

// Utility functions
const getGradeColor = function () {
    if (grade < 10) {
        return 'secondary';
    } else if (grade < 40) {
        return 'danger';
    } else {
        return 'success';
    }
}
