const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table')
const db = require('./db/connection')

const promptUser = () => {
    console.log(
    `    +-+-+-+-+-+-+-+ +-+-+-+
    |W|e|l|c|o|m|e| |t|o|:|
    +-+-+-+-+-+-+-+ +-+-+-+
    8888888888 888b     d888 8888888b.  888      .d88888b. Y88b   d88P 8888888888 8888888888    
    888        8888b   d8888 888   Y88b 888     d88P" "Y88b Y88b d88P  888        888           
    888        88888b.d88888 888    888 888     888     888  Y88o88P   888        888           
    8888888    888Y88888P888 888   d88P 888     888     888   Y888P    8888888    8888888       
    888        888 Y888P 888 8888888P"  888     888     888    888     888        888           
    888        888  Y8P  888 888        888     888     888    888     888        888           
    888        888   "   888 888        888     Y88b. .d88P    888     888        888           
    8888888888 888       888 888        88888888 "Y88888P"     888     8888888888 8888888888    
                                                                                                
                                                                                                
                                                                                                
         88888888888 8888888b.         d8888  .d8888b.  888    d8P  8888888888 8888888b.        
             888     888   Y88b       d88888 d88P  Y88b 888   d8P   888        888   Y88b       
             888     888    888      d88P888 888    888 888  d8P    888        888    888       
             888     888   d88P     d88P 888 888        888d88K     8888888    888   d88P       
             888     8888888P"     d88P  888 888        8888888b    888        8888888P"        
    888888   888     888 T88b     d88P   888 888    888 888  Y88b   888        888 T88b  888888 
             888     888  T88b   d8888888888 Y88b  d88P 888   Y88b  888        888  T88b        
             888     888   T88b d88P     888  "Y8888P"  888    Y88b 8888888888 888   T88b   `)
    inquirer.prompt([
        {
        type:
            'list',
        name:
            'choices',
        message:
            'What would you like to do?',
        choices: [
            'View All Roles',
            'View All Departments',
            'View All Employees',
            'Add Employee',
            'Add Department',
            'Add Role',
            'Update Employee Role',
            ],
        }
    ]).then((answers) => {
        const { choices } = answers;
        if (choices === "View All Roles") {
            viewAllRoles()
        };
        if (choices === "View All Departments") {
            viewAllDepartments()
        };
        if (choices === "View All Employees") {
            viewAllEmployees()
        };
        if (choices === "Add Employee") {
            addEmployee()
        };
        if (choices === "Add Department") {
            addDepartment()
        };
        if (choices === "Add Role") {
            addRole()
        };
        if (choices === "Update Employee Role") {
            updateEmployeeRole()
        }
    })
};

const viewAllRoles = () => {
    console.log("Roles coming soon")
};

const viewAllDepartments = () => {
    console.log("Departments coming soon")
};


const viewAllEmployees = () => {
    console.log("All Employees");
    let sql = `SELECT employee.id AS 'Employee ID', 
    employee.first_name AS 'First Name', 
    employee.last_name AS 'Last Name', 
    role.title AS 'Job Title', 
    department.name AS 'Department', 
    role.salary AS Salary
    FROM employee, role, department 
    WHERE department.id = role.department_id 
    AND role.id = employee.role_id
    ORDER BY employee.id ASC
    `;

    db.query(sql, (err, res) => {
        if (err) throw error;
        console.table('ALL EMPLOYEES', res);
        console.log(`\n`)
    });
    promptUser();
};

const addEmployee = () => {
    console.log("Add employee coming soon")
};

const addDepartment = () => {
    console.log("Add Dept coming soon")
};

const addRole = () => {
    console.log("Add role coming soon")
};

const updateEmployeeRole = () => {
    console.log("update Employee coming soon")
};

promptUser()