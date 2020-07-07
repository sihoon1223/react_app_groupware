package com.ktnet.mobilebiz.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Getter
@ToString
@NoArgsConstructor
public class ExecutiveUpdateRequestDto {


    //private Long ExecutiveNo;

    private
    String executiveId;
    private
    String executiveName;
    private
    String executivePhone;
    private
    String executiveRank;
    private
    String executiveDept;
    private
    String state;
    private
    String description;
    // private Image
    // @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "executive")
    //private ExecutiveState executiveState;

    @Builder
    public ExecutiveUpdateRequestDto(String ExecutiveID, String ExecutiveName, String ExecutivePhone, String ExecutiveRank, String ExecutiveDept, String state, String description) {
        executiveId = ExecutiveID;
        executiveName = ExecutiveName;
        executivePhone = ExecutivePhone;
        executiveRank = ExecutiveRank;
        executiveDept = ExecutiveDept;
        this.state = state;
        this.description = description;
    }
}
