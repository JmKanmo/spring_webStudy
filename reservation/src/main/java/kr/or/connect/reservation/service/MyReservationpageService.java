package kr.or.connect.reservation.service;

import java.util.List;

import kr.or.connect.reservation.dto.BookingHistory;
import kr.or.connect.reservation.dto.TicketHistory;

public interface MyReservationpageService {
	List<BookingHistory> getBookingHistory(String email);

	BookingHistory getBookingHistory(int reservationId);

	List<TicketHistory> getTicketHistory(int reservationInfoId);

	int getReservationCount(String email);

	int cancelReservation(int reservationInfoId);
}
