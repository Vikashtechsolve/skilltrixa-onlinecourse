import { CalendarDays, Megaphone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Announcements() {
  const announcements = [
    {
      title: "Live Session Timings Update (React)",
      description:
        "The live session on State Management with Hooks scheduled for 24 Jan 2026 will now start at 7:30 PM instead of 7:00 PM. Please make sure to join on time.",
      date: "22 January, 2026",
    },
    {
      title: "DSA Live Class Rescheduled",
      description:
        "The live session on Arrays & Strings – Problem Solving has been rescheduled from 23 Jan 2026 to 25 Jan 2026 due to mentor unavailability.",
      date: "21 January, 2026",
    },
    {
      title: "New Practice Set Added – React Forms",
      description:
        "A new practice set on Form Handling & Validation has been added under the Practice section. Students are encouraged to complete it before the next live session.",
      date: "20 January, 2026",
    },
    {
      title: "Weekly DSA Test Scheduled",
      description:
        "The Weekly DSA Test (Arrays & Strings) will be conducted on 26 Jan 2026 at 8:00 PM. The test duration will be 60 minutes.",
      date: "20 January, 2026",
    },
    {
      title: "Recording Available for React Live Session",
      description:
        "The recording for the live session Building Reusable Components & Props is now available under the Course Content section.",
      date: "19 January, 2026",
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
        <span className="font-medium text-slate-700">Announcements</span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Announcements
        </h1>
        <p className="text-slate-600 mt-1">
          Stay updated with the latest course-related announcements and
          important notices.
        </p>
      </div>

      <div className="space-y-4">
        {announcements.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 md:p-6 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-white border border-slate-200 w-9 h-9 inline-flex items-center justify-center">
                  <Megaphone className="text-blue-600" size={18} />
                </div>
                <div>
                  <span className="inline-flex text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 mb-2">
                    Important Update
                  </span>
                  <h3 className="text-slate-900 font-semibold text-lg leading-6">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 bg-white border border-slate-200 rounded-full px-3 py-1 w-fit">
                <CalendarDays size={14} />
                {item.date}
              </div>
            </div>

            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

