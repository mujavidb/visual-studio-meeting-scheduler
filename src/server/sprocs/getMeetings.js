var getMeetings = {
    id: "getMeetings",
    serverScript: function (accountId, userId){
        var context = getContext();
        var collection = context.getCollection();
        var response = context.getResponse();

        var query = 'SELECT * FROM AccountsCollection c WHERE c.id = ' + accountId +'"';

        var accept = collection.queryDocuments(collection.getSelfLink(), query,
        function(error, document, responseOptions){

        });
    }
}