import React, { Component } from "react"
import fullcalendar from 'fullcalendar'
import Calendar from './calendar'
import Autosuggest from 'react-autosuggest';
import { formatMarkdown } from '../helpers/format-markdown'
import { getAttendeeColor } from '../helpers/color-generator'

const theme = {
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
		bottom: 54,
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

export default class CreateMeeting extends Component {
	constructor(props){
		super(props)
		this.updateMarkdown = this.updateMarkdown.bind(this)
		this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
		this.deleteAttendee = this.deleteAttendee.bind(this)
		this.getSuggestions = this.getSuggestions.bind(this)
		this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
		this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
		this.onChangeTimeSlots = this.onChangeTimeSlots.bind(this);
		this.onUpdateAttendeesInput = this.onUpdateAttendeesInput.bind(this)
		this.state = {
			markdown_text: 'Enter *markdown* here',
			attendee_value: "",
			attendees: [], //kill duplicates
			suggestions: [],
			timeSlots: []
		}
		//mocks form received in
		this.query_results = [
			{ initials: "MB", id: "najd38j9h", name: "Mujavid Bukhari"},
			{ initials: "AL", id: "kjsadlj23", name: "Alasdair Hall"},
			{ initials: "KC", id: "mjniojin2", name: "Kelvin Chan"},
			{ initials: "ES", id: "9jn9n34f9", name: "Eric Schmidt"},
			{ initials: "FP", id: "mlksandhg", name: "Faiz Punakkath"},
			{ initials: "YM", id: "934i029jd", name: "Yousef Mahmood"}
		]

		//mocks form passed to selector
		this.suggestions = this.query_results.map(a => { return { id: a.id, name: a.name } })
	}
	updateMarkdown(event){
		this.setState({markdown_text: event.target.value});
	}
	onSuggestionSelected(event, { data }){
		// console.log("onSuggestionSelected")
		const newAttendee = this.query_results.find(a => a.name === this.state.attendee_value)
		if (newAttendee != undefined && this.state.attendees.filter(a=>a.id == newAttendee.id).length == 0) {
			this.setState({
				attendees: [...this.state.attendees, newAttendee],
				attendee_value: "",
				suggestions: []
			})
		} else {
			this.setState({ suggestions: [] })
		}
	}
	getSuggestions(value){
		// console.log("getSuggestions")
		const inputValue = value.trim().toLowerCase()
		const re = new RegExp(`${inputValue}`)
		return inputValue === "" ? [] : this.suggestions.filter(a => re.test(a.name.toLowerCase()))
	}
	onSuggestionsFetchRequested({ value }){
		// console.log("onSuggestionsFetchRequested")
		this.setState({ suggestions: this.getSuggestions(value) })
	}
	onSuggestionsClearRequested(){
		// console.log("onSuggestionsClearRequested")
		this.setState({ suggestions: [] })
	}
	onUpdateAttendeesInput(event, data){
		// console.log("onChange")
		this.setState({ attendee_value: data.newValue })
	}
	deleteAttendee(e, data){
		const id = e.currentTarget.parentNode.getAttribute("id")
		this.setState({attendees: this.state.attendees.filter(a => a.id != id)})
		e.preventDefault()
	}
	// NEED TO GET ARRAY OF EVENTS DIRECT FROM FULL CALENDAR
	onChangeTimeSlots(newTimeSlots){
		this.setState({timeSlots:newTimeSlots});
		console.log(this.state.timeSlots);
	}
	render(){
		const inputProps = {
			className: "attendee_input_field",
			placeholder: "Enter attendee name",
			onChange: this.onUpdateAttendeesInput,
			value: this.state.attendee_value
		}
		return (
				<div className="large_card_area create_meeting">
					<header>
						<div className="topbar">
							<h2 className="container_title">Create a Meeting</h2>
						</div>
					</header>
					<main>
						<h3>Title</h3>
						<input type="text" name="title" placeholder="Enter meeting title" />

						<h3>Agenda</h3>
						<div className="agenda_area">
							<div className="markdown_input">
								<span className="label">Markdown Editor</span>
								<textarea name="agenda" onChange={this.updateMarkdown} ref="textarea" defaultValue={this.state.markdown_text}></textarea>
							</div>
							<div className="markdown_preview_area">
								<span className="label">Text Preview</span>
								<div className="markdown_preview" dangerouslySetInnerHTML={formatMarkdown(this.state.markdown_text)}></div>
							</div>
						</div>

						<h3>Availability</h3>
						<span className="label">Highlight the times you would like to suggest for this meeting.</span>
						<div className="full_calendar_area">
							<Calendar onChangeTimeSlots={this.onChangeTimeSlots} />
						</div>

						<h3>Attendees</h3>
						<div className="attendee_area">
							<div className="attendee_input">
								<span className="label">Add attendees to this meeting.</span>
								<Autosuggest
									suggestions={this.state.suggestions}
									onSuggestionSelected={this.onSuggestionSelected}
									onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
									onSuggestionsClearRequested={this.onSuggestionsClearRequested}
									getSuggestionValue={suggestion => suggestion.name}
									renderSuggestion={suggestion => <span>{suggestion.name}</span>}
									inputProps={inputProps}
									theme={theme}/>
							</div>
							<div className="attendee_added">
								{
									this.state.attendees.length > 0 ? <span className="label">Click to remove</span> : ""
								}
								<div className="attendees">
									{
										this.state.attendees.map(attendee =>
											<div className="attendee_block" key={attendee.id} id={attendee.id} style={getAttendeeColor(attendee)}>
												<span className="attendee_initials">{attendee.initials}</span>
												<a onClick={this.deleteAttendee} className="remove">&#10799;</a>
											</div>
										)
									}
								</div>
							</div>
						</div>
						<footer>
							<a onClick={()=>this.props.ctrl.dashboard()} className="button cancel maxed" role="button">Cancel</a>
							<a onClick={()=>this.props.ctrl.dashboard()} className="button primary maxed" role="button">Create Meeting</a>
						</footer>
					</main>
				</div>
			)
	}
}