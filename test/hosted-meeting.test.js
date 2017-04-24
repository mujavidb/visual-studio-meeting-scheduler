import React from 'react';
import renderer from 'react-test-renderer';
import HostedMeeting from '../src/components/hosted-meeting'

const testData = {
	details: {
		meetingId: "asjdaifhwijd",
		meetingName: "Test",
		finalDate: {
			dateStart: new Date(2011,10,30)
		},
		meetingLocation: "somewhere",
		attendees: [
			{
				id: "92hd98fhueohi",
				status: "unresponsive",
				displayName: "Mr T",
			}
		]
	},
	teamMembers: [
		{
			id: "92hd98fhueohi",
			status: "unresponsive",
			displayName: "Mr T",
			imgUrl: "link"
		}
	],
	ctrl: {
		viewHosted: () => {}
	}
}

test('Clicking hosted meeting navigates to HostedMeeting', () => {
	const component = renderer.create(
		<HostedMeeting
			key={testData.id}
			details={testData.details}
			ctrl={testData.ctrl}
			teamMembers={testData.teamMembers} />
	);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	tree.props.onClick();
	expect(tree).toMatchSnapshot();
});

test("", () => {});
test("", () => {});
test("", () => {});
test("", () => {});
test("", () => {});
test("", () => {});
test("", () => {});
test("", () => {});