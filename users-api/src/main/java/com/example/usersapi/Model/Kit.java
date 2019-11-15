package com.example.usersapi.Model;

import javax.persistence.*;

@Entity
@Table(name = "Kits")
public class Kit {
    @Id
    @GeneratedValue
    private long inventory_id;

    @Column(unique = true)
    private String camera;

    @Column
    private String audio;

    @Column
    private String lights;

    @Column
    private String grips;

//    @OneToOne
//    @JoinColumn(name = "kit_inventory")
//    private Inventory inventory;
}
