import { Meeting } from './meeting';

export const MEETINGS: Meeting[] = [
	{
		"id"			: "1", 
		"name"			: "Plan Client Presentation", 
		"time"			: "2017-02-15T14:30:00+00:00", 
		"description"	: "Example description", 
		"location"		: "MPEB 6.21, UCL", 
		"minutes"		: "This is what we talked about", 
		"agenda"		: "This is what we will talk about"
	},
	{
		"id"			: "2",
		"name"			: "Weekly Standup",
		"time"			: "",
		"description"	: "Example description",
		"location"		: "Break room",
		"minutes"		: "This is what we talked about",
		"agenda"		: "This is what we will talk about"
	},
	{
		"id"			: "3", 
		"name"			: "Sales Review", 
		"time"			: "2017-02-06T15:30:00+00:00", 
		"description"	: "We're going to review some sales", 
		"location"		: "Board Room", 
		"minutes"		: "This is what we talked about", 
		"agenda"		: "This is what we will talk about"
	},
];