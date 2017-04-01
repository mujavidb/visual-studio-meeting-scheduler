var config = {};

config.endpoint = "https://meetingscheduler.documents.azure.com:443/";
config.primaryKey = "hwY5vAlNl1XWSr9xPCbaRHWVLPPccHtEPTCwuTzd7hOrEGqJ5V20DdLchHq2SeOncZq8MpuXstuBMnrITdXTGQ==";

// ADD THIS PART TO YOUR CODE
config.database = {
    "id": "MeetingSchedulerDB"
};

config.collection = {
    "id": "AccountsCollection"
};

config.usersCollection = {
    "id": "UsersCollection"
}

config.creds = {
    clientID: '6dd08af2-b44f-4a7f-b816-04036530551b',
    clientSecret: 'SphX8U8MoxygovNs8GTAFSgtYmPEwohaA1cVbPvBQJ8=',
    audience: 'http://meeting-scheduler.azurewebsites.net',
    // identityMetadata: 'https://login.microsoftonline.com/common/v2/.well-known/openid-configuration',
    identityMetadata: 'https://login.microsoftonline.com/1faf88fe-a998-4c5b-93c9-210a11d9a5c2/.well-known/openid-configuration',
    loggingLevel: 'info',
    responseType: 'code id_token',
    responseMode: 'form_post',
    redirectUrl: 'https://meeting-scheduler.azurewebsites.net/',
    validateIssuer: true,
    passReqToCallback: false,
}

config.documents = {
   "Account12oi31oi2j31":      {
         "tsAccountId":"12oi31oi2j31",
         "meetings":[
            {
               "hostId":"1234",
               "meetingId":"4321",
               "meetingName":"Birthday!",
               "hostAvailability":[
                  {
                     "dateStart":"01/12/2017",
                     "dateEnd":"00:00"
                  },
                  {
                     "dateStart":"01/12/2017",
                     "dateEnd":"00:00"
                  }
               ],
               "finalDate":"some date object here",
               "attendees":[
                  {
                     "id":"asqwe12d",
                     "response":1,
                     "name":"Kelvin",
                     "availableTimes":[
                        {
                           "dateStart":"01/12/2017",
                           "dateEnd":"00:00"
                        },
                        {
                           "dateStart":"01/12/2017",
                           "dateEnd":"00:00"
                        }
                     ]
                  },
                  {
                     "id":"asqwe12d",
                     "response":1,
                     "name":"Kelvin",
                     "availableTimes":[
                        {
                           "dateStart":"01/12/2017",
                           "dateEnd":"00:00"
                        },
                        {
                           "dateStart":"01/12/2017",
                           "dateEnd":"00:00"
                        }
                     ]
                  }
               ]
            }
         ]
      }
   
}

module.exports = config;