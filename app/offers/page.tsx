export default function OffersPage() {
  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold">Work With Jenn</h1>
      <p className="mt-1 text-sm text-gray-600">
        Explore your next best step. Faith Filled Divorce is featured right now.
      </p>

      {/* Faith Filled Divorce */}
      <div className="mt-6 rounded-2xl border-2 border-[#ab882e] bg-white p-6 shadow-md">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Featured Right Now
        </p>

        <h2 className="mt-2 text-lg font-semibold">Faith Filled Divorce</h2>

        <p className="mt-2 text-gray-700">
          Ongoing support, weekly coaching, and a step by step path to help you
          heal, grow, and move forward.
        </p>

        <div className="mt-4 flex gap-3">
          <a
            className="rounded-xl border-2 border-[#ab882e] px-4 py-2 text-sm font-medium text-[#ab882e] transition-colors hover:bg-[#ab882e] hover:text-white"
            href="https://www.findthejoywithjenn.com/program-details"
            target="_blank"
            rel="noreferrer"
          >
            Learn More
          </a>

          <a
            className="rounded-xl border-2 border-[#ab882e] px-4 py-2 text-sm font-medium text-[#ab882e] transition-colors hover:bg-[#ab882e] hover:text-white"
            href="https://www.findthejoywithjenn.com/membership-pricing"
            target="_blank"
            rel="noreferrer"
          >
            Join Now
          </a>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {/* 1:1 Coaching */}
        <div className="rounded-2xl border-2 border-[#ab882e] bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Coaching
          </p>

          <p className="mt-1 font-semibold">1:1 Coaching</p>

          <p className="mt-2 text-sm text-gray-700">
            Personal support and a clear path forward, tailored to your season.
          </p>

          <div className="mt-3 flex gap-3">
            <a
              className="rounded-xl border-2 border-[#ab882e] px-3 py-2 text-sm font-medium text-[#ab882e] transition-colors hover:bg-[#ab882e] hover:text-white"
              href="https://www.findthejoywithjenn.com/one-on-one-coaching"
              target="_blank"
              rel="noreferrer"
            >
              Learn More
            </a>

            <a
              className="rounded-xl border-2 border-[#ab882e] px-3 py-2 text-sm font-medium text-[#ab882e] transition-colors hover:bg-[#ab882e] hover:text-white"
              href="https://calendly.com/jennzingmark/50min"
              target="_blank"
              rel="noreferrer"
            >
              Book a Session
            </a>
          </div>
        </div>

        {/* Courses */}
        <div className="rounded-2xl border-2 border-[#ab882e] bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Course
          </p>

          <p className="mt-1 font-semibold">Courses</p>

          <p className="mt-2 text-sm text-gray-700">
            Self paced support to help you heal, grow, and move forward.
          </p>

          <div className="mt-3 flex gap-3">
            <a
              className="rounded-xl border-2 border-[#ab882e] px-3 py-2 text-sm font-medium text-[#ab882e] transition-colors hover:bg-[#ab882e] hover:text-white"
              href="https://www.findthejoywithjenn.com/courses"
              target="_blank"
              rel="noreferrer"
            >
              Learn More
            </a>

            <a
              className="rounded-xl border-2 border-[#ab882e] px-3 py-2 text-sm font-medium text-[#ab882e] transition-colors hover:bg-[#ab882e] hover:text-white"
              href="https://www.findthejoywithjenn.com/courses"
              target="_blank"
              rel="noreferrer"
            >
              Use 50% Off
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}