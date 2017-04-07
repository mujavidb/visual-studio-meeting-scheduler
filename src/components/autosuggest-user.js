import React, { Component } from "react"
import Autosuggest from 'react-autosuggest';
import { getAttendeeColor } from '../helpers/color-generator'
import theme from '../helpers/autosuggest-theme'

export default class AutosuggestUser extends Component {
	constructor(props){
		super(props)
		this.getSuggestions = this.getSuggestions.bind(this)
		this.deleteAttendee = this.deleteAttendee.bind(this)
		this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
		this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
		this.onUpdateAttendeesInput = this.onUpdateAttendeesInput.bind(this)
		this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
		this.data = this.props.originalData.map(a => ({ id: a.id, name: a.displayName, imgURL: a.imageUrl }))

		this.state = {
			attendee_value: "",
			attendees: [],
			suggestions: this.data
		}
	}
	onSuggestionSelected(event, others){
		const newAttendee = this.data.find(a => a.name === this.state.attendee_value)
		if (newAttendee != undefined && this.state.attendees.filter(a=>a.id == newAttendee.id).length == 0) {
			const newAttendees = [...this.state.attendees, newAttendee]
			this.setState({
				attendees: newAttendees,
				attendee_value: "",
				suggestions: []
			})
			this.props.update(newAttendees)
		} else {
			this.setState({ suggestions: [], attendee_value: ""})
		}
	}
	getSuggestions(value){
		const inputValue = value.trim().toLowerCase()
		const re = new RegExp(`${inputValue}`)
		return inputValue === "" ? [] : this.data.filter(a => re.test(a.name.toLowerCase()))
	}
	onSuggestionsFetchRequested({ value }){
		this.setState({ suggestions: this.getSuggestions(value) })
	}
	onSuggestionsClearRequested(){
		this.setState({ suggestions: [] })
	}
	onUpdateAttendeesInput(event, {newValue, method}){
		if (method == "click") {

			//setting click state is a hack to trigger componentDidUpdate
			//and run onSuggestionSelected() which doesn't usually run on click event
			this.setState({ attendee_value: newValue, click: true })
		} else {
			this.setState({ attendee_value: newValue })
		}
	}
	componentDidUpdate(){
		if (this.state.click) {
			this.onSuggestionSelected()
			this.setState({ click: false })
		}
	}
	deleteAttendee(e, data){
		const id = e.currentTarget.parentNode.getAttribute("id")
		const newAttendees = this.state.attendees.filter(a => a.id != id)
		this.setState({attendees: newAttendees})
		this.props.update(newAttendees)
		e.preventDefault()
	}
	render(){
		const inputProps = {
			className: "attendee_input_field",
			placeholder: "Enter attendee name",
			onChange: this.onUpdateAttendeesInput,
			value: this.state.attendee_value
		}
		return (
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
								<div className="attendee_block" key={attendee.id} id={attendee.id}>
									<img src={attendee.imgURL}/>
									<span className="attendee_initials">{attendee.initials}</span>
									<a onClick={this.deleteAttendee} className="remove">&#10799;</a>
								</div>
								// TODO: SORT OUT STYLES^
							)
						}
					</div>
				</div>
			</div>
		)
	}
}