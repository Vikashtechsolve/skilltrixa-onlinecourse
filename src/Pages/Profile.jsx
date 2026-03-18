import { Mail, Phone, ShieldCheck, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function Profile() {
  const profile = {
    name: "Priyanka",
    email: "priyanka2300@gmail.com",
    phone: "+91 9823478093",
    role: "Student",
    memberSince: "Jan 2026",
  };

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
        <span className="font-medium text-slate-700">Profile</span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Profile</h1>
        <p className="text-slate-600 mt-1">
          View your personal details and account information.
        </p>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50/60 shadow-sm p-6 max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white border border-slate-200 flex items-center justify-center">
              <User size={34} className="text-slate-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                {profile.name}
              </h2>
              <p className="text-sm text-slate-600">{profile.role}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white border border-slate-200 px-4 py-3">
              <p className="text-xs text-slate-500">Member Since</p>
              <p className="text-sm font-medium text-slate-800 mt-1">
                {profile.memberSince}
              </p>
            </div>
            <div className="rounded-xl bg-white border border-slate-200 px-4 py-3">
              <p className="text-xs text-slate-500">Account Status</p>
              <p className="text-sm font-medium text-emerald-700 mt-1">Active</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-4">
            <p className="text-xs text-slate-500 mb-1">Full Name</p>
            <p className="text-sm font-medium text-slate-800">{profile.name}</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-4">
            <p className="text-xs text-slate-500 mb-1 inline-flex items-center gap-2">
              <Mail size={14} />
              Email Address
            </p>
            <p className="text-sm font-medium text-slate-800 break-all">
              {profile.email}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-4">
            <p className="text-xs text-slate-500 mb-1 inline-flex items-center gap-2">
              <Phone size={14} />
              Phone Number
            </p>
            <p className="text-sm font-medium text-slate-800">{profile.phone}</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-4">
            <p className="text-xs text-slate-500 mb-1 inline-flex items-center gap-2">
              <ShieldCheck size={14} />
              Role
            </p>
            <p className="text-sm font-medium text-slate-800">{profile.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}