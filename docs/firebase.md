# Setting Up Firebase

First, you need an account, so create one, then log in.

## Add A Project

- Click on the "Go To Console" link in the upper-right corner, then click the "Add Project Button" and follow the on-screen instructions.

## Authentication Provider

Next, click the "Authentication" link in the sidebar navigation, click the "Sign-In Method" tab and finally, click on "Github".

- Toggle the "Enable" switch to turn on authentication for Github. Enter your Client ID and Client Secret values from Github.
- Copy the Authorization Callback URL at the bottom of the form
- Go back to your Github settings, click on your OAuth application for this project, enter the Authorization Callback URL and save your changes.

## Web Application Settings

We need our application to be able to connect to Firebase, and to do that, we need them to provide us some settings.

- Click on the "Web Setup" link in the upper-right-hand corner of the Authentication tab. We won't need the script tags, just the "config" values.

- Copy the config values and replace the values in [environment.ts](../src/environments/environment.ts) (and/or environment.prod.ts) with the values from your account.

## That's it!

Your application is ready to connect to Firebase and Authenticate via Github. [Continue reading](../README.md) to get the project's code dependencies installed.
