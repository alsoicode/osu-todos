# Setting up Github as an OAuth Provider

First, you'll need to create a Github account, then log in.

## OAuth Applications

Go to your account Settings using the drop-down menu in the upper-right-corner, then select "OAuth Applications" from the "Developer Settings" in the sidebar at the bottom-left of your screen.

## New Application

- Click the "Register a New Application" button at the top-right of the screen.
- Enter a name for your application
- Enter "http://localhost:4200" for the "Homepage URL" for now. You can always change this later.
- Enter "http://localhost:4200" for the "Authorization callback URL for now. You'll replace this value with information from Firebase.

Save your changes, and Github will generate the Client information you'll need for Firebase.

## Client IDs

Leave your browser tab open, and make note of the "Client ID" and "Client Secret" values. You'll provide these to Firebase in order to use Github as your OAuth provider.

## That's it!

Open a new tab and head over to [Firebase](https://firebase.google.com), then follow the [instructions for set up](./firebase.md)
