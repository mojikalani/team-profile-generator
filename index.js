
//Employee profiles 
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

//Node
const inquirer = require("inquirer");
//const fs = require("fs");

//team array
const managerArr= [];
const engineerArr= [];
const internArr= [];
//Manager
function addManager() { 
    return inquirer.prompt([
    {
        type: "input",
        message: "Enter your name.",
        name: "name",
    },
    {
        type: "input",
        message: "Enter your employee ID.",
        name: "id",
    },
    {
        type: "input",
        message: "Enter your email address.",
        name: "email",
    },
    {
        type: "input",
        message: "Enter your office number.",
        name: "officeNum",
    },
    ])
    .then((newManager) => {
        const {name, id, email, officeNum} = newManager;
        const manager = new Manager (name, id, email, officeNum); 
        managerArr.push(manager); 
        console.log(manager);
        
        return getEmployee(); 
        });
        
};

function getEmployee() { 
    return inquirer.prompt([ 
        { 
            type: "list",
            message: "What would you like to do?",
            name:"next", 
            choices: ["Add Engineer", "Add Intern", "Finish Building Team"],
        }, 
    ])
    .then((answers) => { 
        switch(answers.next){ 
            case "Add Engineer": 
            return addEngineer(); 

            case "Add Intern": 
            return addIntern(); 

            default: 
            return renderListing(); 
        }
    })
}

//function to add engineer
function addEngineer() { 
    return inquirer.prompt([
        { 
           type: "input", 
           message: "Enter your name: ", 
           name: "name",
        }, 
        { 
            type: "input", 
            message: "Enter your employee id: ", 
            name: "id",
         }, 
         { 
            type: "input", 
            message: "Enter your email: ", 
            name: "email",
         }, 
         { 
            type: "input", 
            message: "Enter your github username: ", 
            name: "github",
         }, 
    ])
    .then((newEngineer) => {
        const {name, id, email, github} = newEngineer;
        const engineer = new Engineer (name, id, email, github); 
        engineerArr.push(engineer); 
        console.log(engineer);
        console.log(engineerArr);

        return getEmployee(); 
        });
}

function addIntern() { 
    return inquirer.prompt([
        { 
           type: "input", 
           message: "Enter your name: ", 
           name: "name",
        }, 
        { 
            type: "input", 
            message: "Enter your employee id: ", 
            name: "id",
         }, 
         { 
            type: "input", 
            message: "Enter your email: ", 
            name: "email",
         }, 
         { 
            type: "input", 
            message: "Enter your school: ", 
            name: "school",
         }, 
    ])
    .then((newIntern) => {
        const {name, id, email, school} = newIntern;
        const intern = new Intern (name, id, email, school); 
        internArr.push(intern); 
        console.log(intern);
        console.log(internArr);

        return getEmployee(); 
        });
}

function renderListing() { 
    const text = "render HTML for listings"; 
    return fs.writeFile("build/team.html", text);
}
addManager();