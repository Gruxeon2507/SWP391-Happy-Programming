package com.eikh.happyprogramming.modelkey;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Embeddable;
import java.io.Serializable;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class ReportKey implements Serializable {

    private int commentId;
    private String reportedBy;
}
