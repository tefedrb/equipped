package com.example.equipmentapi.models;

import java.util.List;

public class CategoryItems {
    private String categoryName;
    private List<Item> allItems;

    public List<Item> getAllItems() {
        return allItems;
    }

    public void setAllItems(List<Item> allItems) {
        this.allItems = allItems;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryName() {
        return categoryName;
    }
}
