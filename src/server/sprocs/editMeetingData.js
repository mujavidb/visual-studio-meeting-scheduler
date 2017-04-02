function editMeetingData(accountId, meetingId, newMeetingData) {

    var context = getContext();
    var collection = context.getCollection();
    var response = context.getResponse();

    var query = 'SELECT * FROM AccountsCollection c WHERE c.id = ' + accountId +'"';

    var accept = collection.queryDocuments(collection.getSelfLink(), query,
        function(error, document, responseOptions){
            if (document.length != 1) {
                return error;
            };

            document[0].meetings.forEach(function(meeting) {

                // If meeting.meetingId == meetingId, replace all the data.
                if (meeting.meetingId == meetingId) {

                    var newMeeting =  meeting;
                    
                    for (var p in newMeetingData) {
                        if( newMeetingData.hasOwnProperty(p) && p != "meetingId") {
                            meeting.p = newMeetingData.p;
                        } 
                    }       
                                       
                    //Now we have updated the data in document[0], we need to replace.
                    
                    return updateDocument
                }

             
            });

            return meetings;

        function updateDocument(document) {
            collection.replaceDocument(document._self, document, function (error, result) {
                if (error) throw "Unable to update attendees";
                else response.setBody("Success!");
            });
        }
    });
}