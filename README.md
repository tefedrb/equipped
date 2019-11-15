# Equipped
  - This is a film & photography equipment management application, meant to help collectives, media companies, or rental houses maintain accountability for all the bits and pieces that make up a production.
  - Each item has tech-specifications listed.
  - In later versions, users will be able to share their production kits with the rest of the App and get feedback and ratings.
  - Renting out items based on location and reputation could be a future addition.
  - This is a full stack application deployed to AWS.

# Technologies Used
  - React for the front end.
  - Java (The Spring Framework) for the back end.
  - PostgreSQL for the database.
  - Docker used to create a platform for a microservice environment.
  - Postman for testing end-points.


# Struggles
  - THIS WAS RUSHED.
  - I came up with an idea and pursued it without properly looking for an API or doing the right amount of research.
  - I kept running into errors while using using docker-compose. Eureka wasn't registering my API among other things, and I still don't know why reverting back to an older version of spring-boot-starter-parent fixed these issues.
  - I should have asked for help more often. Dealing with errors in the backend slowed me down.
  - I should have allowed myself more time to complete each step of the process.

# General Approach
- I sketched out a very basic ERD with the expectation that I was definitely going to appreciate working on executing a simple design.
- I knew I wanted to start by focusing on the backend, in particular spending time dissecting the security features of the app and build a stronger understanding of things were working before beginning the UI.
- Once I realized I wasn't going to have enough time to do what I wanted to do before the deadline, I mad sure to focus on working with React.

# User stories
- I need a system that keeps track of when/what pieces of equipment are leaving the office building and for what shoots, in order for me and my team to share accountability of our company property. I should be able to know what we need to change or alter in our gear to make our productions work better for us and the client.
- I have a group of colleagues who are always working, and always need to borrow each others equipment for their work. We are a growing collective of filmmakers and need to start adding more structure to our workflow.
- I want to keep track of what camera gets used the most in my company, and whether or not other people are using a better or worse camera in what could be a better balanced production kit used on similar shoots.
