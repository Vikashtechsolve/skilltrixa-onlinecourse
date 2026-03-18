import { Download } from "lucide-react";
import { Link } from "react-router-dom";
import certificateImg from "./MyCourses/data/certificates.png";

export default function Certificates() {
  const certificates = [
    {
      id: 1,
      course: "React Course",
      image: certificateImg,
      pdf: "/certificates/react-cert.pdf",
    },
    {
      id: 2,
      course: "Data Structures and Algorithms (DSA)",
      image: certificateImg,
      pdf: "/certificates/dsa-cert.pdf",
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
        <span className="font-medium text-slate-700">Certificates</span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Certificates
        </h1>
        <p className="text-slate-600 mt-1">
          Celebrate your achievements. Download and share your course completion
          certificates.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="group rounded-2xl border border-blue-100 bg-blue-50/60 shadow-sm hover:shadow-md transition-all overflow-hidden max-w-sm w-full"
          >
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Completion Certificate
              </p>
              <h3 className="text-slate-900 font-semibold mt-1 text-sm leading-5 min-h-10">
                {cert.course}
              </h3>
            </div>

            <div className="px-4 pb-4">
              <img
                src={cert.image}
                alt={cert.course}
                className="w-full h-[185px] object-cover rounded-xl border border-slate-200"
              />
            </div>

            <div className="px-4 pb-4 flex items-center justify-end gap-3">
              <a
                href={cert.pdf}
                download
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-2 rounded-xl transition-colors cursor-pointer"
              >
                <Download size={16} />
                Download PDF
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}