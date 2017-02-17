import moment from 'moment'

function formatTime(time) {
	return time ? moment(time).format("dddd Do MMMM HH:mm") : "Time TBC";
}

export { formatTime };