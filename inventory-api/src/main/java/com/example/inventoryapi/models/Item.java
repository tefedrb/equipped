package com.example.inventoryapi.models;

import com.google.api.client.util.Key;
import data.classes.Category;

import javax.persistence.*;

@Entity
@Table(name = "items")
public class Item {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Key
    @Column(name = "serial_id")
    private Long serial_id;

    @Column(name = "available")
    private Boolean available;

    @Key
    @Column(name = "image")
    private String image;

    @Key
    @Column(name = "prodLink")
    private String prodLink;

    @Key
    @Column(name = "value")
    private float value;

    @Key
    @Column(name = "category")
    private String category;

    @Key
    @Column(name = "subCategory")
    private String subCategory;

    @OneToOne(cascade = {CascadeType.DETACH,
            CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "inventory_id")
    private Inventory inventory;

    public Item(){}

    public Item(Long serial_id,
                Boolean available,
                String image,
                String prodLink,
                float value,
                String category,
                String subCategory)
    {

        this.serial_id = serial_id;
        this.available = available;
        this.image = image;
        this.prodLink = prodLink;
        this.category = category;
        this.value = value;
        this.subCategory = subCategory;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setSerial_id(Long serial_id) {
        this.serial_id = serial_id;
    }

    public Long getSerial_id() {
        return serial_id;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public Boolean getAvailable(){
        return available;
    }

    public void setImage(String image){
        this.image = image;
    }

    public String getImage() {
        return image;
    }

    public void setProdLink(String prodLink) {
        this.prodLink = prodLink;
    }

    public String getProdLink(){
        return prodLink;
    }

    public void setValue(float value) {
        this.value = value;
    }

    public float getValue() {
        return value;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCategory(){
        return category;
    }

    public void setSubCategory(String subCategory) {
        this.subCategory = subCategory;
    }

    public String getSubCategory(){
        return subCategory;
    }

    public Inventory getInventory() {
        return inventory;
    }

    public void setInventory(Inventory inventory) {
        this.inventory = inventory;
    }
}