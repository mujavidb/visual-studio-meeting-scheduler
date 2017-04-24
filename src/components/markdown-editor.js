import React, { Component } from "react"
import { formatMarkdown } from '../helpers/format-markdown'

export default class MarkdownEditor extends Component {
	constructor(props){
		super(props)
		let markdown_text = this.props.oldValue ? this.props.oldValue : 'Enter *markdown* here'
		this.state = {
			markdown_text: markdown_text
		}
		this.updateMarkdown = this.updateMarkdown.bind(this)
	}
	updateMarkdown(event){
		this.setState({markdown_text: event.target.value})
		this.props.update(event.target.value)
	}
	render(){
		let value = this.props.oldValue ? this.props.oldValue : this.state.markdown_text;
		return (
			<div className="agenda_area">
				<div className="markdown_input">
					<span className="label">Markdown Editor</span>
					<textarea name="agenda" onChange={this.updateMarkdown} ref="textarea" defaultValue={value}></textarea>
				</div>
				<div className="markdown_preview_area">
					<span className="label">Text Preview</span>
					<div className="markdown_preview" dangerouslySetInnerHTML={formatMarkdown(this.state.markdown_text)}></div>
				</div>
			</div>
		)
	}
}

