# Table of Contents  
[Installation](#installation)  
[Meetings](#meetings)

<a name="headers"/>
## Headers

<h1>How To Use Kelvin's API??!?!?!</h1>



<a name="installation"/>
<h2>Installation</h2>
<p>Firstly, you need to install the packages that is required for the server to run.</p>

```
npm install
```
<p>To start the server with debug enabled:</p>

```
DEBUG=*:server node ./bin/www
```
<p>
    Currently, any requests made to your local server is then made on the existing 
    DocumentDB server already hosted on Azure. In production, the server will also
    be hosted onto Azure (I think).
</p>

<h3>How to deploy server to Azure</h3>
<p>From the root of the repository:</p>

```
git subtree push --prefix src/server azure master
```


<h2>API</h2>

<p>Make sure you set an 'application/json' header!!</p>


<h3>Create a Document</h3>
<p>
    In our system, every VSTS Account has it's own document, so if a VSTS account hasn't used the extension before
    you will have to create a Document for that account using this API call.

    IMPORTANT: Make sure the accountID you use to create this is the account-id of the VSTS account!!
</p>
<p>Make a GET request on</p>

```
localhost:3000/document/create/:documentId
```
<p>For example:</p>

```
localhost:3000/document/create/sajdhjqwe-id-2
```
<p>At the moment this is a GET request, and is subject to change, though is a low priority<p>


<!--============================================================================================================-->
<!--MEETINGS ===================================================================================================-->
<!--============================================================================================================-->
<a name="meetings"/>
<h3>Create a meeting</h3>
<p>create a POST request on </p>

```
localhost:3000/:documentId/meeting/create
```
<p>For example:</p>

```
localhost:3000/ProperTestDocument/meeting/create/EatingChocolate
```
<p>The body of the POST request is as follows:</p>

```
{
    "meetingName": "Happy Birthday To the Ground!",
    "hostId": "123456789"",
    "hostAvailability": [
        {
            "dateStart": 1,
            "dateEnd": 1
        }
    ],
    "attendees": [
        {
            "id": "118118118",
            "name": "Kelvin Chan"
        }
    ]        
}
```

<h3>Get all meetings of a user</h3>
<p>Make a GET request on</p>

```
'localhost:3000/:documentId/meeting/get/:userId'
```

<p>Alternatively, you can get all hosted meetings of a user with the request below</p>

```
localhost:3000/:documentId/meeting/hosted/:userId
```

<p>UPDATE: working now.</p>

<h3>Add attendees to a meeting</h3>
<p>Make a POST request on:</p>

```
localhost:3000/:documentId/:meetingId/attendees/add
```
<p>For example</p>

```
localhost:3000/my-document-id/my-meeting-id/attendees/add
```
<p>The POST body is as follows:</p>

```
{
    "attendees": [
        {
            "id": "user-id-here",
            "response": 0,
            "name": "user's name here",
            "availableTimes":[
                {
                    "dateStart": "some-date-object/string here",
                    "dateEnd": "some-date-object/string here"
                }
            ]
        }
    ]
}
```
<p>





<h3>Get a single meeting using meetingId</h3>
<p>Make a GET request on:</p>

```
localhost:3000/my-document-id/meeting-id/get
```
</p>For example:</p>

```
localhost:3000/ProperTestDocument/DdVqhdEV5gVuj/get
```

<h3>Edit data in an existing meeting</h3>
<p>Make a POST request on:</p>

```
localhost:3000/ProperTestDocument/14AjFg56Z86H8/edit
```
<p>POST body is as follows:</p>

```
{
	"hostId": "new host id mofo!!",
	"meetingName": "What is this",
	"meetingLocation": "Some where in the world",
	"hostAvailability": [],
	"finalDate": null,
	"attendees": []	
}
```

<p>You can include as little or as many parameters as you want. You cannot replace meetingID, you can try but it won't work.</p>

<h3>Get responded meetings</h3>

<p>POST request. No body needed for now, but I've made it a post request because we'll eventually have to attach auth headers for the server</p>

```
localhost:3000/ProperTestDocument/meeting/responded/user-id
```

<h3>Get UNresponded meetings</h3>

<p> POST request. </p>

```
localhost:3000/ProperTestDocument/meeting/unresponded/user-id
```

<h3>Set final meeting date</h3

<p>POST request</p>

```
localhost:3000/ProperTestDocument/oz5mUbpN05NIY/finalise
```

