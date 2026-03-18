import { useRef, useState } from "react";
import { X, Upload, Link2, FileCheck2 } from "lucide-react";

export default function AssignmentSubmissionModal({
  assignmentTitle,
  onClose,
  onSubmit,
}) {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [projectLink, setProjectLink] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedFile && !projectLink.trim()) {
      setError("Please upload a file or provide a project/GitHub link.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    // Simulate request so UI feels responsive until backend is connected.
    await new Promise((resolve) => setTimeout(resolve, 700));

    onSubmit?.({
      file: selectedFile ?? null,
      projectLink: projectLink.trim(),
    });

    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-2xl p-6 relative shadow-xl border border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 cursor-pointer"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-center text-slate-900">
          Assignment Submission
        </h2>
        <p className="text-sm text-slate-500 text-center mt-1">
          {assignmentTitle}
        </p>
        <p className="text-sm text-slate-500 text-center mt-1 mb-6">
          Upload your work or share the project/GitHub link for review.
        </p>

        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-slate-800">
              Upload File
            </label>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                setSelectedFile(file ?? null);
              }}
              accept=".zip,.pdf,.doc,.docx,.txt,.md"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 w-full border border-slate-200 rounded-xl p-5 flex flex-col items-center justify-center text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Upload size={20} className="mb-2" />
              <span className="text-sm font-medium">
                {selectedFile ? "Change File" : "Choose File"}
              </span>
              <span className="text-xs mt-1 text-slate-500">
                Supported formats: zip, pdf, doc, docx, txt, md
              </span>
            </button>

            {selectedFile && (
              <div className="mt-2 flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                <FileCheck2 size={16} />
                {selectedFile.name}
              </div>
            )}
          </div>

          <div className="text-center text-xs uppercase tracking-wide text-slate-400">
            Or
          </div>

          <div>
            <label className="text-sm font-medium text-slate-800">
              Project / GitHub Link
            </label>
            <div className="mt-2 border border-slate-200 rounded-xl p-4 flex items-center gap-2 bg-slate-50">
              <Link2 size={16} className="text-slate-500" />
              <input
                type="url"
                placeholder="https://github.com/username/repository"
                value={projectLink}
                onChange={(event) => setProjectLink(event.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-slate-700"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit Assignment"}
          </button>
        </div>
      </div>
    </div>
  );
}
