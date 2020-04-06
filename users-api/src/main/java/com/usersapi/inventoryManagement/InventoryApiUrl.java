package com.usersapi.inventoryManagement;

import com.google.api.client.http.GenericUrl;

public class InventoryApiUrl extends GenericUrl {
    public InventoryApiUrl(String encodedUrl){
        super(encodedUrl);
    }
}
