'use strict';

function getHostedMeetings (accountId, userId){
        var context = getContext();
        var collection = context.getCollection();
        var response = context.getResponse();

        var query = 'SELECT * FROM AccountsCollection c WHERE c.id = "' + accountId +'"';

        var meetings = [];

        var accept = collection.queryDocuments(collection.getSelfLink(), query,
        function(error, document, responseOptions){

            if (error) throw new Error("Error: " + error.message);

            if (document.length != 1) throw ("Unable to find document");

            document[0].meetings.forEach(function(meeting) {

                if (meeting.hostId == userId) {
                    meetings.push(meeting);
                };

            });

            response.setBody(meetings);
        });
    }