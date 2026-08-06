import { Link } from "react-router-dom";

export function WelcomeModalForm() {
  return (
    <main className="mt-10 w-full h-auto flex flex-col items-center justify-center gap-4">
      <p className="font-bold text-[#c4c4c4]">
        We Sent you an Email, to Confirm your Email Address
      </p>
      <div className="w-full border-b-2 border-b-stone-200">
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="Mail"
          ></path>
        </svg>
      </div>
      <Link
        to={"https://mail.google.com/mail/u/0/#inbox/"}
        className="bg-blue-500 text-white p-4 rounded hover:bg-blue-400"
      >
        Check you Inbox
      </Link>
    </main>
  );
}
