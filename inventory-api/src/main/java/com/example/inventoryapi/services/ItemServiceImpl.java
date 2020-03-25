package com.example.inventoryapi.services;

import com.example.inventoryapi.models.Item;
import com.example.inventoryapi.repositories.ItemRepository;
import com.fasterxml.jackson.databind.util.JSONWrappedObject;
import com.google.api.client.http.GenericUrl;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestFactory;
import com.google.api.client.http.javanet.NetHttpTransport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    ItemRepository itemRepository;

    @Override
    public Iterable<Item> listItems() {
        return itemRepository.findAll();
    }

//    @Override
//    public ListenableFuture<Response> getItem(String serial_num) {
//        // Need to make this asynchronous
////        new Thread(new Runnable(){
////            public void run(){
////
////            }
////        }).start();
//
//        // Build an HTTP client
//        String url = "http://localhost:8181/item/" + serial_num;
//        DefaultAsyncHttpClientConfig.Builder clientBuilder = Dsl.config();
//        AsyncHttpClient client = Dsl.asyncHttpClient(clientBuilder);
//
//        BoundRequestBuilder getRequest = client.prepareGet(url);
//        return getRequest.execute(new AsyncCompletionHandler<Response>() {
//            @Override
//            public Response onCompleted(Response response) throws Exception {
//                System.out.println(response.toString());
//                return response;
//            }
//        });
//    }

//    @Override
//    public Item getItem(String serial_num){
//        HttpRequestFactory requestFactory = new NetHttpTransport().createRequestFactory();
//        String url = "http://localhost:8181/items/" + serial_num;
//        try {
//            HttpRequest request = requestFactory.buildGetRequest(new GenericUrl(url));
//            String rawResponse = request.execute().parseAsString();
//
//        }
//        catch(Exception e) {
//            System.out.println("Error in getItem() " + e);
//        }
//    }

    @Override
    public Item getItem(Long serial_num){
        ItemRetrieval itemRetrieval = new ItemRetrieval();
       return itemRetrieval.run(serial_num);
    }
}
