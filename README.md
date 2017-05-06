
# Todos

![home-page](https://res.cloudinary.com/alsoicode/image/upload/v1493141233/github/osu-todos/home-mobile.fw.png)
![todos-list](https://res.cloudinary.com/alsoicode/image/upload/v1493141233/github/osu-todos/my-todos-mobile.fw.png)

A responsive, Firebase-connected Todo list built using Angular that demonstrates some of the basic concepts involved in building a small, but non-trivial application.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0 and leverages:

 - [Firebase](https://firebase.google.com/)
 - [Bootstrap](https://getbootstrap.com)
 - [Font Awesome](http://fontawesome.io/)

## Software You Need Installed...

#### [Node](https://nodejs.org/en/) (version 6 or Higher)

Your TypeScript code will be transpiled to JavaScript using Node and WebPack. You need Node 6 or higher installed on your computer and available via the command line.

#### An editor / IDE of your choice

I would *highly recommend* using [Visual Studio Code](https://code.visualstudio.com/). It's free, fast and supports TypeScript right out of the box. You can use it for other languages too. You can use a text editor like TextMate, but you're going to miss out on a lot.

## Services You Need Accounts for...

- [Firebase](https://firebase.google.com) is a BaaS (Backend as a Service) which this application uses for its realtime database and OAuth provider(s).
- [Github](https://github.com) to use for Authentication (and for your code)

### Setting Up Firebase and Github

After you create your accounts, we have to configure some settings. **DON'T PANIC** - this isn't one of those "go make some coffee, it's going to be a long night" things.

First, head over to the [Github](./docs/github.md) docs, then to [Firebase](./docs/firebase.md). You'll need information from Github to set up Firebase, so do that one first. Firebase will give you one final piece of information for Github and you'll be all set.

## Getting Started Writing Code...

Modern JavaScript-based applications that leverage Node for compiling/transpiling are usually comprised of one or more "modules", and these modules are typically available via the Node Package Manager (npm) which is installed with Node. All of the following commands should be executed using Terminal on OS X / Linux or PowerShell/Command Prompt on Windows:

- After you download and install Node, ensure it's available on your path by typing: `node -v`

If this command is successful it will return the version of Node that is currently installed. Next, you'll need to:

- Install TypeScript globally using npm: `npm i typescript@next -g`
- Change directories into your project: `cd /path/to/your/project`
- Install the project's dependencies: `npm install`

Once the project's dependencies are installed, you will see a `node_modules` directory in your project. This directory should NOT be included in source control; it should be unique per developer.

## Running the Development server

Run `ng serve` for a local devevelopment server using WebPack. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`. See the [Angular CLI](https://github.com/angular/angular-cli/wiki) docs for more information.

## Building the Code for Deployment

Run `ng build` (on your command line) to build the project. The build artifacts will be stored in the `dist/` directory. To deploy, simply move all of the files in the `dist/` directory to the appropriate directory on your server. Use the `--prod` flag for a production build. Add the `--aot` flag for Ahead Of Time compilation (recommended), example: `ng build --prod --aot`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md) or email me, Brandon Taylor, with questions at: [alsoicode@gmail.com](mailto:alsoicode@gmail.com?Subject=Help-with-OSU-Todos)

