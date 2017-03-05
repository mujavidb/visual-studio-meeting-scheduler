import marked from 'marked'

const formatMarkdown = md => {
	const html = md ? marked(md) : '';
	return {__html: html};
}

export { formatMarkdown }