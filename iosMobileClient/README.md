# Neighborly Mobile App boilerplate

This project was created using [React Native](https://reactnative.dev), [GraphQL](https://graphql.org/) and [Apollo](https://www.apollographql.com).

## To run application:

Navigate to the `/iosMobileClient` folder and run `npm install` or `yarn` to install package dependencies. Once completed navigate to the `/iosMobileClient/ios` folder and run `pod install` to install all pod files.

Please add your local IP address to the `LOCAL_HOST` constant located in the folder `utils/constants/routes`. Example `LOCAL_HOST='http://<YOUR-IP-ADDRESS>:4000'`. This will enable the app to run on your mobile device.

To start application first run `yarn start` or `npm start` from inside your `/server` folder. Once started navigate to the `/iosMobileClient` folder and run `yarn start` or `npm start` to start react native then in a separate terminal but within the same folder `/iosMobileClient` run the command `react-native run-ios` to start ios simulator.
