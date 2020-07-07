package com.ktnet.mobilebiz.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor //파라미터가 없는 기본 생성자를 생성해줌
public class Room implements Serializable { //Serializable: 직렬화

    @Id //기본키 직접할당
    @GeneratedValue(strategy = GenerationType.IDENTITY) //기본키 자동 생성 전략 - 데이터베이스에 위임
    @Column(name = "room_id")
    private Long room_id;

    @Column(name = "room_name")
    private String room_name;

    @Column(name = "room_floor")
    private String room_floor;

}


