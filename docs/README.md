# Project-Final-Deliverable-INST377_Hannah_A

Title of Project: Artist and Music Information Search Web Application

Description: 
The Music information and Song Search Web application is a tool that allows users to look up extensive information about some of their favorite artists, look up albums from said artists and even individual songs (through html forms and audio commands). It even includes a small list of trending songs, all based on data and information pulled from The Audio DB API. As well as a randomly generated picture slider, where users can see new album covers every time they reload the application. 

Additionally, this application allows users to see some inputs and data left behind by other users, in the form of a table where users can provide a name, their favorite artist, and their favorite song. 


Description of Target Browsers:
This application would work best on desktop applications (i.e. PC and laptop) because during its development, it wasn’t exactly made for iOS and Android in mind. While it may be able to work on mobile devices, it’s not an absolute guarantee, and it’ll likely be a better experience on a laptop or desktop computers with browsers such as Chrome and Microsoft Edge. 


Developer Manual:

In order to install the application from Github, make sure to copy the SSH (or HTML) link and clone the repository. This application was developed and built in VSCode, and was developed through the implementation of the dependencies (including Node.js) express, body-parser, dotenv, nodemon, and Supabase (this dependency list can be found in package.json). 

Additionally the JavaScript Libraries used in this repo was the picture slider (data simple slider) library that was used in the home page and annyang audio command library (no need to install, but just a heads up) that was used in the search page.

When running the application on a server, use npm (npm init and then npm start) to initialize it before using the local host link (localhost:3000 in this case). This is where you can access the application, besides the deployed link from vercel. 

As for the main files, with emphasis on the JS files, there are no significant tests to make note of here, as this application mainly gets information from the Audio DB API. The closest things to tests are the console.log which tests to see what information is being pulled from the DB and during development this was used to ensure that I was pulling the correct information. This was vital when I was using the inspect function to look at what information was being pulled and later implemented into the application. 

The API in the JScode.js file,
The musicpictures() function in this file utilizes a GET (fetch) to retrieve album pictures from one link (free) from the Audio DB, this is what is used to create the picture slider on the home page of the application. 

The getmusicinfo() function fetches (GET) information on artists from the Audio DB API, which is used in the search (main) page for users who want to look at information about their favorite artists.

The getalbums() function fetches (GET) albums from the Audio DB API and is used in the search page.

The songsearch() function fetches (GET) songs from the Audio DB API and is used in the search page.

The trending() function fetches (GET) three trending songs from the Audio DB API and is used on the home page.

The API in the datacode.js file,
The createuser() function posts (POST) the information imputed by users who want to share their name (username), favorite artist (favorite_artist) and favorite song (favorite_song) on the search (main) page. This post sends the data back to the usersong table from the Supabase database created for this application. 

The loaduserdata() function fetches (GET) the data that already exists in the supabase database (mentioned prior) and appends to the table which is in the search (main) page for users to view. 

The API in the mainpage.html file,
The songsearch() function fetches (GET) songs from the Audio DB API and is used in the search (main) page, and this particular fetch is used to help the annyang library used here to operate better.


There are no major bugs in this application that make use of this application difficult at times. The only notable ones is that the ‘search for artists and albums’ part of the main page isn’t too seamless when using the annyang commands. Once a command successfully gets results on the page (i.e. calling a list of albums), you won’t be able to then call for information about a certain artist right after, you’ll likely need to refresh the page in order to use the audio commands again. 
	
In terms of future development, it would be nicer to implement some more user friendly designs, cleaning up the application, making it a bit easier to access and operate on all types of devices and browsers, and implementing a better database management system, which is more strict on what information that each user can provide.


Deployed Link to vercel:
https://project-final-deliverable-inst-377.vercel.app/




