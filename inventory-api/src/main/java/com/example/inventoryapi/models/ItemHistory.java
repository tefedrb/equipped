package com.example.inventoryapi.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;


@Entity
@Table(name="item_history")
public class ItemHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "unix_reserve")
    private long unix_reserve;

    @Column(name = "unix_return")
    private long unix_return;

    @Column(name = "username")
    private String username;

    @Column(name = "item_name")
    private String item_name;

    @Column(name = "reserve_date")
    private String reserve_date;

    @Column(name = "return_date")
    private String return_date;

    @JsonBackReference(value = "item-itemHistories")
    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH},
            fetch = FetchType.LAZY)
    private Item item;

    @JsonBackReference(value = "inventory-histories")
    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH},
            fetch = FetchType.LAZY)
    private Inventory inventory;

    public ItemHistory() {}

    public ItemHistory(String username, String reserve_date, long unix_reserve, Item item, String item_name, Inventory inventory) {
        this.unix_reserve = unix_reserve;
        this.username = username;
        this.reserve_date = reserve_date;
        this.item = item;
        this.item_name = item_name;
        this.inventory = inventory;
    }

    public String getItem_name() {
        return item_name;
    }

    public void setItem_name(String item_name) {
        this.item_name = item_name;
    }

    public long getUnix_reserve() {
        return unix_reserve;
    }

    public void setUnix_reserve(long unix_reserve) {
        this.unix_reserve = unix_reserve;
    }

    public long getUnix_return() {
        return unix_return;
    }

    public void setUnix_return(long unix_return) {
        this.unix_return = unix_return;
    }

    public Inventory getInventory() {
        return inventory;
    }

    public void setInventory(Inventory inventory) {
        this.inventory = inventory;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setReserve_date(String reserve_date) {
        this.reserve_date = reserve_date;
    }

    public String getReserve_date() {
        return reserve_date;
    }

    public void setReturn_date(String return_date) {
        this.return_date = return_date;
    }

    public String getReturn_date() {
        return return_date;
    }

}
