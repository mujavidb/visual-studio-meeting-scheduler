import moment from 'moment'

//TODO: Format by timezone
const formatToLongTime = time => {
	return time ? moment(time).format("dddd Do MMMM HH:mm") : "Time TBC";
}

export { formatToLongTime }