const generateRGBColor = inputString => {
	let hash = 0
	for (let i = 0; i < inputString.length; i++) {
		hash = inputString.charCodeAt(i) + ((hash << 5) - hash)
	}
	//TODO: Mute saturation of colors
	return `#${(hash & 0xFFFFFF).toString(16).toUpperCase()}`
}

const getAttendeeColor = attendee => {
	return {backgroundColor: generateRGBColor(attendee.initials)}
}
export { generateRGBColor, getAttendeeColor }