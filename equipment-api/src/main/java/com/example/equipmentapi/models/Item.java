package com.example.equipmentapi.models;
import javax.persistence.*;

@Entity
@Table(name = "items")
public class Item {
    @Id
    @Column(name = "serial_num")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serial_num;

    @Column(name = "prodLink")
    private String prodLink;

    @Column(name = "image")
    private String image;

    @Column(unique = true)
    private String product;

    @Column(name = "value")
    private float value;

    @ManyToOne(cascade = {CascadeType.DETACH,
        CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne(cascade = {CascadeType.DETACH,
        CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "sub_category_id")
    private SubCategory subCategory;

    public Item(){};

    public Long getId(){
        return serial_num;
    }

    public void setId(Long serial_num){
        this.serial_num = serial_num;
    }

    public String getProduct(){
        return product;
    }

    public void setProduct(String name){
        this.product = name;
    }

    public float getValue(){
        return value;
    }

    public void setValue(float value){
        this.value = value;
    }

    public Category getCategory(){
        return category;
    }

    public void setCategory(Category category){
        this.category = category;
    }

    public SubCategory getSubCategory(){
        return subCategory;
    }

    public void setSubCategory(SubCategory subCategory){
        this.subCategory = subCategory;
    }

    public String getImage(){
        return image;
    }

    public void setImage(String image){
        this.image = image;
    }

    public String getProdLink(){
        return prodLink;
    }

    public void setProdLink(String prodLink){
        this.prodLink = prodLink;
    }
}
