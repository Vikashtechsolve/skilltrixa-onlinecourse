import { ArrowRight, BookOpen, CirclePlay, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function MyCourses() {
  const courses = [
    {
      title: "React Development",
      slug: "react-development",
      level: "Beginner to Advanced",
      mentor: "Vikash Dubey",
      duration: "4 Months",
      mode: "Recorded + Live Sessions",
      lectures: 42,
    },
    {
      title: "Data Structures & Algorithms DSA",
      slug: "data-structures-algorithms-dsa",
      level: "Beginner to Advanced",
      mentor: "Rahul Verma",
      duration: "3 Months",
      mode: "Recorded + Live Sessions + Practice Based",
      lectures: 36,
    },
  ];

  const navigate = useNavigate();

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
        <span className="font-medium text-slate-700">My Courses</span>
      </div>

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          My Courses
        </h1>
        <p className="text-slate-600 mt-1">
          Track your enrolled courses and continue learning at your own pace.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {courses.map((course) => (
          <div
            key={course.slug}
            onClick={() => navigate(`/course/${course.slug}`)}
            className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Enrolled Course
                </p>
                <h2 className="text-slate-900 font-semibold text-xl mt-1">
                  {course.title}
                </h2>
              </div>
              <span className="text-xs font-medium bg-blue-50 text-blue-700 rounded-full px-3 py-1">
                {course.level}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 text-sm text-slate-700">
              <p>
                <span className="inline-flex items-center gap-2 font-medium text-slate-800">
                  <UserRound size={15} />
                  Mentor
                </span>
                <span className="block text-slate-600 mt-1">{course.mentor}</span>
              </p>
              <p>
                <span className="inline-flex items-center gap-2 font-medium text-slate-800">
                  <BookOpen size={15} />
                  Duration
                </span>
                <span className="block text-slate-600 mt-1">{course.duration}</span>
              </p>
              <p>
                <span className="inline-flex items-center gap-2 font-medium text-slate-800">
                  <CirclePlay size={15} />
                  Mode
                </span>
                <span className="block text-slate-600 mt-1">{course.mode}</span>
              </p>
              <p>
                <span className="font-medium text-slate-800">Lectures</span>
                <span className="block text-slate-600 mt-1">
                  {course.lectures} sessions
                </span>
              </p>
            </div>

            <button
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/course/${course.slug}`);
              }}
              className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              View Course Details
              <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
