const generateHTML = require('./src/generator');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern'); 
const fs = require('fs'); 
const inquirer = require('inquirer');

const teamArr = []; 

const addManager = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the manager name: ', 
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter the manager's ID: ",
        },
        {
            type: 'input',
            name: 'email',
            message: "Enter the manager's email: ",
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "Enter the office number: ",
        }
    ])
    .then(managerInput => {
        const  { name, id, email, officeNumber } = managerInput; 
        const manager = new Manager (name, id, email, officeNumber);

        teamArr.push(manager); 
        console.log(manager); 
    })
};

const addEmployee = () => {

    return inquirer.prompt ([
        {
            type: 'list',
            name: 'role',
            message: "What would you like to do?",
            choices: ['Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: "What's the name of the employee?", 
        },
        {
            type: 'input',
            name: 'id',
            message: "Please enter the employee's ID.",
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter the employee's email.",
        },
        {
            type: 'input',
            name: 'github',
            message: "Please enter the employee's github username.",
            when: (input) => input.role === "Engineer",
        },
        {
            type: 'input',
            name: 'school',
            message: "Please enter the intern's school",
            when: (input) => input.role === "Intern",
        },
        {
            type: 'confirm',
            name: 'confirm',
            message: 'Would you like to add more team members?',
            default: false
        }
    ])
    .then(employeeData => {
        let { name, id, email, role, github, school, confirm } = employeeData; 
        let employee; 

        if (role === "Engineer") {
            employee = new Engineer (name, id, email, github);

            console.log(employee);

        } else if (role === "Intern") {
            employee = new Intern (name, id, email, school);

            console.log(employee);
        }

        teamArr.push(employee); 

        if (confirm) {
            return addEmployee(teamArr); 
        } else {
            return teamArr;
        }
    })

};

const writeFile = data => {
    fs.writeFile('./build/index.html', data, err => {
 
        if (err) {
            console.log(err);
            return;
  
        } else {
            console.log("Success!")
        }
    })
}; 

addManager()
  .then(addEmployee)
  .then(teamArr => {
    return generateHTML(teamArr);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .catch(err => {
 console.log(err);
  });