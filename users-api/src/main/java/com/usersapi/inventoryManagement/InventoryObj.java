package com.usersapi.inventoryManagement;

public class InventoryObj {

//    @Key
    private String company_name;

//    @Key
    private Long company_id;

    public InventoryObj(){}

    public InventoryObj(String company_name, Long company_id) {
        this.setCompany_name(company_name);
        this.setCompany_id(company_id);
    }

    public void setCompany_id(Long company_id) {
        this.company_id = company_id;
    }

    public Long getCompany_id() {
        return company_id;
    }

    public void setCompany_name(String name) {
        this.company_name = name;
    }

    public String getCompany_name() {
        return company_name;
    }
}
