class Meeting {

    constructor(hostId, meetingId, meetingName) {
        this.hostId = hostId;
        this.meetingId = meetingId;
        this.meetingName = meetingName;

        this.data = {
            "hostId": hostId,
            "meetingId": meetingId,
            "meetingName": meetingName,
            "hostAvailability": [],
            "finalDate": null,
            "attendees": []
        }
    }

    addHostAvailability(dateStart, dateEnd) {
        this.data.hostAvailability.push({
            "dateStart": dateStart,
            "dateEnd": dateEnd
        });
    }

    addAttendee(id, name) {
        this.data.attendees.push(
            {
                "id": id,
                "response": 0,
                "name": name,
                "availableTimes": []
            }
        );
    }

}

module.exports = Meeting;