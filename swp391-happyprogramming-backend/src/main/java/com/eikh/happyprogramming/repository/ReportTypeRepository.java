package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.ReportType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportTypeRepository extends JpaRepository<ReportType, Integer> {
    List<ReportType> findByOrderByReportTypeIdDesc();
}
