package com.eikh.happyprogramming.utils;

import java.util.concurrent.TimeUnit;

/**
 *
 * @author giangpt
 */
public class DateUtils {
    public static boolean isExpired(java.sql.Date date) {
    // Convert the sql.Date to a java.util.Date
    java.util.Date expirationDate = new java.util.Date(date.getTime());
    
    // Calculate the difference in milliseconds between the current date/time and the expiration date/time
    long diffMillis = expirationDate.getTime() - System.currentTimeMillis();
    
    // Convert the difference to hours
    long diffHours = TimeUnit.MILLISECONDS.toHours(diffMillis);
    
    // Check if the difference is greater than 5 hours
    return (diffHours > 5);
}
}
