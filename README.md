# Wink NLP Classifier

This repository contains a Node.js application that uses the Express framework to create a simple web server with three main endpoints: "/", "/result", and "/train". The application uses the wink-naive-bayes-text-classifier library for text classification and the csv-parser library for parsing CSV files. The "/train" endpoint reads data from a CSV file ("data.csv") and uses it to train a Naive Bayes classifier. The "/result" endpoint uses the trained classifier to predict the division of a given item ("Site Staking Survey" in this case). The repository demonstrates how to use the wink-naive-bayes-text-classifier library to train a Naive Bayes classifier on data from a CSV file and use it to predict the division of new items.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

Steps to install your project.
1. npm install 
2. npm start
3. Hit http://localhost/train to train the model
4. Hit http://localhost/result to get the result
