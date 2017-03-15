export default {

	container: {
		position: 'relative'
	},
	input: {
		width: "100%"
	},
	inputFocused: {
		outline: 'none'
	},
	inputOpen: {
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0
	},
	suggestionsContainer: {
		display: 'none'
	},
	suggestionsContainerOpen: {
		display: 'block',
		boxSizing: "border-box",
		position: 'absolute',
		top: "calc(100% - 1px)",
		width: "100%",
		zIndex: 2,
		border: '1px solid #CCC',
		backgroundColor: '#FFF',
	},
	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: 'none'
	},
	suggestion: {
		cursor: 'pointer',
		padding: '10px'
	},
	suggestionHighlighted: {
		backgroundColor: '#DDD'
	}
}