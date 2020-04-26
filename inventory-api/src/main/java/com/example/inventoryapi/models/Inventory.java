package com.example.inventoryapi.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "inventories")
public class Inventory {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inventory_id;

    @Column(name = "company_id")
    private Long company_id;

    @Column(name = "company_name")
    private String company_name;

    @JsonManagedReference
    @OneToMany(cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
    private List<Item> items;

    @JsonManagedReference(value = "inventory-histories")
    @OneToMany(cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
    private List<ItemHistory> itemHistories;

    public List<ItemHistory> getItemHistories() {
        return itemHistories;
    }

    public void setItemHistories(List<ItemHistory> itemHistories) {
        this.itemHistories = itemHistories;
    }

    public void addToHistory(ItemHistory history){
        if(itemHistories == null){
            this.itemHistories = new ArrayList<>();
        }
        this.itemHistories.add(history);
    }

    public void setId(Long id) {
        this.inventory_id = id;
    }

    public Long getId() {
        return inventory_id;
    }

    public void setCompany_id(Long company_id) {
        this.company_id = company_id;
    }

    public Long getCompany_id(){
        return company_id;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public String getCompany_name() {
        return company_name;
    }

    public void addItems(Item item){
        if(items == null){
            items = new ArrayList<>();
        }
        items.add(item);
    }

    public void removeItemById(Long itemId){
        this.items.removeIf(item -> (item.getId().equals(itemId)));
    }
    public void setCompany_name(String company_name) {
        this.company_name = company_name;
    }
}
