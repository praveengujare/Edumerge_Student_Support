package com.edumerge.support.repository;

import com.edumerge.support.entity.Ticket;
import com.edumerge.support.entity.TicketStatus;
import com.edumerge.support.entity.Priority;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    List<Ticket> findByStatus(TicketStatus status);

    List<Ticket> findByStudentId(Long studentId);

    List<Ticket> findByAssignedToId(Long staffId);

    long countByStatus(TicketStatus status);

    long countByPriority(Priority priority);

    long countByDueAtBeforeAndStatusNot(
            LocalDateTime dateTime,
            TicketStatus status);
}