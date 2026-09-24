package com.edumerge.support.service;

import com.edumerge.support.entity.Priority;
import com.edumerge.support.entity.TicketStatus;
import com.edumerge.support.repository.TicketRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class DashboardService {

    private final TicketRepository ticketRepository;

    public DashboardService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public Map<String, Object> getSummary() {

        Map<String, Object> dashboard = new LinkedHashMap<>();

        long total = ticketRepository.count();

        long open =
                ticketRepository.countByStatus(TicketStatus.OPEN);

        long inProgress =
                ticketRepository.countByStatus(TicketStatus.IN_PROGRESS);

        long pending =
                ticketRepository.countByStatus(TicketStatus.PENDING);

        long resolved =
                ticketRepository.countByStatus(TicketStatus.RESOLVED);

        long closed =
                ticketRepository.countByStatus(TicketStatus.CLOSED);

        long overdue =
                ticketRepository.countByDueAtBeforeAndStatusNot(
                        LocalDateTime.now(),
                        TicketStatus.CLOSED);

        dashboard.put("totalTickets", total);
        dashboard.put("openTickets", open);
        dashboard.put("inProgressTickets", inProgress);
        dashboard.put("pendingTickets", pending);
        dashboard.put("resolvedTickets", resolved);
        dashboard.put("closedTickets", closed);
        dashboard.put("overdueTickets", overdue);

        return dashboard;
    }

    public Map<String, Long> getPrioritySummary() {

        Map<String, Long> prioritySummary =
                new LinkedHashMap<>();

        prioritySummary.put(
                "LOW",
                ticketRepository.countByPriority(Priority.LOW));

        prioritySummary.put(
                "MEDIUM",
                ticketRepository.countByPriority(Priority.MEDIUM));

        prioritySummary.put(
                "HIGH",
                ticketRepository.countByPriority(Priority.HIGH));

        prioritySummary.put(
                "CRITICAL",
                ticketRepository.countByPriority(Priority.CRITICAL));

        return prioritySummary;
    }
}