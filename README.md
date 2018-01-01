[![](https://github.com/thechausenone/workspace/wiki/images/logo-with-text.png)](https://github.com/thechausenone/workspace/wiki)

# Introduction to Workspace

Workspace is a cross-platform desktop application that allows users to configure, manage, and quick-launch application/file windows with ease. Each _window_ in Workspace corresponds to an application/file window and a grouping of _windows_ are called _boards_. Users are able to manage and configure these _boards_ to suit their needs, and once done, each board can be activated to launch all its associated _windows_. Once everything is configured the first time around, launching groups of application/file windows becomes as easy as clicking a button.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To start, you will need to have the Node Package Manager (npm) installed locally on your machine. 

For information on how to do this, please visit the following link: https://www.npmjs.com/get-npm 

### Installing

Once you have npm installed, you can proceed with the steps listed in this section.

Clone this repository locally :

```
git clone https://github.com/thechausenone/workspace.git
```

Navigate into your local Workspace project directory :

```
cd workspace
```

Install project dependencies using npm :

```
npm install
```

If you want the ability to generate Angular components with Angular-cli (not required):

```
npm install -g @angular/cli
```

## Running the project

To run the project, just be in the Workspace project directory and use:  

```
npm start
```

## Built With

| Technology    | Usage         |
| ------------- |:-------------|
| [![](https://github.com/thechausenone/workspace/wiki/images/angular.jpg)](https://angular.io/)                                                    | Angular is the front-end framework that was used in the development of Workspace. Pretty much all user interaction, along with interaction with the Electron API & Firebase, is handled through Angular.  |
| [![](https://github.com/thechausenone/workspace/wiki/images/electron.png)](https://electronjs.org/)                     | Electron enabled Workspace to be built using web technologies (i.e., Angular, HTML/CSS, Typescript) and then deployed to a desktop environment. It comes with a utility that make packaging the app into an executable possible, along with an API that handles desktop specific interactions.
| [![](https://github.com/thechausenone/workspace/wiki/images/firebase.png)](https://firebase.google.com/)                | Firebase's authentication and real-time database services are used to maintain user data. User's **must** create an account with Workspace and after doing so, they will be able to save their _boards_ and _windows_ to the database.      |


## Authors

* **David Chau** - *development* - [thechausenone](https://github.com/thechausenone)
* **Jiwan Kang** - *development* - [jiwankang](https://github.com/jiwankang)
* **Weihan Li** - *project idea and development* - [weihanli101](https://github.com/weihanli101)

## Acknowledgments

* **maximegris** for his [angular-electron](https://github.com/maximegris/angular-electron) project which was used as the starting template for Workspace

