package com.ktnet.mobilebiz.controller;

import com.ktnet.mobilebiz.model.Room;
import com.ktnet.mobilebiz.service.RoomService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Api(value = "RoomController", description = "자원 (회의실) 관련 API", basePath = "/api")
public class RoomController {
    static Logger logger = LoggerFactory.getLogger(RoomController.class);

    @Autowired
    RoomService roomService;

    @GetMapping(value = "/api/rooms", produces = MediaType.APPLICATION_JSON_VALUE) //json type의 데이터를 담고있는 요청만 처리함
    @ApiOperation(value = "자원 (회의실) 목록 조회", notes = "자원 (회의실) 목록 조회하는 API.")
    public List<Room> getRoomList() {
        logger.debug("Calling getRoomList()");
        return roomService.selectRoomList();
    }


}








