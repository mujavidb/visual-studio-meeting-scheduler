import moment from 'moment'

//TODO: Format by timezone
const formatToLongTime = time => {
	return time ? moment(time).format("dddd Do MMMM, h:mma") : "Time TBC";
}

export { formatToLongTime }