package com.eikh.happyprogramming.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@Entity
@Table(name = "ReportType")
public class ReportType implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reportTypeId;
    private String reportName;
    private String reportDescription;

    @OneToMany(mappedBy = "reportType")
    @JsonIgnore
    private List<Report> reports;

}
