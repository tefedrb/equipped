package com.example.equipmentapi.models;

import javax.persistence.*;

@Entity
@Table(name = "sub_categories")
public class SubCategory {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    // There MIGHT be a problem with naming the column here the same
    // as it's done in our item model
    @ManyToOne(cascade = {CascadeType.DETACH,
        CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    public SubCategory(){};

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

    public Category getCategory(){
        return category;
    }

    public void setCategory(Category category){
        this.category = category;
    }
}
