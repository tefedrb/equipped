package com.usersapi.inventoryManagement;

import com.google.api.client.http.GenericUrl;

// THIS CAN BE USED FOR MONOLITH TESTING - COMMUNICATION BTWN SERVICES
public class InventoryApiUrl extends GenericUrl {
    public InventoryApiUrl(String encodedUrl){
        super(encodedUrl);
    }
}
