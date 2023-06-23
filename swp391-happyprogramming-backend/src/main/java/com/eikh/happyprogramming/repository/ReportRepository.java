package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.Report;
import com.eikh.happyprogramming.modelkey.ReportKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, ReportKey> {
}
