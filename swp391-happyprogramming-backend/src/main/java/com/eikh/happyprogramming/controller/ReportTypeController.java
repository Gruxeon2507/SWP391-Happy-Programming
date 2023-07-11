package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.model.ReportType;
import com.eikh.happyprogramming.repository.ReportRepository;
import com.eikh.happyprogramming.repository.ReportTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/report-types")
public class ReportTypeController {
    @Autowired
    ReportTypeRepository reportTypeRepository;
    @GetMapping("/")
    public List<ReportType> getAllReportTypes(){
        return reportTypeRepository.findByOrderByReportTypeIdDesc();
    }
}
