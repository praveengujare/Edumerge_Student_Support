package com.edumerge.support.service;

import com.edumerge.support.entity.Ticket;
import com.edumerge.support.entity.TicketStatus;
import com.edumerge.support.entity.User;
import com.edumerge.support.repository.TicketRepository;
import com.edumerge.support.repository.UserRepository;
import com.edumerge.support.entity.TicketHistory;
import com.edumerge.support.repository.TicketHistoryRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final TicketHistoryRepository ticketHistoryRepository;
    public TicketService(
            TicketRepository ticketRepository,
            UserRepository userRepository,
            TicketHistoryRepository ticketHistoryRepository) {

        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
        this.ticketHistoryRepository = ticketHistoryRepository;
    }

    public Ticket createTicket(Ticket ticket) {

        System.out.println("TITLE = " + ticket.getTitle());
        System.out.println("CATEGORY = " + ticket.getCategory());
        System.out.println("PRIORITY = " + ticket.getPriority());

        // Fetch existing student
        if (ticket.getStudent() != null) {

            Long studentId = ticket.getStudent().getId();

            User student = userRepository.findById(studentId)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Student not found with id: " + studentId));

            ticket.setStudent(student);
        }

        // Fetch existing staff
        if (ticket.getAssignedTo() != null) {

            Long staffId = ticket.getAssignedTo().getId();

            User staff = userRepository.findById(staffId)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Staff not found with id: " + staffId));

            ticket.setAssignedTo(staff);
        }

        // Set status and timestamps
        ticket.setStatus(TicketStatus.OPEN);

        LocalDateTime now = LocalDateTime.now();

        ticket.setCreatedAt(now);
        ticket.setUpdatedAt(now);

        // Calculate SLA
        LocalDateTime dueAt;

        switch (ticket.getPriority()) {

            case LOW:
                dueAt = now.plusHours(72);
                break;

            case MEDIUM:
                dueAt = now.plusHours(48);
                break;

            case HIGH:
                dueAt = now.plusHours(24);
                break;

            case CRITICAL:
                dueAt = now.plusHours(4);
                break;

            default:
                dueAt = now.plusHours(48);
                break;
        }

        ticket.setDueAt(dueAt);

        System.out.println("CREATED AT = " + ticket.getCreatedAt());
        System.out.println("DUE AT = " + ticket.getDueAt());

        Ticket savedTicket = ticketRepository.save(ticket);

        TicketHistory history = new TicketHistory(
                savedTicket,
                "CREATED",
                "Ticket created",
                LocalDateTime.now()
        );

        ticketHistoryRepository.save(history);

        return savedTicket;
    }
    
    
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Ticket getTicketById(Long id) {
        return ticketRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Ticket not found with id: " + id));
    }

    public List<Ticket> getTicketsByStatus(TicketStatus status) {
        return ticketRepository.findByStatus(status);
    }

    public List<Ticket> getTicketsByStudent(Long studentId) {
        return ticketRepository.findByStudentId(studentId);
    }

    public List<Ticket> getTicketsByStaff(Long staffId) {
        return ticketRepository.findByAssignedToId(staffId);
    }
    
    
    
    public Ticket updateTicketStatus(
            Long ticketId,
            TicketStatus newStatus,
            String reason) {

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Ticket not found with id: " + ticketId));

        TicketStatus oldStatus = ticket.getStatus();

        ticket.setStatus(newStatus);

        if (newStatus == TicketStatus.PENDING) {
            ticket.setPendingReason(reason);
        } else {
            ticket.setPendingReason(null);
        }

        LocalDateTime now = LocalDateTime.now();

        ticket.setUpdatedAt(now);

        Ticket savedTicket = ticketRepository.save(ticket);

        String description;

        if (newStatus == TicketStatus.PENDING && reason != null) {
            description = "Status changed from "
                    + oldStatus
                    + " to "
                    + newStatus
                    + ". Reason: "
                    + reason;
        } else {
            description = "Status changed from "
                    + oldStatus
                    + " to "
                    + newStatus;
        }

        TicketHistory history = new TicketHistory(
                savedTicket,
                "STATUS_CHANGED",
                description,
                now
        );

        ticketHistoryRepository.save(history);

        return savedTicket;
    }
    
    
    public List<TicketHistory> getTicketHistory(Long ticketId) {

        return ticketHistoryRepository
                .findByTicketIdOrderByCreatedAtAsc(ticketId);
    }
}