package com.example.inventoryapi.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

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

    public ItemHistory(String username, String reserve_date, long unix_reserve, Item item, Inventory inventory) {
        this.unix_reserve = unix_reserve;
        this.username = username;
        this.reserve_date = reserve_date;
        this.item = item;
        this.inventory = inventory;
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
