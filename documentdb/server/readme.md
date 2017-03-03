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