package com.edumerge.support.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edumerge.support.entity.TicketHistory;

public interface TicketHistoryRepository
        extends JpaRepository<TicketHistory, Long> {

    List<TicketHistory> findByTicketIdOrderByCreatedAtAsc(Long ticketId);

}