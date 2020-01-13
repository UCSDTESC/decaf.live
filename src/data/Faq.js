import React from 'react';

const faq = [
    {
        question: `How do I get a ticket?`,
        answer: <>Just inside the West Ballroom Foyer entrance by the Bookstore, there will be a ticket issuance table. We'll be issuing tickets until we reach our maximum capacity for the day. <u>Remember to bring your UCSD ID</u>.</>
    },
	{
        question: `What do I do with the ticket that I received?`,
        answer: "This year, we are implementing a ticketing system for Decaf to cut down the amount of time you need to wait in line. The ticket (the sticker with a ticket number and QR code) represents your place in line. Once you have a ticket, you can leave (go to class, get food, etc.) and come back when your ticket number is eligible to enter each ballroom."
    },
	{
        question: `How do I know when I am eligible get into each ballroom?`,
        answer: "Subscribe above to receive a message (SMS and/or email) when your ticket is called for each ballroom. The two lines might move at different speeds. If you don't want to receive notifications, you can just check this page. If your ticket number is less than or equal to the number for a ballroom, you'll be allowed to enter."
    },
	{
        question: `What do I do once my number is "called"?`,
        answer: (<>When your ticket number is called for a specific ballroom, you may join the entry line for that ballroom. You must bring back your <u>UCSD student ID, ticket, and wristband</u> at this time. A volunteer will validate your ticket and mark one checkbox on your wristband before allowing you to enter the ballroom.</>)
    },
	{
        question: `How many times can I go in to each ballroom?`,
        answer: "You are allowed a total of three entries into any combination of the ballrooms. You can choose to spend all three (re-)entries on one ballroom, or use your three entries to visit both."
    },
	{
        question: `What do I do while waiting for my ticket to be called?`,
	answer: (<>We strongly recommend <a href="#upload">uploading your resume</a> via the form above and signing up for <a target="_blank" href="https://ripplematch.com/index?r=7qszUz">RippleMatch</a>. Feel free to go to class 😅 or otherwise relax. If you've subscribed for notifications, we'll let you know when to come back.</>)
    },
    {
        question: `What companies are attending/which ballroom are they in?`,
	answer: (<>Check out the list of attending companies <a target="_blank" href="https://tesc.ucsd.edu/decaf/attending">here</a>. See the maps for <a href="#east_maps">East</a> and <a href="#west_maps">West</a> Ballrooms to find out where companies are located.</>)
    },
]

export default faq;