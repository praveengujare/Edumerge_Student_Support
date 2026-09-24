# EduSupport - Student Support & Ticket Management System

A full-stack student support and ticket management system built as part of the Edumerge Product Engineering Assignment.

The system allows students to raise support tickets and enables support staff to manage, assign, prioritize, track, and resolve those tickets.

---

## Problem Statement

Educational institutions receive different types of student support requests such as:

- Academic issues
- Fee/payment issues
- Technical problems
- ID card issues
- Hostel-related requests
- Transport-related requests

The objective of this system is to provide a centralized platform to create, assign, prioritize, track, and manage student support tickets.

---

## Key Features

### User Management

- Student registration
- Student login
- User roles:
  - STUDENT
  - STAFF
  - MANAGER
- User selection through dropdowns when creating tickets

### Ticket Management

- Create support tickets
- Assign tickets to students
- Assign tickets to support staff
- Categorize tickets
- Set ticket priority
- Track ticket status
- View ticket details
- View ticket history

### Ticket Status Workflow

Tickets can move through the following states:

OPEN
↓
IN_PROGRESS
↓
PENDING
↓
RESOLVED
↓
CLOSED

Status changes are recorded in the ticket history.

### Priority Levels

- LOW
- MEDIUM
- HIGH
- CRITICAL

### SLA Management

Different priorities have different SLA durations:

| Priority | SLA |
|----------|-----|
| LOW | 72 hours |
| MEDIUM | 48 hours |
| HIGH | 24 hours |
| CRITICAL | 4 hours |

The system calculates a due time when a ticket is created.

### Dashboard

The dashboard provides:

- Total tickets
- Open tickets
- In-progress tickets
- Pending tickets
- Resolved tickets
- Closed tickets
- Overdue tickets
- Priority-wise ticket counts

### Ticket History

Important ticket activities are recorded, including:

- Ticket creation
- Status changes

This provides an audit trail for support operations.

---

# Technology Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router

## Backend

- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate

## Database

- MySQL

## Development Tools

- Eclipse
- MySQL Workbench
- Postman
- VS Code
- Git / GitHub

---

# System Architecture

```text
                React Frontend
                     |
                     |
                  Axios
                     |
                     ↓
             Spring Boot REST API
                     |
          -------------------------
          |           |           |
      Controller   Service    Repository
          |           |           |
          -------------------------
                     |
                   JPA
                     |
                     ↓
                  MySQL


**## Future Scope**

The current implementation focuses on delivering the core Student Support & Ticket Management workflow within the available development time.

The following improvements are planned for a production-ready version:

## 1. Role-Based Access Control

Implement role-based access control for:

- STUDENT
- STAFF
- MANAGER

Expected access model:

### Student

- Create support tickets
- View own tickets
- View ticket status
- View ticket history
- Add additional information to own tickets

### Staff

- View assigned tickets
- Update ticket status
- Manage ticket priority
- Add resolution details
- View ticket history
- Handle pending actions

### Manager

- View all tickets
- View dashboard and analytics
- Assign/reassign tickets
- Monitor SLA breaches
- Review ageing tickets
- Manage escalation workflows

---

## 2. JWT Authentication

Replace the current prototype login mechanism with secure JWT-based authentication.

Planned flow:

```text
Login
  ↓
Spring Security
  ↓
Validate credentials
  ↓
Generate JWT
  ↓
React stores authentication state
  ↓
JWT sent with API requests
  ↓
Backend validates JWT
  ↓
Allow / deny access based on role



##AI-Based Ticket Classification##


Student:
"I paid my semester fee but the portal still shows unpaid."

        ↓

AI Classification

Category: Fees
Priority: HIGH
Suggested Team: Finance