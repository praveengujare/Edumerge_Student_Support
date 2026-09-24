package com.edumerge.support.controller;

import com.edumerge.support.entity.Ticket;
import com.edumerge.support.entity.TicketStatus;
import com.edumerge.support.service.TicketService;
import com.edumerge.support.entity.TicketHistory;
import com.edumerge.support.repository.TicketHistoryRepository;
import org.springframework.web.bind.annotation.*;
import com.edumerge.support.entity.TicketHistory;
import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:5173")
public class TicketController {

    private final TicketService ticketService;
    private final TicketHistoryRepository ticketHistoryRepository;

    public TicketController(
            TicketService ticketService,
            TicketHistoryRepository ticketHistoryRepository) {

        this.ticketService = ticketService;
        this.ticketHistoryRepository = ticketHistoryRepository;
    }

    @PostMapping
    public Ticket createTicket(@RequestBody Ticket ticket) {
        return ticketService.createTicket(ticket);
    }

    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @GetMapping("/{id}")
    public Ticket getTicketById(@PathVariable Long id) {
        return ticketService.getTicketById(id);
    }

    @GetMapping("/status/{status}")
    public List<Ticket> getTicketsByStatus(
            @PathVariable TicketStatus status) {

        return ticketService.getTicketsByStatus(status);
    }

    @GetMapping("/student/{studentId}")
    public List<Ticket> getTicketsByStudent(
            @PathVariable Long studentId) {

        return ticketService.getTicketsByStudent(studentId);
    }

    @GetMapping("/staff/{staffId}")
    public List<Ticket> getTicketsByStaff(
            @PathVariable Long staffId) {

        return ticketService.getTicketsByStaff(staffId);
    }

    // UPDATE TICKET STATUS
    @PutMapping("/{id}/status")
    public Ticket updateTicketStatus(
            @PathVariable Long id,
            @RequestParam TicketStatus status,
            @RequestParam(required = false) String reason) {

        return ticketService.updateTicketStatus(id, status, reason);
    }
    
    @GetMapping("/{id}/history")
    public List<TicketHistory> getTicketHistory(
            @PathVariable Long id) {

        return ticketService.getTicketHistory(id);
    }
}