package com.ktnet.mobilebiz.model;


import lombok.*;

import javax.persistence.*;
import java.io.Serializable;


@Getter
@Setter
@Entity
@NoArgsConstructor
@ToString
@Table(name = "executive")
public class Executive implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "executive_no")
    private Long ExecutiveNo;

    private @Column(name = "executive_id")
    String executiveId;
    private @Column(name = "executive_name")
    String executiveName;
    private @Column(name = "executive_phone")
    String executivePhone;
    private @Column(name = "executive_rank")
    String executiveRank;
    private @Column(name = "executive_dept")
    String executiveDept;
    private @Column(name = "state")
    String state;
    private @Column(name = "description")
    String description;

    @Builder

    public Executive(String ExecutiveID, String ExecutiveName, String ExecutivePhone, String ExecutiveRank, String ExecutiveDept, String state, String description) {
        executiveId = ExecutiveID;
        executiveName = ExecutiveName;
        executivePhone = ExecutivePhone;
        executiveRank = ExecutiveRank;
        executiveDept = ExecutiveDept;
        this.state = state;
        this.description = description;
    }

    public void update(String state, String description) {
        this.state = state;
        this.description = description;
    }


}
