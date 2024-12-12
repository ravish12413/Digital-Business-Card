# Documentation Guide for Digital Business Card 🌐
The Digital Business Card enables you to create a publicly shareable link containing all the essential details about you and your company.

![photo](https://github.com/user-attachments/assets/5b9ef1ad-c74f-42b5-b42a-1469810db630)

## BUSINESS CARD PREVIEW:
![3](https://github.com/user-attachments/assets/1f892d36-8234-4536-9dd7-c7bdb3ec1d71)


## Tech Stack Used 🛠️
<b>Frontend:</b> HTML, CSS, JS <br>
<b>Backend: </b> Firebase( Realtime Database, Authentication), NodeJS<br>
<b>Code Versioning:</b> Github <br>
<b>Deployment:</b> Vercel

## How to Run this Project on Local Host 🖥️ ?

> **NOTE**: Ensure you set up Firebase and add the Firebase Configuration Object in the code before running the project. Scroll down to the **Firebase Setup** section for guidance.

> If you’re deploying the project on **Vercel**, skip this section and follow the steps in the **Deployment** section.


Below are the steps to run the project:
1. Download the Source Code 
2. Open the code with a Code Editor like VS Code
3. Open terminal within VS Code and run the following command: <b>node server.js </b>

```bash
node server.js
```


## How Does this Project Work 🤔 ?
1. Once the project is run, it opens the landing page (index.html). <br>
2. To Login or Signup, open the login.html page <br>
3. If you have signed up previously, you can directly login using the same email and password used in Signing Up <br>
4. If your account is not created, you will need to create an account. To create an account, you need to provide Username, Email and Password.<br>
5. The username to generate the publically link. Your Digital Business Card link will be : <your-deployment-domain.com>/username . For instance, if you are running this project in localhost, then your link will be: localhost: PORT/username <br>
5. After Signing up, you will receive an email to verify the email you provided. You will not be able to login unless you verify the email. <br>
6. Verify the Email and log in. You will be navigated to Dashboard Page after logging in. <br>
7. On the Dashboard Page, you will see the preview of all the necessary fields.Click on Edit button to open the filds for editing. Provide all the details wherever necessary and click on save button to save the changes. Your changes will be previwed in the form instantly.
8. To Sign Out, click on the Sign out button on the page. 

NOTE: The Current Version only supports providing Images and Catlogue Link in the fields instead of Uploading directly. You can upload the image or catalogue files in tools like [Cloudinary](https://cloudinary.com/) and then generate a link. Provide the same link in the required field.

## Understanding File Structure 📂

Root/<br>
├── node_modules/ <br>
├── Public/ <br>
├── server.js <br>
├── package.json <br>
├── package-lock.json <br>
├── vercel.json<br>


Here's an explanation of the purpose of each file or folder in your project directory structure:

### Explanation:

1. 📁 **`node_modules/`**  
   - This folder contains all the Node.js packages and dependencies installed via npm (`npm install`).  
   - It is automatically generated based on the `package.json` file. You generally do not modify this folder manually.

2. 📁 **`Public/`**  
   - This folder contains all static assets of this project, such as HTML, CSS, JavaScript, images, and other frontend files.  
   - It serves as the public-facing part of the application, accessible to users through the browser.

3. 📄 **`server.js`**  
   - This is the entry point for the Node.js server application.  
   - It typically contains the server configuration, routes, and logic for handling incoming requests. In this project, running `node server.js` starts the server on `localhost:3000`.

4. 📄 **`package.json`**  
   - This file defines the project, including its name, version, description, and dependencies.  
   - It also specifies scripts for running or building your application and other metadata like author information.  
   - Dependencies listed here are installed into `node_modules` when you run `npm install`.

5. 📄 **`package-lock.json`**  
   - This file locks the exact versions of the dependencies and their nested dependencies used in the project.  
   - It ensures consistent installations across different environments.

6. 📄**`vercel.json`**  
   - This file contains configuration settings for deploying this project to [Vercel](https://vercel.com/).  
   - It may specify build and deployment settings, environment variables, routing, and more, to tailor the deployment process to your application's needs.


## Firebase Setup 🔥
We require to use two Firebase Services for this project- Realtime Database and Authentication. We store the data in the Realtime Database and use Authentication for Login / SignUp and verification purposes.

1. Create a Project in Firebase
2. Once you have created the project, click on Realtime Database under Build from the left sidebar menu.
3. Click on Create database.Let the location of the database be United States (us-cental1). Choosing a different location may lead to unexpected challenges.
4. Start the database in lock mode
5. Now make necessary nodes as shown below:
![4](https://github.com/user-attachments/assets/4cdc5442-a24c-486e-aa8e-b1507355761a) <br>

NOTE: Make nodes as provided above. Any change in the name of the node will cause issues in the projet. <br> <br>
6. After you have created the structure of your database, click on rules and update it with the following: <br>

```json
{"rules": {
  "Binding": {
    "$uid": {
      ".read": "auth != null && auth.uid === $uid",
      ".write": "auth != null && auth.uid === $uid"
    }
  },
  "Collected Data": {
    "$username": {
      ".read": "true",
      ".write": "auth != null && root.child('Binding').child(auth.uid).child('username').val() === $username"
    }
  },
}
}
```
7. Click on Publish. You have setup the Firebase Realtime Database.
8. Now, under the Build section of left sidebar, click on Authentication.
9. Click on Get Started. 
10. Choose Email/Passowrd and enable it in the next step. (Need not required to enable the Email passwordless sign in)
11. Click on Save
12. In the left Sidebar, click on Project Overview.
13. Now, on the main page, under "Get started by adding Firebase to your app", click on the web icon (</>) to add a web app to your Firebase.
14. In the next step, it will ask you to Register the web app. Provide a name and click on Register.
15. It will ask you to add SDK. Ignore this and click on Continue to Console.
16. In the left sidebar, click on the Gear icon beside the Project Overview. Then click on Project settings.
17. On the Settings page, scroll down to Your Apps section. You will find your web app added there. Select Config in the SDK setup and configuration and copy the JSON provided as shown below:
![5](https://github.com/user-attachments/assets/17cf59da-f078-4f21-9f7d-ec9f7a351ebb) <br>
18. Now replace the Firebase Config object in app.js file with your own Firebase Config Object. 



## Deployment 🚀
Vercel is a cloud platform that helps developers build, deploy, and scale web applications

Before deployment, upload the code in your Github or simply Fork this Repository and then follow the steps below: 

1. Log in to Vercel:
2. Connect Github
3. On the Vercel dashboard, click New Project.
4. Select Import Git Repository.
5. Authorize Vercel to access your GitHub account.
6. Choose your repository from the list.
7. Configure the Deployment:
8. Click Deploy.


Vercel will build and deploy the project.
After deployment, Vercel will provide a live URL (e.g., https://mmtdbs.vercel.app).

<b>Automatic Deployment on Push:<br></b>
Vercel is now linked to your GitHub repository.
Any changes you push to the main branch will trigger a new deployment automatically.
