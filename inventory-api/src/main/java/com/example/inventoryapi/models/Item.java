package com.example.inventoryapi.models;

import com.google.api.client.util.Key;

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
    @Column(name = "link")
    private String link;

    @Key
    @Column(name = "value")
    private float value;

    @Column(name = "category")
    private String category;

    @Column(name = "sub_category")
    private String sub_category;

    @OneToOne(cascade = {CascadeType.DETACH,
            CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "inventory_id")
    private Inventory inventory;

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

    public void setProd_img(String image){
        this.image = image;
    }

    public String getProd_img() {
        return image;
    }

    public void setLink(String link){
        this.link = link;
    }

    public String getLink(){
        return link;
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

    public void setSub_category(String sub_category) {
        this.sub_category = sub_category;
    }

    public String getSub_category(){
        return sub_category;
    }

    public Inventory getInventory() {
        return inventory;
    }

    public void setInventory(Inventory inventory) {
        this.inventory = inventory;
    }
}
