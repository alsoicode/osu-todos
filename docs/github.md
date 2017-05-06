# Setting up Github as an OAuth Provider

First, you'll need to create a Github account, then log in.

## OAuth Applications

Go to your account Settings using the drop-down menu in the upper-right-corner, then select "OAuth Applications" from the "Developer Settings" in the sidebar at the bottom-left of your screen.

## Register A New Application

![new-oauth-app](http://res.cloudinary.com/alsoicode/image/upload/v1494076080/github/osu-todos/github-oauth-create-app.jpg)

- Click the "Register a New Application" button at the top-right of the screen.
- Enter a name
- Enter "http://localhost:4200" for the "Homepage URL" for now. You can always change this later.
- Enter "http://localhost:4200" for the "Authorization callback URL for now. You'll replace this value with information from Firebase.

Save your changes, and Github will generate the Client information you'll need for Firebase.

## Client IDs

Leave your browser tab open, and make note of the "Client ID" and "Client Secret" values. You'll provide these to Firebase in order to use Github as your OAuth provider.

## That's it!

Open a new tab and head over to <a href="https://firebase.google.com" target="_blank">Firebase</a>, then follow the [instructions for set up](./firebase.md)
