package com.usersapi.Service;

import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

@Service
public class DateServiceImpl implements DateService{

    @Override
    public String currentDateString(){
        SimpleDateFormat eastern = new SimpleDateFormat("MM/dd/yyyy 'at' hh:mma 'ET'");
        TimeZone etTimeZone = TimeZone.getTimeZone("America/New_York");
        eastern.setTimeZone( etTimeZone );
        Date currentDate = new Date();
        return eastern.format(currentDate.getTime());
    }
}
