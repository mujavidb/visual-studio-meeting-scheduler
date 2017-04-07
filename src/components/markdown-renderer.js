import React, { Component } from "react"
import { formatMarkdown } from '../helpers/format-markdown'

export default class MarkdownRenderer extends Component {
	constructor(props){
		super(props)
		this.state = {
			markdown_text: 'No content to show'
		}
	}
	render(){
		return (
			<div className="agenda_area">
				<div className="markdown_preview_area">
					<div className="markdown_preview" dangerouslySetInnerHTML={formatMarkdown(this.props.content)}></div>
				</div>
			</div>
		)
	}
}

