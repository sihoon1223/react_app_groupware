package com.ktnet.mobilebiz.model;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Getter
@NoArgsConstructor
@Table(name = "executive_state")
public class ExecutiveState {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "no")
    private Long no;

    @Column(name = "executive_state")
    private String ExecutiveState;


    @Builder
    public ExecutiveState(Long no, String ExecutiveState) {
        this.no = no;
        this.ExecutiveState = ExecutiveState;
    }


}
