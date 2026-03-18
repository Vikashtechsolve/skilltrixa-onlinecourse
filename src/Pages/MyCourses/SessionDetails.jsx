import { Link, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import allData from "./data/reactCourseAll.json";
import sessionData from "./data/component.png";
import {
  FileText,
  Monitor,
  Gauge,
  BookOpen,
  Users,
  ChevronLeft,
  ChevronRight,
  SendHorizontal,
} from "lucide-react";

export default function SessionDetails() {
  const { id, courseName } = useParams();
  const session = allData.find((item) => item.id === Number(id));
  const [activeTab, setActiveTab] = useState("Notes");
  const [discussionInput, setDiscussionInput] = useState("");
  const [discussions, setDiscussions] = useState([
    {
      id: "msg-1",
      sender: "Ajay Jain",
      text: "Props helped me understand how data flows between components.",
      mine: false,
      time: "09:10 AM",
    },
    {
      id: "msg-2",
      sender: "Ruchika Roy",
      text: "Passing props step by step clarified component communication.",
      mine: false,
      time: "09:14 AM",
    },
    {
      id: "msg-3",
      sender: "You",
      text: "Agreed. Reusable components are now making much more sense.",
      mine: true,
      time: "09:20 AM",
    },
    {
      id: "msg-4",
      sender: "Ritik Thakur",
      text: "Always keep components small and reusable.",
      mine: false,
      time: "09:26 AM",
    },
  ]);

  const formattedCourseName = (courseName ?? "")
    .split("-")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
  const discussionCountLabel = useMemo(
    () => `${discussions.length} messages`,
    [discussions.length]
  );

  const handleSendMessage = () => {
    const text = discussionInput.trim();
    if (!text) return;

    const now = new Date();
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setDiscussions((previous) => [
      ...previous,
      {
        id: `msg-${Date.now()}`,
        sender: "You",
        text,
        mine: true,
        time,
      },
    ]);
    setDiscussionInput("");
  };

  if (!session) return <div>Session Not Found</div>;

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
          className="hover:text-blue-600 transition-colors cursor-pointer"
        >
          {formattedCourseName || "React Course"}
        </Link>
        <span>/</span>
        <Link
          to={`/course/${courseName}/session/${session.id}`}
          className="font-medium text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
        >
          {session.title}
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          {session.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-slate-500 mt-3 text-sm">
          <img
            src={new URL(`./data/${session.image}`, import.meta.url).href}
            alt={session.title}
            className="w-10 h-10 rounded-full object-cover border border-slate-200"
          />
          <span>{session.mentor}</span>
          <span>•</span>
          <span>{session.date}</span>
          {session.duration && (
            <>
              <span>•</span>
              <span>{session.duration}</span>
            </>
          )}
          <span>• Recorded Lecture</span>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-3">
        <img
          src={sessionData}
          alt="banner"
          className="w-full h-[260px] md:h-[350px] object-cover rounded-xl"
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-3">
        <div className="flex flex-wrap gap-2">
          {[
            { name: "Notes", icon: <FileText size={16} /> },
            { name: "Slides", icon: <Monitor size={16} /> },
            { name: "Test", icon: <Gauge size={16} /> },
            { name: "Practice", icon: <BookOpen size={16} /> },
            { name: "Discussions", icon: <Users size={16} /> },
          ].map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition cursor-pointer ${
                activeTab === tab.name
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        {activeTab === "Notes" && (
          <div className="space-y-4">
            <h2 className="font-semibold text-slate-900">Notes (PDF)</h2>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-slate-200 p-4 rounded-xl bg-slate-50">
              <div>
                <p className="font-medium text-slate-900">{session.title} Notes</p>
                <p className="text-sm text-slate-500">
                  Download complete lecture notes in PDF format.
                </p>
              </div>
              {session.notesPdf ? (
                <a
                  href={new URL(`./data/${session.notesPdf}`, import.meta.url).href}
                  download
                  className="cursor-pointer"
                >
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer">
                    Download PDF
                  </button>
                </a>
              ) : (
                <button className="bg-slate-200 text-slate-500 px-4 py-2 rounded-xl text-sm cursor-not-allowed">
                  Download PDF
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === "Slides" && (
          <div className="space-y-4">
            <h2 className="font-semibold text-slate-900">Slides (PPT)</h2>
            <div className="relative">
              <img
                src={sessionData}
                alt="slide"
                className="w-full h-[260px] md:h-[350px] object-cover rounded-xl"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
                <button className="bg-white p-2 rounded-full shadow cursor-pointer hover:bg-slate-100 transition-colors">
                  <ChevronLeft size={18} />
                </button>
                <button className="bg-white p-2 rounded-full shadow cursor-pointer hover:bg-slate-100 transition-colors">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Test" && (
          <div className="space-y-4">
            <h2 className="font-semibold text-slate-900">Test Link</h2>
            <a
              href="https://componentspropsreacttest.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer"
            >
              https://componentspropsreacttest.in
            </a>
          </div>
        )}

        {activeTab === "Practice" && (
          <div className="space-y-4">
            <h2 className="font-semibold text-slate-900">Practice Exercises</h2>
            <div className="border border-slate-200 p-5 rounded-xl bg-slate-50 text-slate-700">
              <p className="mb-2">
                1. Create a reusable Button component using props.
              </p>
              <p className="mb-2">
                2. Pass dynamic data between Parent and Child components.
              </p>
              <p>
                3. Build a Card component that accepts title and description.
              </p>
            </div>
          </div>
        )}

        {activeTab === "Discussions" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold text-slate-900">Discussions</h2>
              <p className="text-xs text-slate-500">{discussionCountLabel}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 md:p-5 space-y-3 max-h-[420px] overflow-y-auto">
              {discussions.map((comment) => (
                <div
                  key={comment.id}
                  className={`flex ${comment.mine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 shadow-sm ${
                      comment.mine
                        ? "bg-blue-600 text-white rounded-br-md"
                        : "bg-white border border-slate-200 text-slate-700 rounded-bl-md"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p
                        className={`text-xs font-semibold ${
                          comment.mine ? "text-blue-100" : "text-slate-500"
                        }`}
                      >
                        {comment.sender}
                      </p>
                      <p
                        className={`text-[11px] ${
                          comment.mine ? "text-blue-100" : "text-slate-400"
                        }`}
                      >
                        {comment.time}
                      </p>
                    </div>
                    <p
                      className={`text-sm mt-1 leading-relaxed ${
                        comment.mine ? "text-white" : "text-slate-700"
                      }`}
                    >
                      {comment.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-end gap-2">
              <textarea
                rows="2"
                value={discussionInput}
                onChange={(event) => setDiscussionInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Write a message..."
                className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <button
                type="button"
                onClick={handleSendMessage}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer"
              >
                <SendHorizontal size={15} />
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}