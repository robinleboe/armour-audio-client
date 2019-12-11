'Classic' social media app featuring Firestore DB, Firebase Cloud Functions, REST API, React (class-based component) front end.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) because 'let's write code!'

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Firebase Deployment

From project directory run `npm build` to optimize for deployment. Run `firebase init` and select the hosting option for the selected existing project. Select the `build` directory for the target

NOTE: do NOT choose `yes` when asked if you want to overwrite the index file.

Once the project is init'd run `firebase deploy`.