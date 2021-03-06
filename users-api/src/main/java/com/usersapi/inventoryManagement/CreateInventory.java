package com.usersapi.inventoryManagement;

import com.google.api.client.http.*;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.http.json.JsonHttpContent;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;

// THIS CAN BE USED FOR MONOLITH TESTING - COMMUNICATION BTWN SERVICES
public class CreateInventory {
    static HttpTransport HTTP_TRANSPORT = new NetHttpTransport();

    // "The JacksonFactory is the fastest and most popular library for parsing/serialization operations."
    static JsonFactory JSON_FACTORY = new JacksonFactory();



    public void run(InventoryObj inventoryObj)  {
        HttpRequestFactory requestFactory = HTTP_TRANSPORT.createRequestFactory();

//        InventoryApiUrl url = new InventoryApiUrl("http://localhost:8080/inventory-api/inventory/create");
        InventoryApiUrl url = new InventoryApiUrl("http://localhost:8182/inventory/create");


        try {
            // Converting inventoryObj (containing a company name and id) into serialized JSON data and then
            // into HttpContent
            HttpContent companyContent = new JsonHttpContent(JSON_FACTORY, inventoryObj);

            System.out.println("TO STRING : " + inventoryObj.toString());

            // Building an http POST request with the endpoint from our inventory-api, & our HttpContent
            HttpRequest request = requestFactory.buildPostRequest(url, companyContent);
            request.getHeaders().setContentType("application/json");

            try {
                // Sending it off
                HttpResponse theRequest = request.execute();
                System.out.println("HERE LIES THE RESPONSE " + theRequest);
            } catch(HttpResponseException e) {
                System.err.println(e.getStatusMessage());
            }
        } catch(Exception e){
            System.out.println("Error in CreateInventory " + e);
        }
    }
}
