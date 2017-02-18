import { Pipe } from '@angular/core';
declare var marked: any;

@Pipe({
	name: 'markdown',
	pure: false
})

export class MarkdownPipe {
	transform(md: string): string {
		return md ? marked(md) : '';
	}
}