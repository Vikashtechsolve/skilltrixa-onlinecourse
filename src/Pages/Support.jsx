import { useEffect, useMemo, useState } from "react";
import {
  CircleCheckBig,
  CircleDot,
  MessageSquareMore,
  Plus,
  TicketCheck,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getSupportTickets,
  updateSupportTicketStatus,
} from "../utils/supportTickets";

export default function Support() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("Unresolved");
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    setTickets(getSupportTickets());
  }, []);

  const unresolvedCount = useMemo(
    () => tickets.filter((ticket) => ticket.status === "Unresolved").length,
    [tickets]
  );
  const resolvedCount = useMemo(
    () => tickets.filter((ticket) => ticket.status === "Resolved").length,
    [tickets]
  );

  const visibleTickets = tickets.filter((ticket) => ticket.status === activeTab);

  const handleMarkResolved = (ticketId) => {
    const updated = updateSupportTicketStatus(ticketId, "Resolved");
    setTickets(updated);
  };

  const handleReopenTicket = (ticketId) => {
    const updated = updateSupportTicketStatus(ticketId, "Unresolved");
    setTickets(updated);
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
        <span className="font-medium text-slate-700">Support / Help</span>
      </div>

      {location.state?.created && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 px-4 py-3 text-sm">
          Ticket created successfully. Our support team will respond soon.
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              Support / Help
            </h1>
            <p className="text-slate-600 mt-1">
              Raise and track your support tickets in one place.
            </p>
          </div>
          <button
            onClick={() => navigate("/support/create-ticket")}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <Plus size={16} />
            Create Ticket
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
          <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
            <p className="text-xs text-slate-500">Total Tickets</p>
            <p className="text-xl font-semibold text-slate-900">{tickets.length}</p>
          </div>
          <div className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3">
            <p className="text-xs text-slate-500">Unresolved</p>
            <p className="text-xl font-semibold text-amber-700">
              {unresolvedCount}
            </p>
          </div>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
            <p className="text-xs text-slate-500">Resolved</p>
            <p className="text-xl font-semibold text-emerald-700">
              {resolvedCount}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-100 rounded-xl p-1 inline-flex">
        <button
          onClick={() => setActiveTab("Unresolved")}
          className={`px-5 py-2.5 text-sm rounded-lg transition cursor-pointer ${
            activeTab === "Unresolved"
              ? "bg-white text-slate-900 font-medium shadow-sm"
              : "text-slate-600"
          }`}
        >
          Unresolved ({unresolvedCount})
        </button>
        <button
          onClick={() => setActiveTab("Resolved")}
          className={`px-5 py-2.5 text-sm rounded-lg transition cursor-pointer ${
            activeTab === "Resolved"
              ? "bg-white text-slate-900 font-medium shadow-sm"
              : "text-slate-600"
          }`}
        >
          Resolved ({resolvedCount})
        </button>
      </div>

      <div className="space-y-4">
        {visibleTickets.length > 0 ? (
          visibleTickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => navigate(`/support/ticket/${ticket.id}`)}
              className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-medium rounded-full bg-white border border-slate-200 px-2.5 py-1 text-slate-600">
                      <TicketCheck size={13} />
                      {ticket.id}
                    </span>
                    <span
                      className={`text-xs font-medium rounded-full px-2.5 py-1 ${
                        ticket.status === "Resolved"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900">
                    {ticket.title}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {ticket.description}
                  </p>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                    <p>
                      <span className="font-medium">Course:</span> {ticket.course}
                    </p>
                    <p>
                      <span className="font-medium">Category:</span>{" "}
                      {ticket.category}
                    </p>
                    <p>
                      <span className="font-medium">Created:</span>{" "}
                      {ticket.createdAt}
                    </p>
                    {ticket.attachmentName && (
                      <p>
                        <span className="font-medium">Attachment:</span>{" "}
                        {ticket.attachmentName}
                      </p>
                    )}
                  </div>
                </div>

                {ticket.status === "Unresolved" ? (
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      handleMarkResolved(ticket.id);
                    }}
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <CircleCheckBig size={16} />
                    Mark Resolved
                  </button>
                ) : (
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      handleReopenTicket(ticket.id);
                    }}
                    className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <CircleDot size={16} />
                    Reopen
                  </button>
                )}
                <button
                  onClick={() => navigate(`/support/ticket/${ticket.id}`)}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  <MessageSquareMore size={15} />
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="text-slate-600 text-sm">
              No tickets found in {activeTab.toLowerCase()} list.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
