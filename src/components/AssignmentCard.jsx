import { useState } from "react";
import AssignmentSubmissionModal from "../Pages/AssignmentSubmissionModal";

export default function AssignmentCard({
  title,
  status,
  Duedate,
  course,
  assigned,
  time,
}) {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const currentStatus = isSubmitted ? "Submitted" : status;

  return (
    <>
      <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 shadow-sm hover:shadow-md transition-shadow">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Assignment
        </p>
        <h3 className="text-slate-900 font-semibold text-base mt-1 mb-4">
          {title}
        </h3>

        <p className="text-sm mb-3 text-slate-700">
          Status:
          <span
            className={`ml-2 px-2.5 py-1 rounded-full text-xs font-medium ${
              currentStatus === "Submitted"
                ? "bg-emerald-100 text-emerald-700"
                : currentStatus === "Pending"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-red-100 text-red-600"
            }`}
          >
            {currentStatus}
          </span>
        </p>

        <p className="text-sm mb-3 text-slate-700">
          Course:
          <span className="ml-2 font-medium text-slate-600">{course}</span>
        </p>

        {assigned && (
          <p className="text-sm mb-3 text-slate-700">
            Assigned On:
            <span className="ml-2 font-medium text-slate-600">{assigned}</span>
          </p>
        )}

        {time && (
          <p className="text-sm mb-3 text-slate-700">
            Estimated Time:
            <span className="ml-2 font-medium text-slate-600">{time}</span>
          </p>
        )}

        <p className="text-sm mb-5 text-slate-700">
          Due Date:
          <span className="ml-2 font-medium text-slate-600">{Duedate}</span>
        </p>

        <button
          onClick={() => setShowModal(true)}
          className={`text-white text-sm px-4 py-2 rounded-xl font-medium transition-colors cursor-pointer ${
            isSubmitted
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitted ? "Submitted" : "Submit Assignment"}
        </button>
      </div>

      {showModal && (
        <AssignmentSubmissionModal
          assignmentTitle={title}
          onClose={() => setShowModal(false)}
          onSubmit={() => {
            setIsSubmitted(true);
            setShowModal(false);
          }}
        />
      )}
    </>
  );
}
