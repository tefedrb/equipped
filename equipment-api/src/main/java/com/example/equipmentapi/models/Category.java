package com.example.equipmentapi.models;
import javax.persistence.*;

@Entity
@Table(name = "categories")
public class Category {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String category_name;

    public Category(){};

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getName(){
        return category_name;
    }

    public void setName(String name){
        this.category_name = name;
    }
}
