import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setEmailTemplate } from "../../stores/slices/mainSlice";
import { useRouter } from "next/router";
import { app } from "../../utils/firebase";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
const db = getFirestore(app);
const getAllTemplates = async () => {
  let snapshot = await getDocs(collection(db, "templates"));
  let templateArr = [];
  snapshot.forEach((doc) => {
    templateArr.push(doc.data());
  });
  return templateArr;
};
export async function getStaticProps() {
  const preload = await getAllTemplates();
  return {
    props: {
      preload,
    },
    revalidate: 120,
  };
}
function SearchInput({ preload }) {
  const [templates, setTemplates] = useState(preload);
  const [filteredTemplates, setFilteredTemplates] = useState(preload);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const router = useRouter();
  // const emailTemplate = {
  //   name: "Technical",
  //   template: [
  //     { type: "greetings", selection: ["Hello", "Hi", "Hey"], newline: true },
  //     {
  //       type: "purpose",
  //       selection: ["I am writing to you to", "I am contacting you to"],
  //       newline: true,
  //     },
  //     {
  //       type: "action",
  //       selection: ["invite you to", "request you to", "ask you to"],
  //       newline: true,
  //     },
  //     {
  //       type: "event",
  //       selection: ["a meeting", "a conference", "a webinar"],
  //       newline: true,
  //     },
  //     {
  //       type: "date",
  //       selection: ["on 1st January", "on 2nd February", "on 3rd March"],
  //       newline: true,
  //     },
  //     {
  //       type: "time",
  //       selection: ["at 10:00 AM", "at 11:00 AM", "at 12:00 PM"],
  //       newline: true,
  //     },
  //     {
  //       type: "venue",
  //       selection: [
  //         "at our office",
  //         "at our conference hall",
  //         "at our webinar room",
  //       ],
  //       newline: true,
  //     },
  //     {
  //       type: "closing",
  //       selection: ["Thank you", "Regards", "Best regards"],
  //       newline: true,
  //     },
  //   ],
  // };
  useEffect(() => {
    console.log("templates", preload);
    getAllTemplates().then((templates) => {
      setTemplates(templates);
      setFilteredTemplates(templates);
    });
    // addDoc(collection(db, "templates"), emailTemplate);
  }, []);

  const handleSubmit = (template) => {
    dispatch(setEmailTemplate(template));
    router.push("/EmailPiecer");
  };
  return (
    <div>
      <span className="font-semibold text-black">Select email template</span>
      {/* <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
        Search
      </label> */}
      {/* <div className="relative">
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
        </div> */}
      {/* List with all the templates */}
      {templates && (
        <div className=" w-full rounded-md shadow-lg h-96 m-auto overflow-y-auto z-10">
          <input
            ref={inputRef}
            type="text"
            className="w-full h-12 px-10 bg-gray-200 focus:outline-none "
            placeholder="Search"
            onKeyUp={(e) => {
              if (e.target.value !== "" && e.key === "Enter") {
                handleSubmit(filteredTemplates[0]);
              }
              if (e.target.value === "") {
                setFilteredTemplates(templates);
              } else {
                setFilteredTemplates(
                  templates.filter((template) =>
                    template.name
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
                  )
                );
              }
            }}
          />
          {filteredTemplates && filteredTemplates.map((template) => (
            <div
              key={template.name}
              className="px-4 py-3 cursor-pointer hover:bg-gray-200 font-bold "
              onClick={() => {
                handleSubmit(template);
              }}
            >
              {template.name}
            </div>
          ))}
        </div>
      )}

      {/* <button
          type="submit"
          onClick={() => handleSubmit(inputRef.current.value)}
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button> */}
    </div>
  );
}

export default SearchInput;
