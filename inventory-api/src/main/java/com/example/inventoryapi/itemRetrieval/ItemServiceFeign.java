package com.example.inventoryapi.itemRetrieval;

import data.classes.ItemFromJson;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "equipment-api")
public interface ItemServiceFeign {
    @GetMapping("/item/{serial_num}")
    ItemFromJson getItemBySerial(@PathVariable Long serial_num);
}
