package com.usersapi.JSONviews;

import java.util.Date;

public class JwtView {
    private String jwt;
    private Date date;
    private Boolean valid = true;

    public Boolean getValid() {
        return valid;
    }

    public void setValid(Boolean valid) {
        this.valid = valid;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }
}
