package com.example.inventoryapi.models;

import javax.persistence.*;

@Entity
@Table(name = "inventories")
public class Inventory {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long
}
