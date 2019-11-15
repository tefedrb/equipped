package com.example.usersapi.Model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "inventories")
public class Inventory {
    @Id
    @GeneratedValue
    private long inventory_id;

    @OneToMany(mappedBy = "inventory", cascade = {CascadeType.PERSIST, CascadeType.DETACH,
            CascadeType.MERGE, CascadeType.REFRESH})
    @Column
    private List<Kit> kits;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    public void setCompany(Company company) {
        this.company = company;
    }

    public Company getCompany() {
        return company;
    }

    public List<Kit> getKits() {
        return kits;
    }

    public void setKits(List<Kit> kits) {
        this.kits = kits;
    }

    public void setInventory_id(long inventory_id) {
        this.inventory_id = inventory_id;
    }

    public long getInventory_id() {
        return inventory_id;
    }
}
