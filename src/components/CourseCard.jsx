export default function CourseCard({ title, mentor, duration }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Ongoing Course
      </p>
      <h4 className="text-slate-900 font-semibold text-lg mt-1">{title}</h4>

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p>
          <span className="font-medium text-slate-700">Mentor:</span> {mentor}
        </p>
        <p>
          <span className="font-medium text-slate-700">Duration:</span>{" "}
          {duration}
        </p>
      </div>

      <button className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
        Continue Learning
      </button>
    </div>
  );
}