# DIVVYUP.

## Description

A mobile app that splits the bill for you. Just take a picture of your receipt, add number of people & method of splitting, and submit your charge requests.

![DIVVYUP](https://media4.giphy.com/media/F3h73GOVHrHg6mOrJG/giphy.gif?cid=790b761194b84cdd79b03e461446e5678df179bd1e0c7198&rid=giphy.gif&ct=g)

## Testing

npm install
expo start

## Building

npm install

## Features

- New users can sign up and current users can securely login to access their account
- Users have the ability to upload a receipt by taking a picture on their device camera or uploading from their photo gallery
- Users can either accept the parsed receipt data
- Users have the option to not accept the parsed receipt data and edit the price amounts for each item
- Once receipt data is accepted, users can provide number of people and can choose them method of splitting (evenly/itemzed)
- For itemized split bills, users can assign a chargee to individual items
- Users will be redirected to a final confirmation page, displaying the charge amounts by person

## Tech Stack

- React-Native framework for ios mobile application
- Firebase Firestore for receipt & user database
- Firebase Authentication for secured user signup/login
- Expo camera for accessing device photo gallery & camera
- Expo to quick start the app and test in real time
- Google Vision API for OCR text recognition

## Next steps

- Implement a History screen where users can see a list of all their previous receipts & their charge statuses
- Integrate PayPal and Stripe APIs to enable sending and receiving payments
- Build a notification system to send new charge requests, to remind users of outstanding charge requests, and to confirm payments
- Add a toggle for users to mark a receipt as settled

## Team

Anjali Nainani | https://github.com/anjinai | https://www.linkedin.com/in/anjali-nainani

Jazmin Feijoo | https://github.com/jazfeijoo | https://www.linkedin.com/in/jazminfeijoo

Josephine Wang | https://github.com/joseewang | https://www.linkedin.com/in/joseewang

Margareth Borba | https://github.com/mborba1 | https://www.linkedin.com/in/margarethborba/
