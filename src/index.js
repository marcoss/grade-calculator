// require('bulma/css/bulma.min.css');
require('bootstrap/dist/css/bootstrap.min.css');
require('./css/main.css');

const headerTemplate = require('./templates/header.handlebars');
const template = require('./templates/app.handlebars');

// Instance vars
let gradeItems;
let grade;
let totalWeight;

/**
 * Initialization on document load.
 */
document.addEventListener('DOMContentLoaded', function () {
    gradeItems = [{}, {}, {}, {}];
    grade = 0.00;
    totalWeight = 0;

    render(true);
});

/**
 * Add an empty row to data.
 */
const addRow = function () {
    gradeItems.push({});
    render(true);
};

/**
 * Delete an existing row from data.
 * @param {*} e event target. 
 */
const deleteRow = function (e) {
    const index = e.target.attributes.getNamedItem('data-index').value;
    gradeItems.splice(index, 1);
    render(true);
}

/**
 * Reset all rows.
 */
const resetRows = function () {
    gradeItems = [{}, {}, {}, {}];
    grade = 0.0;
    render(true);
};

/**
 * Input for rows has changed.
 * @param {*} e event target.
 */
const inputChanged = function (e) {
    const index = e.target.attributes.getNamedItem('data-index').value;
    const attribute = e.target.attributes.getNamedItem('data-attribute').value;

    // Re-render only on data that changes grade
    switch (attribute) {
        case 'title':
            gradeItems[index].title = e.target.value;
            break;
        case 'grade':
            gradeItems[index].grade = e.target.value;
            render();
            break;
        case 'weight':
            gradeItems[index].weight = e.target.value;
            render();
            break;
    }
}

/**
 * Bind all button and input elements in DOM.
 */
const bindElements = function () {
    var addRowButton = document.getElementById('add-row');
    var resetButton = document.getElementById('reset-all');
    addRowButton.onclick = addRow;
    resetButton.onclick = resetRows;

    const deleteRows = document.querySelectorAll(".delete-row");
    for (i = 0; i < deleteRows.length; i++) {
        deleteRows[i].onclick = deleteRow;
    }

    // User inputs
    const inputs = document.querySelectorAll(".user-input");
    for (i = 0; i < inputs.length; i++) {
        inputs[i].onkeyup = inputChanged;
    }
};

/**
 * Calculate a user's grade.
 */
const calculateGrade = function () {
    let temp = 0.0;
    let n = 0;

    let weights = 0;

    for (i = 0; i < gradeItems.length; i++) {
        if (gradeItems[i].grade) {
            // Set to default weight
            if (!gradeItems[i].weight) {
                gradeItems[i].weight = 100;
            }
    
            weights += parseFloat(gradeItems[i].weight);
            temp += parseInt(gradeItems[i].grade) * (parseFloat(gradeItems[i].weight)/100.0);
            n++;
        }
    }

    // Set total weight
    totalWeight = weights;

    if (n > 0) {
        grade = (temp).toFixed(2);
    } else {
        grade = 0.0;
    }
}

/**
 * Render the template view.
 * @param {*} renderRows whether to re-render all rows (input loses focus).
 */
const render = function (renderRows) {
    // Render all rows
    if (renderRows) {
        _renderApp();
        bindElements();
    }

    // Render only grade header
    _renderHeader();
};

/**
 * Render only the header template view (grade display).
 */
const _renderHeader = function () {
    calculateGrade();

    const header = document.getElementById('header');
    header.innerHTML = headerTemplate({
        title: 'grade calculator',
        grade: grade,
        weights: totalWeight,
        gradeColor: getGradeColor(grade),
    });
};

/**
 * Render only the data rows (grade inputs).
 */
const _renderApp = function () {
    const app = document.getElementById('app');
    app.innerHTML = template({
        items: gradeItems,
    });

    bindElements();
};

/**
 * Utility function to return a bootstrap color from a grade.
 * https://getbootstrap.com/docs/4.0/utilities/colors/
 * @param {*} grade grade scale from 0-100.
 */
const getGradeColor = function (grade) {
    if (grade < 10) {
        return 'secondary';
    } else if (grade < 70) {
        return 'danger';
    } else if (grade < 80) {
        return 'warning';
    } else if (grade < 90) {
        return 'warning';
    } else {
        return 'success';
    }
}
