package com.example.inventoryapi.models;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "inventories")
public class Inventory {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "company_id")
    private Long company_id;

    @OneToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE,
            CascadeType.REFRESH}, fetch = FetchType.LAZY)
    private List<Item> items;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
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
}
