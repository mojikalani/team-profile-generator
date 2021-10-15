
//Employee profiles 
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

//Node
const inquirer = require("inquirer");
const fs = require("fs");

//team array
const teamArr= [];

//Manager
const addManager = () => { 
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
    {
        type: "list",
        message: "What would you like to do?",
        name: "choices",
        choices: ["Add Engineer", "Add Intern", "Finish Building Team"]
    },
    ])
    .then((newManager) => {
        const {name, id, email, officeNumber} = newManager;
        const manager = new Manager (name, id, email, officeNumber); 
        teamArr.push(manager); 
        console.log(manager);
        
        });

}
