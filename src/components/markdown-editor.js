import React, { Component } from "react"
import { formatMarkdown } from '../helpers/format-markdown'

export default class MarkdownEditor extends Component {
	constructor(props){
		super(props)
		this.state = {
			markdown_text: 'Enter *markdown* here'
		}
		this.updateMarkdown = this.updateMarkdown.bind(this)
	}
	updateMarkdown(event){
		this.setState({markdown_text: event.target.value})
		this.props.update(event.target.value)
	}
	render(){
		return (
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
		)
	}
}

