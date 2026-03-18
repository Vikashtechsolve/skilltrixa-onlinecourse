const STORAGE_KEY = "student_panel_support_tickets";

const formatDate = (date = new Date()) =>
  date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const formatTime = (date = new Date()) =>
  date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

const createMessage = ({ sender, text, attachmentName = "" }) => ({
  id: `MSG-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
  sender,
  text,
  attachmentName,
  timestamp: `${formatDate()} ${formatTime()}`,
});

const defaultTickets = [
  {
    id: "TCK-1001",
    course: "React",
    category: "Technical Issue",
    title: "Unable to open lecture recording",
    description:
      "The recording for React session 3 keeps buffering and does not play after loading.",
    status: "Unresolved",
    createdAt: "24 Jan 2026",
    attachmentName: "",
    messages: [
      {
        id: "MSG-10001",
        sender: "student",
        text: "The recording for React session 3 keeps buffering and does not play after loading.",
        attachmentName: "",
        timestamp: "24 Jan 2026 09:45 AM",
      },
      {
        id: "MSG-10002",
        sender: "admin",
        text: "Thanks for reporting this. We are checking CDN playback logs for your batch and will update within 24 hours.",
        attachmentName: "",
        timestamp: "24 Jan 2026 11:10 AM",
      },
    ],
  },
  {
    id: "TCK-1002",
    course: "DSA",
    category: "Assignment",
    title: "Need clarification on recursion problem set",
    description:
      "I need guidance on expected output format for recursion assignment question 4.",
    status: "Resolved",
    createdAt: "21 Jan 2026",
    attachmentName: "",
    messages: [
      {
        id: "MSG-10003",
        sender: "student",
        text: "I need guidance on expected output format for recursion assignment question 4.",
        attachmentName: "",
        timestamp: "21 Jan 2026 04:00 PM",
      },
      {
        id: "MSG-10004",
        sender: "admin",
        text: "Please submit both the recursive function and a short explanation of time complexity. A sample output format has been posted in the assignment notes.",
        attachmentName: "",
        timestamp: "21 Jan 2026 06:20 PM",
      },
    ],
  },
];

function normalizeTickets(tickets) {
  return tickets.map((ticket) => {
    const normalized = {
      ...ticket,
      createdAt: ticket.createdAt || formatDate(),
      attachmentName: ticket.attachmentName || "",
      status:
        ticket.status === "Resolved" || ticket.status === "Unresolved"
          ? ticket.status
          : "Unresolved",
    };

    if (!Array.isArray(ticket.messages) || ticket.messages.length === 0) {
      const seedMessages = [
        createMessage({
          sender: "student",
          text: ticket.description || "Ticket raised by student.",
          attachmentName: ticket.attachmentName || "",
        }),
      ];

      if (normalized.status === "Resolved") {
        seedMessages.push(
          createMessage({
            sender: "admin",
            text: "Issue reviewed and resolved. Please reply if you need further help.",
          })
        );
      }
      normalized.messages = seedMessages;
    }

    return normalized;
  });
}

export function getSupportTickets() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTickets));
    return defaultTickets;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return defaultTickets;
    const normalized = normalizeTickets(parsed);
    saveSupportTickets(normalized);
    return normalized;
  } catch {
    return defaultTickets;
  }
}

export function saveSupportTickets(tickets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

export function createSupportTicket(ticketData) {
  const current = getSupportTickets();
  const ticket = {
    id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
    status: "Unresolved",
    createdAt: formatDate(),
    ...ticketData,
    messages: [
      createMessage({
        sender: "student",
        text: ticketData.description,
        attachmentName: ticketData.attachmentName || "",
      }),
      createMessage({
        sender: "admin",
        text: "Ticket received. Our support team is reviewing your issue and will reply shortly.",
      }),
    ],
  };
  const updated = [ticket, ...current];
  saveSupportTickets(updated);
  return ticket;
}

export function updateSupportTicketStatus(ticketId, status) {
  const current = getSupportTickets();
  const updated = current.map((ticket) =>
    ticket.id === ticketId ? { ...ticket, status } : ticket
  );
  saveSupportTickets(updated);
  return updated;
}

export function getSupportTicketById(ticketId) {
  const tickets = getSupportTickets();
  return tickets.find((ticket) => ticket.id === ticketId) ?? null;
}

export function addSupportTicketReply(ticketId, replyText, options = {}) {
  const { sender = "student", attachmentName = "", reopen = false } = options;
  const current = getSupportTickets();
  const updated = current.map((ticket) => {
    if (ticket.id !== ticketId) return ticket;

    const nextStatus = reopen ? "Unresolved" : ticket.status;
    const nextMessages = [
      ...ticket.messages,
      createMessage({
        sender,
        text: replyText,
        attachmentName,
      }),
    ];

    // Demo auto-response to show two-way conversation in UI
    if (sender === "student") {
      nextMessages.push(
        createMessage({
          sender: "admin",
          text: reopen
            ? "Thanks for reopening the ticket. We are re-checking this and will update you shortly."
            : "Thanks for the update. Our support team has received your message.",
        })
      );
    }

    return {
      ...ticket,
      status: nextStatus,
      messages: nextMessages,
    };
  });

  saveSupportTickets(updated);
  return updated.find((ticket) => ticket.id === ticketId) ?? null;
}
