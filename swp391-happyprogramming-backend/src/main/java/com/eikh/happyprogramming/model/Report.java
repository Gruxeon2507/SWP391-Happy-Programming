package com.eikh.happyprogramming.model;

import com.eikh.happyprogramming.modelkey.ReportKey;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "Report")
public class Report implements Serializable {
    @EmbeddedId
    private ReportKey reportKey;

    private Timestamp reportTime;

    @ManyToOne
    @MapsId("commentId")
    @JoinColumn(name = "commentId")
    private Comment comment;

    @ManyToOne
    @MapsId("reportedBy")
    @JoinColumn(name = "reportedBy", referencedColumnName = "username")
    private User user;


    @ManyToOne
    @JoinColumn(name = "reportTypeId")
    private ReportType reportType;

    private String reportContent;
}
