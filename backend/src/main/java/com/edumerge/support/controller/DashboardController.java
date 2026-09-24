package com.edumerge.support.controller;

import com.edumerge.support.service.DashboardService;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(
            DashboardService dashboardService) {

        this.dashboardService = dashboardService;
    }

    @GetMapping("/summary")
    public Map<String, Object> getSummary() {

        return dashboardService.getSummary();
    }

    @GetMapping("/priority")
    public Map<String, Long> getPrioritySummary() {

        return dashboardService.getPrioritySummary();
    }
}