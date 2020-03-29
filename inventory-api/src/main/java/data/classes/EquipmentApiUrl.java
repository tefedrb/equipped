package data.classes;

import com.google.api.client.http.GenericUrl;

public class EquipmentApiUrl extends GenericUrl {
    public EquipmentApiUrl(String encodedUrl){
        super(encodedUrl);
    }
}
