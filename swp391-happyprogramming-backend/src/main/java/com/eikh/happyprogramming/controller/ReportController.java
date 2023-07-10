package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.model.Report;
import com.eikh.happyprogramming.services.ReportServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/reports")
public class ReportController {
    @Autowired
    ReportServices reportServices;

    @GetMapping("/")
    public List<Report> getAllReports() {
        List<Report> reports = reportServices.getAllReports();
        for (Report r : reports) {
//            System.out.println("OBJ: " + r.g);
        }
        return reportServices.getAllReports();
    }
}
