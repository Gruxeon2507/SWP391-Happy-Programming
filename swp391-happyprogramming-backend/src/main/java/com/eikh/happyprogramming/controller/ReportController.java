package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.model.Report;
import com.eikh.happyprogramming.repository.ReportRepository;
import com.eikh.happyprogramming.services.ReportServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/reports")
public class ReportController {
    @Autowired
    ReportServices reportServices;

    @Autowired
    ReportRepository reportRepository;

    @GetMapping("/")
    public List<Report> getAllReports() {
        List<Report> reports = reportServices.getAllReports();
        for (Report r : reports) {
//            System.out.println("OBJ: " + r.g);
        }
        return reportServices.getAllReports();
    }

    @GetMapping("/find/by-username/{username}")
    public List<Report> getReportsToUser(@PathVariable("username") String username){
        return reportRepository.findAllByComment_User_Username(username);
    }
    @GetMapping("/count/by-username/{username}")
    public int countReportsToUser(@PathVariable("username") String username){
        return reportRepository.countAllByComment_User_Username(username);
    }
}
