package com.ktnet.mobilebiz.service;

import com.google.common.collect.ImmutableList;
import com.ktnet.mobilebiz.model.Booking;
import com.ktnet.mobilebiz.repo.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    BookingRepository bookingRepository;

    //자원 예약 목록 조회
    @Transactional(readOnly = true, isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
    public List<Booking> selectBookingList() {
        return ImmutableList.copyOf(bookingRepository.findAll());
    }

    //예약번호로 자원 예약 조회
    @Transactional(readOnly = true, isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
    public Optional<Booking> selectBookingByBookingNo(Long bookingNo) {
        return bookingRepository.findById(bookingNo);
    }

    //날짜별 자원 예약 조회
    @Transactional(readOnly = true, isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
    public List<Booking> selectBookingByBookingDay(String bookingDay) {
        System.out.println("*" + bookingDay);
        return bookingRepository.findByBookingDay(bookingDay);
    }

    //해당 날짜, 룸 이름으로 예약된 자원 예약건 조회
    @Transactional(readOnly = true, isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
    public List<Booking> selectBookingByBookingDayAndRoomName(String bookingDay, String roomName) {
        System.out.println("*" + bookingDay + "," + roomName);
        return bookingRepository.findByBookingDayAndRoomName(bookingDay, roomName);
    }

    //예약자 id별 자원 예약 조회
    @Transactional(readOnly = true, isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
    public List<Booking> selectBookingByReservedId(String reservedId) {
        System.out.println("*" + reservedId);
        return bookingRepository.findByReservedId(reservedId);
    }

    //자원 예약 등록
    @Transactional(readOnly = false, isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
    public void insertBooking(Booking booking) {
        bookingRepository.save(booking);
    }

    //자원 예약 수정
    @Transactional(readOnly = false, isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
    public void updateBooking(Booking booking) {
        bookingRepository.save(booking);
    }

    //자원 예약 삭제
    @Transactional(readOnly = false, isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
    public void deleteBooking(Long bookingNo) {
        bookingRepository.deleteById(bookingNo);
    }

}

