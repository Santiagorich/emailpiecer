import React from "react";
import { useDispatch } from "react-redux";
import { setEmailTemplate } from "../../stores/slices/mainslice";
import { useRouter } from "next/router";

function SearchInput() {
  const dispatch = useDispatch();
  const inputRef = React.useRef(null);
  const router = useRouter();
  const emailTemplate = [
    { type: "greetings", selection: ["Hello", "Hi", "Hey"], selected: null },
    {
      type: "purpose",
      selection: ["I am writing to you to", "I am contacting you to"],
      selected: null,
    },
    {
      type: "action",
      selection: ["invite you to", "request you to", "ask you to"],
      selected: null,
    },
    {
      type: "event",
      selection: ["a meeting", "a conference", "a webinar"],
      selected: null,
    },
    {
      type: "date",
      selection: ["on 1st January", "on 2nd February", "on 3rd March"],
      selected: null,
    },
    {
      type: "time",
      selection: ["at 10:00 AM", "at 11:00 AM", "at 12:00 PM"],
      selected: null,
    },
    {
      type: "venue",
      selection: [
        "at our office",
        "at our conference hall",
        "at our webinar room",
      ],
      selected: null,
    },
    {
      type: "closing",
      selection: ["Thank you", "Regards", "Best regards"],
      selected: null,
    },
  ];
  const handleSubmit = (input) => {
    dispatch(setEmailTemplate(emailTemplate));
    router.push("/EmailPiecer");
  };
  return (
    <div>
      <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
        Search
      </label>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          ref={inputRef}
          type="search"
          id="default-search"
          className="block p-4 pl-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="What kind of email are you looking for"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(inputRef.current.value);
            }
          }}
          required
        ></input>
        <button
          type="submit"
          onClick={() => handleSubmit(inputRef.current.value)}
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchInput;
