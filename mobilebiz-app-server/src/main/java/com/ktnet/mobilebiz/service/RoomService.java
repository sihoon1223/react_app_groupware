package com.ktnet.mobilebiz.service;

import com.google.common.collect.ImmutableList;
import com.ktnet.mobilebiz.model.Room;
import com.ktnet.mobilebiz.repo.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RoomService {
    @Autowired
    RoomRepository roomRepository;

    //자원 예약 목록 조회
    @Transactional(readOnly = true, isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
    public List<Room> selectRoomList() {
        return ImmutableList.copyOf(roomRepository.findAll());
    }

}

