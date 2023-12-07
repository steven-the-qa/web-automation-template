# Amazon Challenge

## CI/CD

You can use the manual "Run Workflow" button in the "Actions" tab of the repo to run the tests from GitHub if you don't want to download the project.

Otherwise, continue to the instructions for running my solution on your machine.

## Installation

1. Clone this repository to your local machine using Git:

```bash
git clone https://github.com/boutchersj/amazon_challenge.git

```

2. Navigate to the project directory:

```bash
cd amazon_challenge
```

3. Install the project dependencies:

```bash
npm install
```

## Running the Tests

You can run my solution using ```npm test```

## Cool Features

1. Page Object Model

I'm doing this my own unique way. Playwright doesn't describe my approach in the docs, but I think it's easier to read.

I admittedly "stole" this approach from my mentor at Fetch who built a Ruby/RSpec/Capybara/SitePrism/Appium framework. I loved their concept of "Sections" as a way to group locators for a section of the page. It's helpful for components mostly, but I'm demoing it here.

2. HTML Report

This is an artifact I'm publishing in the GitHub Actions workflow after the tests finish.

3. Screenshots

I'm taking a screenshot after each test and publishing it as an artifact after the tests finish.

The screenshot files are named after the name of the test after which they were taken.

4. Manual & Automatic CI Trigger

The tests will automatically run when you push new code to the repo.

You can also use the manual trigger to run the tests without ever leaving GitHub.