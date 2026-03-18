import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import AssignmentCard from "../components/AssignmentCard";

export default function Assignments() {
  const assignments = [
    {
      title: "Build a Todo Application using React",
      course: "React",
      due: "29 January, 2026",
      assigned: "20 January, 2026",
      time: "3-4 Hours",
      status: "Not Completed",
    },
    {
      title: "Solve Array & String Problems (Set–1)",
      course: "Data Structures & Algorithms",
      due: "1 February, 2026",
      assigned: "25 January, 2026",
      time: "2 Hours",
      status: "Pending",
    },
    {
      title: "Build Reusable UI Components",
      course: "React",
      due: "1 February, 2026",
      assigned: "25 January, 2026",
      time: "2-3 Hours",
      status: "Pending",
    },
    {
      title: "Recursion Basics – Problem Set",
      course: "DSA",
      due: "1 February, 2026",
      assigned: "25 January, 2026",
      time: "2-3 Hours",
      status: "Pending",
    },
  ];

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
        <span className="font-medium text-slate-700">Assignments</span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 space-y-4">
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors">
            All Courses
            <ChevronDown size={16} />
          </button>

          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors">
            All Status
            <ChevronDown size={16} />
          </button>
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Assignments
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Submit your assignments by uploading files or sharing project/GitHub
            links.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {assignments.map((item, index) => (
          <AssignmentCard
            key={index}
            title={item.title}
            status={item.status}
            course={item.course}
            Duedate={item.due}
            assigned={item.assigned}
            time={item.time}
          />
        ))}
      </div>
    </div>
  );
}
