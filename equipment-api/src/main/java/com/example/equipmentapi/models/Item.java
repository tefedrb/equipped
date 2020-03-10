package com.example.equipmentapi.models;
import javax.persistence.*;

@Entity
@Table(name = "inventory")
public class Item {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    @Column
    private String price;

    @Column
    private String category;

    @Column
    private String subCategory;

    @Column
    private String imgLink;

    @Column
    private String itemLink;

    public Item(){};

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getPrice(){
        return price;
    }

    public void setPrice(String price){
        this.price = price;
    }

    public String getCategory(){
        return category;
    }

    public void setCategory(String category){
        this.category = category;
    }

    public String getSubCategory(){
        return subCategory;
    }

    public void setSubCategory(String category){
        this.category = category;
    }

    public String getImgLink(){
        return imgLink;
    }

    public void setImgLink(String imgLink){
        this.imgLink = imgLink;
    }

    public String getItemLink(){
        return itemLink;
    }

    public void setItemLink(String itemLink){
        this.itemLink = itemLink;
    }
}
