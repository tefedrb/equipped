package com.example.inventoryapi.models;

import com.google.api.client.http.GenericUrl;

public class EquipmentApiUrl extends GenericUrl {
    public EquipmentApiUrl(String encodedUrl){
        super(encodedUrl);
    }
}
