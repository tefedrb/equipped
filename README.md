# Equipped
  - This is a film & photography equipment management application, meant to help collectives, media companies, or rental houses maintain accountability for all the bits and pieces that make up a production.
  - Each item has tech-specifications listed.
  - In later versions, users will be able to share their production kits with the rest of the App and get feedback and ratings.
  - Renting out items based on location and reputation could be a future addition.
  - This is a full stack application deployed to AWS.
  ![Schedule](/readmeImgs/Equipped_GUI_MockUp_v1.png)

# Technologies Used
  - React for the front end.
  - Java (The Spring Framework) for the back end.
  - Postgres for the database.
  - Docker used to create a platform for a microservice environment.
  - Postman for testing end-points.

# Struggles
  - I should have spent more time looking for an outside API that would compliment this project.
  - I kept running into errors while trying to spin up my docker container. Eureka wasn't registering my API among other things, and I still don't know why reverting back to an older version of spring-boot-starter-parent fixed these issues.

# What's left to do?
- To finish the API, maybe redesign the models and relationships a bit.
- Finish the UI - adding a company inventory & personal inventory section - be able to have a change in inventory reflected throughout the company, for instance if a piece of equipment is being used for a shoot.
- Figure out a way to incorporate the Google Calendar API for reservations etc.
- A simplification of the scope of this project might be necessary -
a reassessment.

# General Approach
![Schedule](/readmeImgs/schedule.png)
![Entity-Relationship-Diagram](/readmeImgs/erd.png)
![UI-brainstorm](/readmeImgs/erd_UI.png)
- I sketched out an ERD with the aim to keep the database schema complexity down.
- I knew I wanted to start by focusing on the backend, in particular spending time dissecting the security features of the app and build a stronger understanding of things were working before beginning the UI.

# User stories
- I need a system that keeps track of when/what pieces of equipment are leaving the office building and for what shoots, in order for me and my team to share accountability of our company property. I should be able to know what we need to change or alter in our gear to make our productions work better for us and the client.
- I have a group of colleagues who are always working, and always need to borrow each others equipment for their work. We are a growing collective of filmmakers and need to start adding more structure to our workflow.
- I want to keep track of what camera gets used the most in my company, and whether or not other people are using a better or worse camera in what could be a better balanced production kit used on similar shoots.
