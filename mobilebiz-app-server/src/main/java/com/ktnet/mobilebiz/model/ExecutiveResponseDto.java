package com.ktnet.mobilebiz.model;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@NoArgsConstructor
@Getter
public class ExecutiveResponseDto implements Serializable {

    private String ExecutiveId;
    private String ExecutiveName;
    private String ExecutivePhone;
    private String ExecutiveRank;
    private String ExecutiveDept;
    private String state;
    private String description;
    private Long ExecutiveNo;


    public ExecutiveResponseDto(Executive executive) {
        ExecutiveNo = executive.getExecutiveNo();
        ExecutiveId = executive.getExecutiveId();
        ExecutivePhone = executive.getExecutivePhone();
        ExecutiveDept = executive.getExecutiveDept();
        ExecutiveRank = executive.getExecutiveRank();
        ExecutiveName = executive.getExecutiveName();
        state = executive.getState();
        description = executive.getDescription();
    }

}
