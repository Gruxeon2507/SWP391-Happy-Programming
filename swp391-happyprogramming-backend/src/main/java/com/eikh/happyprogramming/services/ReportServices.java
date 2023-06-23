package com.eikh.happyprogramming.services;

import com.eikh.happyprogramming.model.Report;
import com.eikh.happyprogramming.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportServices {
    @Autowired
    ReportRepository reportRepository;

    public List<Report> getAllReports(){
        System.out.println("REPORT SERVICES CALLED");
        return reportRepository.findAll();
    }
}
