import CourseCard from "../components/CourseCard";
import ProgressBar from "../components/ProgressBar";
import SessionCard from "../components/SessionCard";
import AssignmentCard from "../components/AssignmentCard";
import { useNavigate } from "react-router-dom";
import { BookOpenCheck, CalendarClock, FileClock } from "lucide-react";
import home from "./MyCourses/data/home.png";

export default function Dashboard() {
  const navigate = useNavigate();
  const courses = [
    {
      title: "React Development",
      mentor: "Vikash Dubey",
      duration: "4 Months",
    },
    {
      title: "Data Structures & Algorithms (DSA)",
      mentor: "Amit Vaghamshi",
      duration: "3 Months",
    },
  ];

  const sessions = [
    {
      title: "React - State Management with Hooks",
      date: "24 January, 2026",
      time: "10:00 AM - 11:00 AM",
      mentor: "Vikash Dubey",
    },
    {
      title: "React - Reusable Components & Props",
      date: "24 January, 2026",
      time: "11:30 AM - 12:30 PM",
      mentor: "Vikash Dubey",
    },
    {
      title: "DSA - Arrays and Strings",
      date: "24 January, 2026",
      time: "2:00 PM - 3:00 PM",
      mentor: "Amit Vaghamshi",
    },
  ];

  const assignments = [
    {
      title: "Build Todo App",
      status: "Pending",
      Duedate: "24 January, 2026",
      course: "React",
    },
    {
      title: "Arrays & Strings",
      status: "Not Completed",
      Duedate: "24 January, 2026",
      course: "DSA",
    },
    {
      title: "Counter App using useState",
      status: "Pending",
      Duedate: "24 January, 2026",
      course: "React",
    },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-slate-50 min-h-full space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="space-y-2 max-w-2xl">
            <p className="inline-flex items-center rounded-full bg-red-50 text-red-600 text-xs font-semibold px-3 py-1">
              Student Dashboard
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Good Evening, Priyanka
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Continue your learning journey and stay consistent today. You are
              doing great - keep the streak going.
            </p>
          </div>

          <img
            src={home}
            className="w-36 md:w-44 object-contain"
            alt="Learning illustration"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <BookOpenCheck size={16} />
              Ongoing Courses
            </div>
            <p className="text-xl font-bold text-slate-900 mt-1">2 Active</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <CalendarClock size={16} />
              Live Sessions Today
            </div>
            <p className="text-xl font-bold text-slate-900 mt-1">3 Sessions</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <FileClock size={16} />
              Pending Assignments
            </div>
            <p className="text-xl font-bold text-slate-900 mt-1">3 Pending</p>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Ongoing Courses</h3>
          <p className="text-sm text-slate-500">
            Continue your enrolled programs and track progress.
          </p>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {courses.map((course) => (
            <CourseCard
              key={course.title}
              title={course.title}
              mentor={course.mentor}
              duration={course.duration}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Overall Progress
          </h3>
          <p className="text-sm text-slate-500">
            Course-wise completion overview.
          </p>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <ProgressBar title="React Development" progress="65%" />
          <ProgressBar title="DSA" progress="50%" />
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Today's Live Sessions
          </h3>
          <p className="text-sm text-slate-500">
            Join upcoming live classes and stay on schedule.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
          {sessions.map((session) => (
            <SessionCard
              key={session.title}
              title={session.title}
              date={session.date}
              time={session.time}
              mentor={session.mentor}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Pending Assignments
            </h3>
            <p className="text-sm text-slate-500">
              Submit before the due date to keep your progress on track.
            </p>
          </div>
          <button
            onClick={() => navigate("/pending-assignments")}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition"
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
          {assignments.map((assignment) => (
            <AssignmentCard
              key={assignment.title}
              title={assignment.title}
              status={assignment.status}
              Duedate={assignment.Duedate}
              course={assignment.course}
            />
          ))}
        </div>
      </section>
    </div>
  );
}