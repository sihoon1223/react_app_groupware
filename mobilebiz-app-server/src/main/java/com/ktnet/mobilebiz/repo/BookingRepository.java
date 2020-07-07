package com.ktnet.mobilebiz.repo;

import com.ktnet.mobilebiz.model.Booking;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BookingRepository extends CrudRepository<Booking, Long> {
    List<Booking> findByBookingDay(String bookingDay);

    List<Booking> findByReservedId(String reservedId);

    List<Booking> findByBookingDayAndRoomName(String bookingDay, String roomName);
}
