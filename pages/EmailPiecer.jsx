import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelected } from "../stores/slices/mainSlice";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

function EmailPiecer() {
  const ReactQuill = dynamic(
    async () => {
      const { default: RQ } = await import("react-quill");

      return ({ forwardedRef, ...props }) => (
        <RQ ref={forwardedRef} {...props} />
      );
    },
    {
      ssr: false,
    }
  );
  const dispatch = useDispatch();
  const template = useSelector((state) => state.persistedMain.emailTemplate);
  const router = useRouter();
  const quillRef = useRef(null);
  const emailTemplate =
    template && template.template ? template.template : null;
  const heading = `<strong>${
    template && template.template ? template.name : null
  } Email</strong><br><br>`;
  const defaultLeading = `.`;
  const [email, setEmail] = useState(null);
  const createSentence = (emailTemplate) => {
    return emailTemplate
      .filter((item) => item.selected != null)
      .map((item) => {
        return (
          item.selected
            .map((selected) => {
              return item.selection[selected];
            })
            .join(",") +
          (item.newline
            ? `${item.leading ? item.leading : defaultLeading}<br>`
            : item.leading
            ? item.leading
            : defaultLeading)
        );
      })
      .join("");
  };
  const getHtml = () => {
    if (
      quillRef.current &&
      typeof quillRef.current.unprivilegedEditor !== "undefined"
    ) {
      console.log("After IF");
      console.log(quillRef.current?.unprivilegedEditor.getHTML());
      return quillRef.current?.unprivilegedEditor.getHTML();
    }
  };
  useEffect(() => {
    if (emailTemplate) {
      setEmail(
        `${heading}
        ${createSentence(emailTemplate)}
          `
      );
    }
  }, [emailTemplate]);

  return (
    <div className="flex flex-col p-4 gap-4 h-screen mb-4">
      <div className="flex justify-start items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            router.push("/");
          }}
        >
          Go Back
        </button>
      </div>
      <div className=" flex flex-row justify-between gap-8">
        {emailTemplate && (
          <div className="flex flex-col gap-4 flex-shrink-0 overflow-auto">
            {emailTemplate.map((item, index) => {
              return (
                <div className="flex flex-col gap-2" key={item.type}>
                  <span className="font-bold w-full border-b-2">
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                  <div className="flex flex-row gap-2">
                    {emailTemplate[index].selection.map((value, selindex) => (
                      <div
                        onClick={() => {
                          dispatch(setSelected({ index, selindex }));
                        }}
                        key={value}
                        className={` rounded-lg p-2 border-[1px] border-gray-400 ${
                          emailTemplate[index].selected?.includes(selindex)
                            ? `bg-purple-300`
                            : `bg-transparent hover:bg-purple-400`
                        }  cursor-pointer `}
                      >
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className=" w-1/2 flex flex-col">
          <div className="bg-transparent rounded-t-lg overflow-hidden h-full">
            <ReactQuill
              className="h-full"
              theme="snow"
              value={email}
              forwardedRef={quillRef}
            />
          </div>
          <div className="flex flex-row justify-between ">
            <div className="bg-blue-700 p-2 rounded-b-lg w-full flex justify-center">
              <button
                className="text-white w-full"
                onClick={() => {
                  const clipboardItem = new ClipboardItem({
                    "text/plain": new Blob([getHtml()], {
                      type: "text/plain",
                    }),
                    "text/html": new Blob([getHtml()], { type: "text/html" }),
                  });

                  navigator.clipboard.write([clipboardItem]);
                }}
              >
                Copy to clipboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailPiecer;
