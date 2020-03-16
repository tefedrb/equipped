package com.example.equipmentapi.models;
import javax.persistence.*;

@Entity
@Table(name = "items")
public class Item {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String prodLink;

    @Column
    private String image;

    @Column(unique = true)
    private String product;

    @Column
    private String value;

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
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getProduct(){
        return product;
    }

    public void setProduct(String name){
        this.product = name;
    }

    public String getValue(){
        return value;
    }

    public void setValue(String value){
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
