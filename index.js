const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt([
        {
        type:
            'list',
        name:
            'directory',
        message:
            'What would you like to do?',
        choices: [
            'View All Employees',
            'View All Employees by Department',
            'View All Employees by Management',
            'Add Employee',
            'Remove Employee',
            'Update Employee Role',
            'Update Employee Manager',
            'View All Roles'
             ],

    ])
};



promptUser();