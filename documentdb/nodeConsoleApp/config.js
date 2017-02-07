// ADD THIS PART TO YOUR CODE
var config = {}

config.endpoint = "https://meetingscheduler.documents.azure.com:443/";
config.primaryKey = "hwY5vAlNl1XWSr9xPCbaRHWVLPPccHtEPTCwuTzd7hOrEGqJ5V20DdLchHq2SeOncZq8MpuXstuBMnrITdXTGQ==";

// ADD THIS PART TO YOUR CODE
config.database = {
    "id": "MeetingScheduleDB"
};

config.collection = {
    "id": "AccountsCollection"
};

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