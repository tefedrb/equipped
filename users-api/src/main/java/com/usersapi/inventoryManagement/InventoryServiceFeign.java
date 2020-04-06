package com.usersapi.inventoryManagement;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "inventory-api")
public interface InventoryServiceFeign {
    @PostMapping("/inventory/create")
    InventoryObj createInventory(@RequestBody InventoryObj newInventory);
}
