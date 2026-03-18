import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MessageSquareMore, RotateCcw, SendHorizontal } from "lucide-react";
import {
  addSupportTicketReply,
  getSupportTicketById,
  updateSupportTicketStatus,
} from "../utils/supportTickets";

export default function SupportTicketDetails() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);

  useEffect(() => {
    const found = getSupportTicketById(ticketId);
    setTicket(found);
    setShowReplyInput(found?.status === "Unresolved");
  }, [ticketId]);

  if (!ticket) {
    return (
      <div className="p-4 md:p-6 lg:p-8 bg-slate-50 min-h-full">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 text-center">
          <p className="text-slate-700 mb-4">Ticket not found.</p>
          <button
            onClick={() => navigate("/support")}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          >
            Back to Support
          </button>
        </div>
      </div>
    );
  }

  const handleStatusChange = (status) => {
    updateSupportTicketStatus(ticket.id, status);
    const updated = addSupportTicketReply(
      ticket.id,
      status === "Resolved"
        ? "Your ticket has been marked as resolved by support. Please reopen if you still need help."
        : "Your ticket has been reopened. Our support team will continue assisting you.",
      { sender: "admin" }
    );
    setTicket(updated ?? ticket);
    setShowReplyInput(status === "Unresolved");
  };

  const handleReplySubmit = async (event) => {
    event.preventDefault();
    if (!replyText.trim()) {
      setError("Please write your message before sending.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    const updated = addSupportTicketReply(ticket.id, replyText.trim(), {
      sender: "student",
      reopen: false,
    });

    await new Promise((resolve) => setTimeout(resolve, 300));
    setTicket(updated);
    setReplyText("");
    setIsSubmitting(false);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-slate-50 min-h-full space-y-6">
      <div className="text-sm flex items-center gap-2 text-slate-500">
        <Link
          to="/dashboard"
          className="hover:text-blue-600 transition-colors cursor-pointer"
        >
          Dashboard
        </Link>
        <span>/</span>
        <Link
          to="/support"
          className="hover:text-blue-600 transition-colors cursor-pointer"
        >
          Support / Help
        </Link>
        <span>/</span>
        <span className="font-medium text-slate-700">{ticket.id}</span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              {ticket.title}
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              {ticket.course} | {ticket.category} | Created {ticket.createdAt}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-xs font-medium rounded-full px-2.5 py-1 ${
                ticket.status === "Resolved"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {ticket.status}
            </span>
            {ticket.status === "Unresolved" ? (
              <button
                onClick={() => handleStatusChange("Resolved")}
                className="text-sm px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
              >
                Mark Resolved
              </button>
            ) : (
              <button
                onClick={() => handleStatusChange("Unresolved")}
                className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
              >
                <RotateCcw size={14} />
                Reopen
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50/60 shadow-sm p-5 space-y-4">
        <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
          <MessageSquareMore size={16} />
          Conversation
        </div>

        <div className="space-y-3">
          {ticket.messages.map((message) => (
            <div
              key={message.id}
              className={`rounded-xl border p-4 ${
                message.sender === "admin"
                  ? "bg-white border-blue-200"
                  : "bg-violet-50 border-violet-200"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <p
                  className={`text-xs font-semibold uppercase tracking-wide ${
                    message.sender === "admin" ? "text-blue-700" : "text-violet-700"
                  }`}
                >
                  {message.sender === "admin" ? "Support Admin" : "You"}
                </p>
                <p
                  className={`text-xs ${
                    message.sender === "admin" ? "text-slate-500" : "text-violet-600"
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
              <p
                className={`text-sm leading-relaxed mt-2 ${
                  message.sender === "admin" ? "text-slate-700" : "text-slate-800"
                }`}
              >
                {message.text}
              </p>
              {message.attachmentName && (
                <p
                  className={`text-xs mt-2 ${
                    message.sender === "admin" ? "text-slate-500" : "text-violet-700"
                  }`}
                >
                  Attachment: {message.attachmentName}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {showReplyInput ? (
        <form
          onSubmit={handleReplySubmit}
          className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 space-y-3"
        >
          <label className="text-sm font-medium text-slate-800">Reply</label>
          <textarea
            rows="4"
            value={replyText}
            onChange={(event) => setReplyText(event.target.value)}
            placeholder="Write your response or additional details..."
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <SendHorizontal size={14} />
            {isSubmitting ? "Sending..." : "Send Reply"}
          </button>
        </form>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
          <p className="text-sm text-slate-600">
            This ticket is resolved. Reopen the ticket to send a new message.
          </p>
          <button
            onClick={() => handleStatusChange("Unresolved")}
            className="mt-3 inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
          >
            <RotateCcw size={14} />
            Reopen Ticket
          </button>
        </div>
      )}
    </div>
  );
}
