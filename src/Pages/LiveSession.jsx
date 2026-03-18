import { Video, Bell, CalendarDays, Clock3, UserRound, Link } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

export default function LiveSessions() {
  const sessions = [
    {
      title: "State Management with Hooks",
      course: "React Development",
      mentor: "Vikash Dubey",
      date: "30 January, 2026",
      time: "1:00 PM - 2:00 PM",
      type: "Live ( Recording will be Available Soon )",
    },
    {
      title: "Arrays & Strings - Problem Solving",
      course: "Data Structures & Algorithms",
      mentor: "Vikash Dubey",
      date: "1 February, 2026",
      time: "3:00 PM - 5:00 PM",
      type: "Live + Practice",
    },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-slate-50 min-h-full space-y-6">
      <div className="text-sm flex items-center gap-2 text-slate-500">
        <RouterLink
          to="/dashboard"
          className="hover:text-blue-600 transition-colors cursor-pointer"
        >
          Dashboard
        </RouterLink>
        <span>/</span>
        <span className="font-medium text-slate-700">Live Sessions</span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Live Sessions
        </h1>
        <p className="text-slate-600 mt-1">
          Join upcoming classes, attend on time, and set reminders to stay
          consistent.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Upcoming Sessions
        </h2>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {sessions.map((session, index) => (
          <div
            key={index}
            className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex text-xs font-medium px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-100">
                  Live Session
                </span>
                <h3 className="text-slate-900 font-semibold text-xl mt-2">
                  {session.title}
                </h3>
              </div>
              <button className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-100 transition-colors cursor-pointer">
                <Link size={16} className="text-slate-600" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 text-sm text-slate-700">
              <p className="inline-flex items-center gap-2">
                <Video size={15} className="text-slate-500" />
                <span className="font-medium text-slate-800">Course:</span>{" "}
                {session.course}
              </p>
              <p className="inline-flex items-center gap-2">
                <UserRound size={15} className="text-slate-500" />
                <span className="font-medium text-slate-800">Mentor:</span>{" "}
                {session.mentor}
              </p>
              <p className="inline-flex items-center gap-2">
                <CalendarDays size={15} className="text-slate-500" />
                <span className="font-medium text-slate-800">Date:</span>{" "}
                {session.date}
              </p>
              <p className="inline-flex items-center gap-2">
                <Clock3 size={15} className="text-slate-500" />
                <span className="font-medium text-slate-800">Time:</span>{" "}
                {session.time}
              </p>
            </div>

            <p className="mt-4 text-sm text-slate-600">
              <span className="font-medium text-slate-800">Session Type:</span>{" "}
              {session.type}
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2.5 rounded-xl transition-colors font-medium cursor-pointer">
                <Video size={16} />
                Join Session
              </button>

              <button className="flex items-center gap-2 bg-amber-100 text-amber-700 hover:bg-amber-200 text-sm px-4 py-2.5 rounded-xl transition-colors font-medium cursor-pointer">
                <Bell size={16} />
                Set Reminder
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
