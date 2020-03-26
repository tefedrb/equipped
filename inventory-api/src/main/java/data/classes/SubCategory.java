package data.classes;

import com.google.api.client.util.Key;

public class SubCategory {
    @Key("id")
    Long id;

    @Key("name")
    String name;

    public Long getId() {
        return id;
    }

    public String getName(){
        return name;
    }
}
