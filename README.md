# Equipped

**Equipped** is a full-stack video and photography equipment management application designed for film collectives, media companies, and rental houses to efficiently manage their gear.

Users can browse an industry-standard catalog of equipment—complete with detailed specs and images of each item and its components—and add the gear they own to their company’s inventory. Equipped also tracks checkouts and usage history, helping teams keep tabs on who has what, when, and for how long.

An integrated forum feature allows team members within the same company to communicate directly through the app.

---

## 🎬 Why I Built This

This project was inspired by my time working at a small media company, where managing equipment was chaotic and manual. Equipped is the kind of tool we could have used—something that makes it easy to track gear usage and improve team coordination.

---

## 🛠️ Tech Stack

Equipped is a **Dockerized full-stack application** with a microservices architecture:

- **Backend:** Java + Spring Boot (multiple services)
- **Frontend:** React.js
- **Database:** Populated automatically from a curated equipment list
- **Infrastructure:** Docker for containerization and orchestration

---

## 📦 Data Collection: The “Yoink” Scraper

To populate the equipment database, I built a custom web scraper—[`yoink`](https://github.com/your-yoink-repo)—using **Puppeteer**. This scraper programmatically pulls gear specs and images from a specific rental house's website and stores them in a JSON file.

On application startup, this JSON file is used by the `equipment-api` service to seed the database. The frontend then consumes this data, enabling users to browse available equipment and add it to their company’s inventory.

---

## 🔑 Features

- ✅ Browse gear with professional-grade specifications and photos  
- ✅ Add items to your company's owned inventory  
- ✅ View real-time checkouts and usage history  
- ✅ Team forum for internal communication  
- ✅ Automatic equipment data population via web scraper  

---
    
Mockup (created in Photoshop)
![Schedule](/readmeImgs/Equipped_GUI_MockUp_v1.png)

---

## Requirements
- Docker
- Java 8
- Node.js

---

## 🛠 🚀 Installation & Set Up
1. Clone the repository.

3. Make sure your ports are clear (8182, 8181, 8082, 8080, 8761, 5432 - refer to docker-compose.yml for services that will run).

4. Docker Desktop should be up and running & allowed to use 3.00 GB of memory. Check this by opening up preferences and navigating to Resources and then Advanced. There you should see a Memory slider that you should adjust accordingly.

5. From the equipped directory in your terminal, use the command: 
    ```sh
    docker-compose up
    ```
5. You can check to see if everything is up and running by using this command in a new terminal tab (note: depending on your machine it might take a few minutes for docker to build all the services for you):
     ```sh
    docker ps -a
    ```
6. If everything is up and running, you should see something like:
```
d270ac45dc34        maven:3.6.2-jdk-8   "/usr/local/bin/mvn-…"   3 days ago          Up 3 minutes              0.0.0.0:8182->8182/tcp   equipped_inventory-api_1
7d6689e86753        maven:3.6.1-jdk-8   "/usr/local/bin/mvn-…"   3 days ago          Up 3 minutes              0.0.0.0:8080->8080/tcp   equipped_api-gateway_1
e5e3eb8a46e9        maven:3.6.1-jdk-8   "/usr/local/bin/mvn-…"   3 days ago          Up 3 minutes              0.0.0.0:8082->8082/tcp   equipped_users-api_1
dcd470ac15d8        maven:3.6.1-jdk-8   "/usr/local/bin/mvn-…"   3 days ago          Up 3 minutes              0.0.0.0:8181->8181/tcp   equipped_equipment-api_1
5f79c9b83787        maven:3.6.1-jdk-8   "/usr/local/bin/mvn-…"   3 days ago          Up 3 minutes              0.0.0.0:8761->8761/tcp   equipped_eureka_1
8ffb4674f7d9        postgres            "docker-entrypoint.s…"   3 days ago          Up 3 minutes              0.0.0.0:5432->5432/tcp   equipped_postgresdev_1
```
7. cd into the client folder, which you'll find in the project directory, and use the command:
    ```sh
    npm run start
    ```
8. This will start a server at ```http://localhost:3000/``` where you'll find your local view.

---

## 🤖 Entity Relationship Diagrams
* Users Service ERD:
![users-erd](readmeImgs/usersERD.png)

---

* Inventory Service ERD:
![inventory-erd](readmeImgs/inventoryERD.png)

* Equipment Service ERD:
![equipment-erd](readmeImgs/equipmentERD.png)
