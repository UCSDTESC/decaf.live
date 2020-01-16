import React from 'react';

const faq = [
    {
        question: `How do I get a ticket?`,
        answer: <>Just inside the West Ballroom Foyer entrance by the Bookstore, there will be a ticket issuance table. We'll be issuing tickets until we reach our maximum capacity for the day. You <b>MUST</b> bring your <b>UCSD ID</b> to get a ticket.</>
    },
	{
        question: `What do I do with the ticket that I received?`,
        answer: <>This year, we are implementing a ticketing system for Decaf to cut down the amount of time you need to wait in line. The ticket (the sticker with a ticket number and QR code) represents your place in line. Once you have a ticket, you can leave (go to class, get food, etc.) and come back when your ticket number is eligible to enter the line for each ballroom. <b><u>DO NOT LOSE YOUR TICKET!</u></b></>
    },
	{
        question: `How do I know when I am eligible get into each ballroom?`,
        answer: <><a href="#subscribe">Subscribe</a> above to receive a message (SMS and/or email) when your ticket is called for each ballroom. The two lines might move at different speeds. If you don't want to receive notifications, you can just check this page. If your ticket number is within the number range for a ballroom, you'll be allowed to enter the line for that ballroom.</>
    },
	{
        question: `What do I do once my number is in the range for a ballroom?`,
        answer: <>When your ticket number is eligible for a specific ballroom, you may join the entry line for that ballroom. You must bring back your <b>UCSD ID</b>, <b>TICKET</b>, and <b>WRISTBAND</b> at this time. A volunteer will validate your ticket and mark one checkbox on your wristband before allowing you to enter the ballroom.</>
    },
	{
        question: `How many times can I go in to each ballroom?`,
        answer: "You are allowed a total of three entries into any combination of the ballrooms. You can choose to spend all three (re-)entries on one ballroom or use your three entries to visit some combination of the two ballrooms. Note: If you enter West Ballroom and then enter East Ballroom, these count as two separate entries out of your three."
    },
	{
        question: `What if I want to enter the ballroom(s) more than three times?`,
        answer: "You will need to wait in line for another ticket and wristband if you want another ticket."
    },
	{
        question: `What do I do while waiting for my ticket to be called?`,
	    answer: <>We strongly recommend <a href="#upload">uploading your resume</a> via the form above and signing up for <a target="_blank" href="https://ripplematch.com/index?r=7qszUz">RippleMatch</a>. Feel free to go to class 😅 or otherwise relax. If you've subscribed for notifications, we'll let you know when to come back. Note: the sooner you come back after your ticket number is called, the less time you’ll need to wait in the per-ballroom line.</>
    },
	{
        question: `What is RippleMatch?	`,
		answer: <>RippleMatch is sponsoring Decaf this year! The RippleMatch job-matching platform helps you land more interviews at top companies like Citadel, Pfizer, NASA, IBM, and TripAdvisor. Can’t make it to Decaf, bored of waiting in line, or didn’t find the job opportunity you wanted? Want companies to contact you? You can go to <a href="http://bit.ly/rmdecaf" target="_blank">bit.ly/rmdecaf</a> to register for RippleMatch.</>
    },
    {
        question: `What companies are attending/which ballroom are they in?`,
	    answer: <>Check out the list of attending companies <a target="_blank" href="https://tesc.ucsd.edu/decaf/attending">here</a>. See the maps for <a href="#east_maps">East</a> and <a href="#west_maps">West</a> Ballrooms to find out where companies are located.</>
    }
]

export default faq;