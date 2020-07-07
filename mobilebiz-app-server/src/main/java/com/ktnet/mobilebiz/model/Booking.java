package com.ktnet.mobilebiz.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;


@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor //파라미터가 없는 기본 생성자를 생성해줌
public class Booking implements Serializable { //Serializable: 직렬화

    @Id //기본키 직접할당
    @GeneratedValue(strategy = GenerationType.IDENTITY) //기본키 자동 생성 전략 - 데이터베이스에 위임
    @Column(name = "booking_no")
    private Long bookingNo;

    @Column(name = "reserved_name")
    private String reservedName;

    @Column(name = "reserved_id")
    private String reservedId;

    @Column(name = "booking_day")
    private String bookingDay;

    @Column(name = "room_name")
    private String roomName;

    @Column(name = "start_time")
    private String startTime;

    @Column(name = "end_time")
    private String endTime;

    @Column(name = "description")
    private String description;

    @Builder
    public Booking(String reservedName, String reservedId, String bookingDay, String roomName, String startTime, String endTime, String description) {
        this.reservedName = reservedName;
        this.reservedId = reservedId;
        this.bookingDay = bookingDay;
        this.roomName = roomName;
        this.startTime = startTime;
        this.endTime = endTime;
        this.description = description;
    }
}