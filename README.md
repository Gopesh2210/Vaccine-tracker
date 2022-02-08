# Vaccine-tracker
A node.js app to track the vaccine availability in the city of your choice in India, add details of the mail receipts to send the information across to them in a mail.

How to configure

1. Download the project
2. Install node modules : npm install
3. Visit the config.js file to configure the following
  - Sender and Receiver details
  - Cities and their pincodes
4. In the slotTracker.js file add the city whose slots you want to see in the 'requestOption'.
5. Run the server, the application will send updates of available slots every 3 minutes. 
