var getMeetings = {
    id: "getMeetings",
    serverScript: function (accountId, userId){
        var context = getContext();
        var collection = context.getCollection();
        var response = context.getResponse();

        var query = 'SELECT * FROM AccountsCollection c WHERE c.id = ' + accountId +'"';

        var meetings = [];

        var accept = collection.queryDocuments(collection.getSelfLink(), query,
        function(error, document, responseOptions){
            if (document.length != 1) {
                return error;
            };

            document[0].meetings.forEach(function(meeting) {

                if (meeting.hostId == userId) {
                    meetings.push(meeting);
                    continue;
                }

                meeting.forEach(function(attendee) {
                    if (attendee.id == userId) {
                        meetings.push(meeting);
                        break;
                    }
                }); 
            });

            return meetings;
        });
    }
}