## Manter Dashboard API | NHL Stenden Project

### API Details
NodeJS Express API for Manter OEE Dasboard.

### Database connection guide

The provived MySQL dump file was hosted on an Azure Database for MySQL server. In this short guide you can find how to connect to it.

#### Connections details

Set up a .env file
Add the following lines to the .env file:

`HOST_M61 = "manter-database-stenden.mysql.database.azure.com"`  
`USER_M61 = "Manter"`  
`PASSWORD_M61 = ">]S,8/P5=v$RM>Vs_y5*wt9~"`  
`DATABASE_M61 = "cen_m61_v1"`  
`HOST_M70 = "manter-database-stenden.mysql.database.azure.com"`  
`USER_M70 = "Manter"`  
`PASSWORD_M70 = ">]S,8/P5=v$RM>Vs_y5*wt9~"`  
`DATABASE_M70 = "cen_m70_v1" `  

Use only one the following methods (depending on your need):

#### Connect from Console/Terminal/Git Bash/Azure Cloud Shell

mysql -h manter-database-stenden.mysql.database.azure.com -u Manter -p

#### MySQL WorkBench/HeidiSQL/Other software of choice

- Create a new connection
- Name this connection (eg. *Manter-Dashboard*)
- Select **Standard TCP/IP** as the Connection type
- For the hostname, enter `manter-database-stenden.mysql.database.azure.com`
- Use **Manter** for the username and **Stenden!** for the password (don't select Azure Active Directory/Access Control! Use only MySQL authentication)
- Go to the SSL tab and update the Use SSL to Require/On (if not already)
- In the **SSL CA** field, enter the location of the `DigiCertGlobalRootCA.crt.pem` (included in this repository)
- Click on **Test Connection** to ensure everyhting is in order
- If the connection is successful, clik **OK** to save the connection template.


#### Use the following code snippet to connect from a Node.js application

`var conn=mysql.createConnection({host:"manter-database-stenden.mysql.database.azure.com", user:"Manter", password:"Stenden!", database:"cen_m61_v1", port:3306, ssl:{ca:fs.readFileSync("DigiCertGlobalRootCA.crt.pem")}});`

### Steps for starting the server

Within command line navigate to the root of the folder. Afterwards, make sure to run the series of commands in the sequence provided:

- npm install
- node src/server.js (will start the server on localhost:8080)
