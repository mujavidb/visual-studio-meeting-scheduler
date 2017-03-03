<h1>How To Use Kelvin's API??!?!?!</h1>

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

<h2>API</h2>

<h3>Create a meeting</h3>
<p>create a POST request on </p>

```
{
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