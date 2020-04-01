package com.usersapi.Model;

import javax.persistence.*;

@Entity
@Table(name = "kits")
public class Kit {
    @Id
    @GeneratedValue
    private long kit_id;

    @Column
    private String camera;

    @Column
    private String audio;

    @Column
    private String lights;

    @Column
    private String grips;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "kit_inventory")
    private Inventory inventory;

    public long getInventory_id() {
        return kit_id;
    }

    public void setInventory_id(long inventory_id) {
        this.kit_id = inventory_id;
    }

    public String getCamera() {
        return camera;
    }

    public void setCamera(String camera) {
        this.camera = camera;
    }

    public String getAudio() {
        return audio;
    }

    public void setAudio(String audio) {
        this.audio = audio;
    }

    public String getGrips() {
        return grips;
    }

    public void setGrips(String grips) {
        this.grips = grips;
    }

    public String getLights() {
        return lights;
    }

    public void setLights(String lights) {
        this.lights = lights;
    }
}
