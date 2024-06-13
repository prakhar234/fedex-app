# FedexApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Check code coverage

Run `npm run coverage` to check code coverage.

## Running end-to-end tests

Run `npm run cypress:open` or `npm run cypress:run` to execute the end-to-end tests via cypress.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Details

This application is using standalone components instead of the modular approach. Reason for standalone components - it reduces the bundle size and seperates individual compnents from the rest of the components.
This application is using an architecture which can be scaled up very easily in the future. It is production ready as well and we can manage any feature management or API related urls in environment files.
Here is the architecture -
`core` - core contains all auth related services, guards and interceptors. Since this is the core module(in old terms), it manages the authentication of a SPA, manages all the guards available for a particular route and can also add app level interceptors which can be used to intercept any request and append any header or token required based on the application.

`features` - features contains all the features available with in an application e.g - Login, Dashboard, Products (may further contain product list, detail and add products), Profile and many more. Before standalone, we used to create individual modules for each page for feature present in an application. It is similar to that to provide easy scalability of the application.

`shared` - shared folder contains all the common components which can be utilized through out the application like Header, footer, notification, modal, backdrop, form-error, spinner and many more. These are standalone components but can be utlized in any part of the application. This folder also contains interfaces, enums, services and styles which can be reused throught the application.

Since this architecture looks robust, scalable and easily maintanable to me, I have used it for this application.
I have also added Jenkins file which can be seen as an example to start setting a CI/CD pipeline.

To run the application locally run `npm install` and then `npm run start`. This will start the local server at [(http://localhost:4200/)]. Default route is signup so entering `localhost:4200` will redirect you to [http://localhost:4200/signup] which is sign up form. Enter all the details as specified in the assessment document and test validators. There is a signup button and reset button. signup button will send the formvalues to specified url to fetch thumbnailUrl. When this request is completed, concatMap is used to modify userdetail and add thumbnailUrl and post the data to specified url in assessment document.
If the request is successful, a notification is added on the page that notifes that the sign up was successful and a fake authservice is used to save the user details in localstorage. User is navigated to Home page which welcomes the user with a message. Navigation bar changes and shows Home and Logout navitems and you can not access signup page again unless you logout.
If the request fails because of any network error or server error, then a error notification is shown on the page stating that the sign up is not successful, please try again later!

I have added AuthService to simply show a behaviour and assuming that the user also gets signed in after signup. Actual behaviour of a signup functionality will be different. It might be to show a successful page stating to verify yourself using the email sent which will redirect the user to login page.

Steps to run unit tests and end to end tests are provided above.
