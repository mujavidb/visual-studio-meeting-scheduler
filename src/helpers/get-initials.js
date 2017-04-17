//Gets first char of first name and lastname
const getInitials = fullName => {
	const initials = fullName.split(" ")
	return `${initials[0].charAt(0)}${initials[initials.length - 1].charAt(0)}`
}

export { getInitials }