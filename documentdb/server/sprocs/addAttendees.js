var addAttendeesSproc = {
    id: "addAtendees",
    serverScript: function (accountId, meetingId, attendees) {
        var context = getContext();
        var collection = context.getCollection();
        var response = context.getResponse();

        var query = 'SELECT * FROM AccountsCollection c WHERE c.id = "' + accountId + '"';
        // First read whole document
        var accept = collection.queryDocuments(collection.getSelfLink(), query,
            function (error, document, responseOptions) {
                if (error) throw new Error("Error: " + error.message);

                // Now we have the whole document, get the corresponding meeting.
                document.meetings.forEach(function (meeting) {
                    if (meeting.id == meetingId) {

                        attendees.forEach(function (attendee) {
                            meeting.attendees.push(attendee);
                        });


                        return updateAttendees(document);

                    }
                });


            });

        function updateAttendees(document) {

            collection.replaceDocument(document._self, document, function (error, result) {
                if (error) throw "Unable to update attendees";
                else return result
            })

        }

    }
}