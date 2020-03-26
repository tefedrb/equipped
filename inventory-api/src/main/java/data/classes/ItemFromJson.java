package data.classes;

import com.google.api.client.util.Key;

public class ItemFromJson {
    @Key("serial_num")
    private Long serial_num;

    @Key("image")
    private String image;

    @Key("prodLink")
    private String prodLink;

    @Key("value")
    private float value;

    @Key("category")
    private Category category;

    @Key("subCategory")
    private SubCategory subCategory;

    public Long getSerial_num() {
        return serial_num;
    }

    public String getImage() {
        return image;
    }

    public String getProdLink() {
        return prodLink;
    }

    public float getValue() {
        return value;
    }

    public Category getCategory() {
        return category;
    }

    public SubCategory getSubCategory() {
        return subCategory;
    }
}
