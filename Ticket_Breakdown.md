# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

* Create a new intermediate table between facilities and agents
  * Create a new table named facilities_agents of type Many to Many, adding a new property named agent_custom_id that the client can configure her own id for each agent.
* Implement configuration of agents on the facilities screen
  * Implement a new functionality on the facilities screen that the client can insert the agent and add her own id for each agent. You need to use the table named facilities_agents of type Many to Many and the custom field is agent_custom_id.
* Alter function getShiftsByFacility adding new property
  * Adjust function getShiftsByFacility to look the facilities_agents table and get the agent_custom_id when exists or if don't exists get the id of agent. You need to use this in the field id of agent when show your report.