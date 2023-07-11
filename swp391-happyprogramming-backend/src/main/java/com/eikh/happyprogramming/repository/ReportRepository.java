package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.Report;
import com.eikh.happyprogramming.modelkey.ReportKey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, ReportKey> {
    public List<Report> findAllByComment_User_Username(String username);

    public int countAllByComment_User_Username(String username);
}
