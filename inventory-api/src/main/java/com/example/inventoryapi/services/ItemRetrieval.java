package com.example.inventoryapi.services;

import com.example.inventoryapi.models.EquipmentApiUrl;
import com.example.inventoryapi.models.Item;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestFactory;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.JsonObjectParser;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.common.reflect.TypeToken;

import java.lang.reflect.Type;

public class ItemRetrieval {
    static HttpTransport HTTP_TRANSPORT = new NetHttpTransport();
    static JsonFactory JSON_FACTORY = new JacksonFactory();

    public Item run(Long serial_id)  {
        HttpRequestFactory requestFactory = HTTP_TRANSPORT.createRequestFactory(
                (HttpRequest request) -> {
                    request.setParser(new JsonObjectParser(JSON_FACTORY));
                });
        EquipmentApiUrl url = new EquipmentApiUrl("http://localhost:8181/item/" + serial_id);
        try {
            HttpRequest request = requestFactory.buildGetRequest(url);
            Type type = new TypeToken<Item>() {
            }.getType();
            Item item = (Item) request.execute().parseAs(type);
            return item;
        } catch(Exception e){
            System.out.println("Error in ItemRetrieval " + e);
        }
        return null;
    }
}
