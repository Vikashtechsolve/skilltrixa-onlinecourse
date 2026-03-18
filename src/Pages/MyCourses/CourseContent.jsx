import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import allData from "./data/reactCourseAll.json";

export default function CourseContent() {
  const { courseName } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("All");
  const [sessions, setSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSessions(allData);
  }, []);

  const formattedCourseName = (courseName ?? "")
    .split("-")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  const getBadgeStyle = (status) => {
    if (status === "Live") return "bg-red-50 text-red-700 border-red-100";
    if (status === "Completed")
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    if (status === "Recorded")
      return "bg-blue-50 text-blue-700 border-blue-100";
    return "bg-amber-50 text-amber-700 border-amber-100";
  };

  const filteredSessions = sessions
    .filter((session) => {
      if (activeTab === "All") return true;
      if (activeTab === "Upcoming") return session.status === "In Progress";
      if (activeTab === "Past") return session.status === "Completed";
      if (activeTab === "Recorded") return session.status === "Recorded";
      return false;
    })
    .filter((session) =>
      session.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
          to="/mycourses"
          className="hover:text-blue-600 transition-colors cursor-pointer"
        >
          My Courses
        </Link>
        <span>/</span>
        <Link
          to={`/course/${courseName}`}
          className="hover:text-blue-600 transition-colors cursor-pointer font-medium text-slate-700"
        >
          {formattedCourseName || "React Course"}
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 md:p-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Course Content</h1>
            <p className="text-sm text-slate-500 mt-1">
              Browse all lectures, recordings, and upcoming releases.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search lecture by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 rounded-xl bg-slate-100 p-2">
          {["All", "Upcoming", "Past", "Recorded"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 whitespace-nowrap rounded-lg text-sm transition cursor-pointer ${
                activeTab === tab
                  ? "bg-white text-slate-900 font-medium shadow-sm"
                  : "text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredSessions.length > 0 ? (
          filteredSessions.map((session) => {
            const sessionPath = `/course/${courseName}/session/${session.id}`;
            return (
              <div
                key={session.id}
                onClick={() => navigate(sessionPath)}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full border font-medium ${getBadgeStyle(
                        session.status
                      )}`}
                    >
                      {session.status}
                    </span>
                    <span className="text-xs text-slate-500">
                      {session.type} Lecture
                    </span>
                  </div>

                    <Link
                      to={sessionPath}
                      onClick={(event) => event.stopPropagation()}
                      className="font-semibold text-slate-900 text-base md:text-lg hover:text-blue-700 transition-colors cursor-pointer"
                    >
                      {session.title}
                    </Link>

                    <div className="flex items-center gap-3">
                      <img
                        src={new URL(`./data/${session.image}`, import.meta.url).href}
                        alt={session.title}
                        className="w-11 h-11 object-cover rounded-full border border-slate-200"
                      />
                      <p className="text-sm text-slate-600">
                        {session.mentor} | {session.date}
                        {session.duration && ` | ${session.duration}`}
                      </p>
                    </div>
                  </div>

                  <div className="self-start lg:self-auto">
                    {session.status === "Live" && (
                      <Link
                        to={sessionPath}
                        onClick={(event) => event.stopPropagation()}
                        className="inline-flex bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-colors"
                      >
                        Join Session
                      </Link>
                    )}

                    {["Completed", "Recorded"].includes(session.status) && (
                      <Link
                        to={sessionPath}
                        onClick={(event) => event.stopPropagation()}
                        className="inline-flex bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-colors"
                      >
                        View Lecture Details
                      </Link>
                    )}

                    {session.status === "In Progress" && (
                      <Link
                        to={sessionPath}
                        onClick={(event) => event.stopPropagation()}
                        className="inline-flex bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-xl text-sm cursor-pointer transition-colors"
                      >
                        View Lecture Details
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 text-sm">
            No sessions found for this filter.
          </div>
        )}
      </div>
    </div>
  );
}