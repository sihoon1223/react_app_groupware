package com.ktnet.mobilebiz.controller;

import com.ktnet.mobilebiz.model.ApiResponseMessage;
import com.ktnet.mobilebiz.model.Booking;
import com.ktnet.mobilebiz.service.BookingService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@Api(value = "BookingController", description = "자원 예약 관련 API", basePath = "/api")
public class BookingController {
    static Logger logger = LoggerFactory.getLogger(BookingController.class);

    @Autowired
    BookingService bookingService;

    @GetMapping(value = "/bookings", produces = MediaType.APPLICATION_JSON_VALUE) //json type의 데이터를 담고있는 요청만 처리함
    @ApiOperation(value = "자원 예약 목록 조회", notes = "자원 예약 목록을 조회하는 API.")
    public List<Booking> getBookingList() {
        logger.debug("Calling getBookingList()");
        return bookingService.selectBookingList();
    }

    @GetMapping(value = "/bookings/{bookingNo}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "자원 예약 정보 조회", notes = "예약된 자원 정보를 조회하는 API. Booking entity 클래스의 bookingNo 값을 기준으로 데이터를 가져온다.")
    public Optional<Booking> getBooking(@PathVariable("bookingNo") Long bookingNo) {
        return bookingService.selectBookingByBookingNo(bookingNo);
    }

    @GetMapping(value = "/bookings/search", params = "bookingDay", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "날짜별 자원 예약 정보 조회", notes = "날짜별 예약된 자원 정보를 조회하는 API. Booking entity 클래스의 bookingDay 값을 기준으로 데이터를 가져온다.")
    public List<Booking> getBookingByBookingDay(@RequestParam("bookingDay") String bookingDay) {
        logger.debug("Calling getBookingByBookingDay()");
        return bookingService.selectBookingByBookingDay(bookingDay);

    }

    @GetMapping(value = "/bookings/search", params = "reservedId", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "예약자 id별  자원 예약 정보 조회", notes = "예약자 id별 예약된 자원 정보를 조회하는 API. Booking entity 클래스의 reservedId 값을 기준으로 데이터를 가져온다.")
    public List<Booking> getBookingByReservedId(@RequestParam("reservedId") String reservedId) {
        logger.debug("Calling getBookingByReservedId()");
        return bookingService.selectBookingByReservedId(reservedId);

    }

    @PostMapping(value = "/bookings")
    @ApiOperation(value = "자원 예약 정보 등록", notes = "자원 예약 정보를 저장하는 API. Booking entity 클래스로 데이터를 저장한다.")
    public ResponseEntity<ApiResponseMessage> insertBooking(@RequestBody Booking booking) {
        logger.debug("Calling insertBooking()");
        System.out.println("insertBooking - booking: " + booking.toString());


        ApiResponseMessage message = new ApiResponseMessage("Success", "자원 예약이 등록되었습니다.", "", "");
        ResponseEntity<ApiResponseMessage> response = new ResponseEntity<>(message, HttpStatus.OK);

        //예약 시간 검증하기 (예약을 요청한 시간에 이미 예약이 있는 경우 처리)
//        boolean timeSchedule[] = new boolean[26];
        String time[] = new String[26]; //시간 배열 (30분 단위)

        int startTime = (Integer.parseInt(booking.getStartTime().split(":")[0]) - 9) * 2;
        int endTime = (Integer.parseInt(booking.getEndTime().split(":")[0]) - 9) * 2;

        if (Integer.parseInt(booking.getEndTime().split(":")[1]) - 30 == 0) {
            endTime += 1;
        }
        if (Integer.parseInt(booking.getStartTime().split(":")[1]) - 30 == 0) {
            startTime += 1;
        }
//        System.out.println("startTime:" + startTime + ",endTime:" + endTime);
//        for (int i = startTime; i < endTime; i++) {
//            timeSchedule[i] = true;
//        }
//        for (int i = 0; i < timeSchedule.length; i++) {
//            System.out.println(i + "," + timeSchedule[i]);
//        }

        //db에 해당 날짜, 해당 룸의 스케쥴 가져오기
        boolean existTimeData[] = new boolean[26];

        List<Booking> bookingList = bookingService.selectBookingByBookingDayAndRoomName(booking.getBookingDay(), booking.getRoomName());

        System.out.println("bookingList:" + bookingList);
        for (int i = 0; i < bookingList.size(); i++) {

            int sTime = (Integer.parseInt(bookingList.get(i).getStartTime().split(":")[0]) - 9) * 2;
            int eTime = (Integer.parseInt(bookingList.get(i).getEndTime().split(":")[0]) - 9) * 2;

            if (Integer.parseInt(bookingList.get(i).getEndTime().split(":")[1]) - 30 == 0) {
                eTime += 1;
            }
            if (Integer.parseInt(bookingList.get(i).getStartTime().split(":")[1]) - 30 == 0) {
                sTime += 1;
            }
            System.out.println("sTime:" + sTime + "eTime:" + eTime);
            for (int j = sTime; j < eTime; j++) {
                existTimeData[j] = true;
            }
        }

        for (int i = 0; i < existTimeData.length; i++) {
            System.out.println(i + "," + existTimeData[i]);
        }

        System.out.println("startTime:" + startTime + "endTime:" + endTime);
        for (int i = startTime; i < endTime; i++) {
            if (existTimeData[i]) {
                System.out.println("호출");
                message = new ApiResponseMessage("Failed", "요청한 시간에 이미 예약된 자원이 있습니다.", "ERROR00004",
                        "There are already resources reserved at the requested time.");
                response = new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
                System.out.println("msg" + message.toString() + ",res:" + response.toString());
                return response;
            }

        }

        try {
            bookingService.insertBooking(booking);
        } catch (Exception ex) {
            message = new ApiResponseMessage("Failed", "자원 예약 등록에 실패하였습니다.", "ERROR00001", "Fail to registration for booking information.");
            response = new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return response;
    }

    @PutMapping(value = "/bookings")
    @ApiOperation(value = "자원 예약 정보 수정", notes = "자원 예약 정보를 수정하는 API. Booking entity 클래스로 데이터를 수정한다.<br> 이때엔 정보를 등록할 때와는 다르게 booking_no 값을 함깨 보내줘야한다.")
    public ResponseEntity<ApiResponseMessage> updateBooking(@RequestBody Booking booking) {
        ApiResponseMessage message = new ApiResponseMessage("Success", "자원 예약이 등록되었습니다.", "", "");
        ResponseEntity<ApiResponseMessage> response = new ResponseEntity<>(message, HttpStatus.OK);
        try {
            bookingService.updateBooking(booking);
        } catch (Exception ex) {
            message = new ApiResponseMessage("Failed", "자원 예약 정보 수정에 실패하였습니다.", "ERROR00002", "Fail to update for booking information.");
            response = new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return response;
    }

    @DeleteMapping(value = "/bookings/{bookingNo}")
    @ApiOperation(value = "자원 예약 정보 삭제", notes = "자원 예약 정보를 삭제하는 API. Booking entity 클래스의 bookingNo 값으로 데이터를 삭제한다.")
    public ResponseEntity<ApiResponseMessage> deleteBooking(@PathVariable("bookingNo") Long booking_no) {
        logger.debug("Calling deleteBooking()");
        ApiResponseMessage message = new ApiResponseMessage("Success", "요청하신 자원 예약 정보를 삭제하였습니다.", "", "");
        ResponseEntity<ApiResponseMessage> response = new ResponseEntity<>(message, HttpStatus.OK);
        try {
            bookingService.deleteBooking(booking_no);
        } catch (Exception ex) {
            message = new ApiResponseMessage("Failed", "자원 예약 정보 삭제에 실패하였습니다.", "ERROR00003", "Fail to remove for booking information.");
            response = new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return response;
    }
}








