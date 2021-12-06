# Welcome to the Brighte Referral App

This app provides a webapp to manage internal referrals fueled by a backend REST API.

Users can view a list of entries representing referrals to contact.

Currently, the app can only display existing entries, and we need to add more functionality to make sure our product
team can use it effectively.

## Overview

This app is written in Typescript using [Express](https://expressjs.com/) for the backend API
and [React](https://reactjs.org/) for the frontend.

### API

The backend logic is implemented as a REST API, located at `./apps/api`. A local sqlite relational database is used to
store the data and [Prisma](https://www.prisma.io/) is used to manage the schema and access the db.

### Webapp

The webapp code is located at `./apps/webapp`. It fetches data from the API and displays the referrals in a user
interface. The app uses [Material UI](https://material-ui.com/) as UI component library.

This project was generated using [Nx](https://nx.dev).

## Local Development Setup

### Prerequisites

* [NodeJS](https://nodejs.org/en/), latest LTS version recommended
* [Yarn](https://classic.yarnpkg.com/lang/en/) package manager, version 1.22.x or newer

Tip: a nice way to install and manage various versions of NodeJS on your development machine
is [NVM](https://github.com/nvm-sh/nvm#installing-and-updating).

On a Mac you can use [Brew](https://brew.sh/) to install all prerequisites with this command:

```shell
brew install nvm yarn
```

Note: You will get prompted with one additional manual task to finish the NVM installation.

### Setup and Run

#### Set and install Node version (when using NVM):

```shell
nvm install
node --version
```

#### Install dependencies:

```shell
yarn install
```

#### Init Database and run initial migration:

```shell
yarn prisma migrate deploy
```

This command initialises the SQLite database and generates the db client.

#### Start the API service:

```shell
yarn start api
```

#### Start the webapp (in a separate terminal):

```shell
yarn start webapp
```

#### You are all set 🎉

#### Run Tests

```shell
yarn test api       # runs the api tests
yarn test webapp    # runs the webapp tests
```

Open [localhost:4200](http://localhost:4200) in your browser, you should see the webapp

Hint: to reset the database to its default state, run this from the root of the project:

```shell
rm ./apps/api/prisma/dev.db*  # removes SQLite files
yarn prisma migrate deploy    # rebuild db schema
```

## Tasks

Right now the app only provides a basic overview of existing entries of referrals, and the product team has asked us to
extend the app with some features.

Your job is to extend the app accordingly and make sure that the code base stays extendable and maintainable.

* Feel free to use any additional tools or libraries where you think it is appropriate.
* The existing code surely is not perfect, feel free to refactor things where it makes sense.
* Make sure that you follow best practices while extending the REST API and the webapp (e.g. code structure, SOLID
  principles etc.).
* Try to keep the user experience in mind while implementing new features. If requirements are unclear, feel free to
  decide what is best for the user.
* Add implementation notes and comments at the end of this README.

### Task 1: Update and delete referrals

The team needs to be able to update and delete existing referral entries. We already have action buttons in the UI that
are not functional yet, let's implement them.

* The update and delete functionality for the buttons in each referral row should be implemented.
* To update a referral, a modal box should be used with prefilled form fields.
  Hint: [Material UI - Modal](https://material-ui.com/components/modal/)
* The entries should be updated or deleted in the database accordingly via the API.

### Task 2: Create new referral entries

Users of the app want to be able to create new referrals using a form. The dev team came up with the following
requirements:

* A `Create new` button should be added below the existing referral list.
* The button opens a modal box with a form including all relevant fields to create a new referral entry.
* At the bottom of the modal box there should be 2 buttons: `Cancel` and `Create`.
* A new entry should be created via the API when the form is filled correctly and the `Create` button is clicked.

### Task 3: Validation

We receive reports that some saved referral entries contain unusual or incomplete data. Also, we saw that we get entries
with identical email addresses. Let's introduce input validation on the REST API side.

* When creating or updating referral entries we want to validate the fields as follows:
  * `givenName` is required and should be 2 to 200 characters long.
  * `surName` is required and should be 2 to 200 characters long.
  * `email` is required, should be a valid email address and be **unique**. It should not be possible to end up with
    multiple referral entries having the same email.
  * `phone` is required and should be a valid phone number for Australia.
* If any of the fields are invalid, the API should respond with an appropriate response that indicates what needs to be
  corrected
* Frontend changes are not required at this point.

## Implementation Notes

Please add notes here. Also feel free to add any further thoughts on your implementation decisions and potential
improvement ideas.

Happy Coding 🧑‍💻
