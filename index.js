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
            message: "Choose a role ID",
            choices: [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7'
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
        let sqlNewEmp = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES
            ("${answers.firstName}", "${answers.lastName}", "${answers.role}", "${answers.manager}")`;
            db.query(sqlNewEmp, (err, res) => {
                if (err) throw error;
                console.log('ADDED NEW EMPLOYEE', res);
                console.log(`\n`)
            });
            promptUser();   
        })                
    }

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: "Please enter the new department's name",
            validate: deptNameInput => {
                if (deptNameInput) {
                        return true;
                    } else {
                        console.log("Please enter a department name!");
                        return false;
                    }
                }
        }
    ]).then((answers) => {
        let sqlDept = `INSERT INTO department (name)
        VALUES
            ('${answers.deptName}')`;
        db.query(sqlDept, (err, res) => {
            if (err) throw error;
            console.log('ADDED DEPARTMENT', res);
            console.log(`\n`)
        });
        promptUser();
    })                
}

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: "Please enter the new role's name",
            validate: roleNameInput => {
                if (roleNameInput) {
                        return true;
                    } else {
                        console.log("Please enter a role name!");
                        return false;
                    }
                }
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: "Please enter the new role's salary",
            validate: roleSalaryInput => {
                if (roleSalaryInput) {
                        return true;
                    } else {
                        console.log("Please enter a dollar value!");
                        return false;
                    }
                }
        },
        {
            type: 'input',
            name: 'deptId',
            message: "Please enter the new role's department ID",
            validate: firstNameInput => {
                if (firstNameInput) {
                        return true;
                    } else {
                        console.log("Please enter an ID!");
                        return false;
                    }
                }
        },
    ]).then((answers) => {
        let sqlRole = `INSERT INTO role (title, salary, department_id)
        VALUES
            ('${answers.roleName}', '${answers.roleSalary}', '${answers.deptId}')`;
        db.query(sqlRole, (err, res) => {
            if (err) throw error;
            console.log('ADDED ROLE', res);
            console.log(`\n`)
        });
        promptUser();
    })    
};

const updateEmployeeRole = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'name',
            message: "Choose an employees role to change",
            choices: [
                'Michael Bluth',
                'Craig Testman',
                'Steve Defaultman',
                'Lucille Two',
                'Maeby Funke',
                'Tobias Funke',
                'Gob Bluth'
            ]
        },
        {
            type: 'list',
            name: 'role',
            message: "Choose a new role",
            choices: [
                '1 Sales Lead',
                '2 Sales Person',
                '3 Software Engineer',
                '4 Lead Engineer',
                '5 Lawyer',
                '6 Legal Team Lead',
                '7 Accountant'
            ]
        }
    ]).then((answers) => {
        const nameChange = answers.name.split(' ');
        const nameFirst = JSON.stringify(nameChange[0]);
        const nameLast = JSON.stringify(nameChange[1])
        const newRole = answers.role.split(' ');
        const newRoleId = JSON.stringify(newRole[0])
        let sqlNewRole = `UPDATE employee
        SET role_id = ${newRoleId} 
        WHERE first_name = ${nameFirst} 
        AND last_name = ${nameLast}`
            db.query(sqlNewRole, (err, res) => {
                if (err) throw error;
                console.log('Role Updated', res);
                console.log(`\n`)
            });
            promptUser();   
        })                
    }


promptUser()