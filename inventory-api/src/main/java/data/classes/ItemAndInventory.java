package data.classes;

public class ItemAndInventory {
    private Long serial_id;
    private Long inventory_id;

    public Long getSerial_id() {
        return serial_id;
    }

    public void setSerial_id(Long serial_id) {
        this.serial_id = serial_id;
    }

    public void setInventory_id(Long invetory_id) {
        this.inventory_id = invetory_id;
    }

    public Long getInventory_id(){
        return inventory_id;
    }
}
