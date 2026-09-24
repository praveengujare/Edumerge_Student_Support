AI TOOL USED:
ChatGPT
---------------------------------------------------------
WHAT I ASKED AI TO DO:
Help design and implement the Student Support & Ticket Management system using Spring Boot, React, and MySQL.
Generate and explain backend functionality including ticket creation, assignment, priorities, status workflow, SLA calculation, dashboard statistics, and ticket history.
Help build and debug the React frontend, including routing, forms, API integration with Axios, ticket management UI, and dashboard screens

------------------------------------------------------------
"Build a Student Support & Ticket Management MVP with ticket creation, statuses, priorities, assignment, SLAs, activity history and dashboard using Spring Boot, React and MySQL. Explain the implementation step by step and help me build and test each feature."

--------------------------------------

React pages and components
Axios API integration
React Router configuration
Tailwind CSS UI structure
for frontend i used mostly ai 

------------------------------------------------

CODE I MODIFIED: What part?

I reviewed and modified the generated code based on my project requirements and testing.

Removed Lombok and added explicit getters/setters because of IDE compatibility issues.

Modified the ticket creation flow to use student/staff dropdowns instead of manually entering IDs.
Fixed React routing and navigation.
Modified UI layouts and styling using Tailwind CSS.
Documented JWT, Spring Security and role-based access control as future scope due to the available development time.

-----------------------------------------------------------------------------

AI OUTPUT THAT WAS WRONG:

the initial ticket creation which the id and staff are not in the database so i created dropdown for now
the initail routing is redirecting to the / so changes the routes and the flow .

-------------------------------------------------------
HOW I IDENTIFIED THE PROBLEM:
i tested the backend part by part (any implementation i tested )backend error when a non-existing student ID was provided.

I also tested the frontend navigation and noticed that clicking Dashboard redirected to the registration page instead of the dashboard. then i made it corect

-----------------------------------------------------

HOW I FIXED IT:

 changed  Dashboard navigation route from / to /dashboard so that it correctly opens the dashboard.

 in bakend i realized that the lambok is not working due to ide so i used getter and setter method to access the fileds 

 -----------------------------------------------------------------------------------------

 
