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
    let sql = `SELECT role.id AS 'Role ID',
    role.title AS 'Job Title',
    department.name AS 'Department',
    role.salary AS 'Salary'
    FROM role, department
    WHERE role.department_id = department.id
    `;
    
    db.query(sql, (err, res) => {
        if (err) throw error;
        console.table('ALL ROLES', res);
        console.log(`\n`)
    });
    promptUser();
};

const viewAllDepartments = () => {
    let sql = `SELECT department.id AS 'Dept. ID',
    department.name AS 'Department'
    FROM department
    `;
    
    db.query(sql, (err, res) => {
        if (err) throw error;
        console.table('ALL DEPARTMENTS', res);
        console.log(`\n`)
    });
    promptUser();
};


const viewAllEmployees = () => {
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
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "Please enter the Employee's first name",
            validate: firstNameInput => {
                if (firstNameInput) {
                        return true;
                    } else {
                        console.log("Please enter a first name!");
                        return false;
                    }
                }
        },
        {
            type: 'input',
            name: 'lastName',
            message: "Please enter the Employee's last name",
            validate: firstNameInput => {
                if (firstNameInput) {
                        return true;
                    } else {
                        console.log("Please enter a last name!");
                        return false;
                    }
                } 
        },
        {
            type: 'list',
            name: 'role',
            message: "Choose a role",
            choices: [
                'Sales Lead',
                'Sales Person',
                'Software Engineer',
                'Lead Engineer',
                'Lawyer',
                'Legal Team Lead',
                'Accountant'
            ]
        },
        {
            type: 'list',
            name: 'manager',
            message: "Choose a manager ID",
            choices: [
                '1',
                '2',
                '3',
                '4',
                '5',
                'No Manager'
            ]
        }
    ]).then((answers) => {
        const employeeInfo = answers;
        let newEmployee = [];
        if (employeeInfo.manager === '1') {
            newEmployee.push('1')
        };
        if (employeeInfo.manager === '2') {
            newEmployee.push('2')
        };
        if (employeeInfo.manager === '3') {
            newEmployee.push('3')
        };
        if (employeeInfo.manager === '4') {
            newEmployee.push('4')
        };
        if (employeeInfo.manager === '5') {
            newEmployee.push('5')
        };
        if (employeeInfo.manager === "No Manager") {
            newEmployee.push('NULL')
        };
        if (employeeInfo.role === "Sales Lead") {
            newEmployee.push('1')
        };
        if (employeeInfo.role === "Sales Person") {
            newEmployee.push('2')
        };
        if (employeeInfo.role === "Software Engineer") {
            newEmployee.push('3')
        };
        if (employeeInfo.role === "Lead Engineer") {
            newEmployee.push('4')
        };
        if (employeeInfo.role === "Lawyer") {
            newEmployee.push('5')
        };
        if (employeeInfo.role === "Legal Team Lead") {
            newEmployee.push('6')
        };
        if (employeeInfo.role === "Accountant") {
            newEmployee.push('7')
        }
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES
        ("${employeeInfo.firstName}", "${employeeInfo.lastName}", ${newEmployee[1]}, ${newEmployee[0]});`, (err, res) => {
        if (err) throw error;
        console.table('EMPLOYEE ADDED', res);
        console.log(`\n`)
    });
})
    promptUser();    
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