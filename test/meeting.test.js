import React from 'react';
import renderer from 'react-test-renderer';
import Meeting from '../src/components/meeting'

test('Meeting card displays information from props', () => {
	const component = renderer.create(
		<Meeting key={item.meetingId} details={item} ctrl={this.props.ctrl} teamMembers={this.props.teamMembers} />
	);
});