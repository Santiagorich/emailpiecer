import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelected } from "../stores/slices/mainSlice";
import "react-quill/dist/quill.snow.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import dynamic from "next/dynamic";

function EmailPiecer() {
  const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
  const dispatch = useDispatch();
  const template = useSelector((state) => state.mainSlice.emailTemplate);
  const emailTemplate = ((template&&template.template)?template.template:null);
  const heading = `<strong>${template.name} Email</strong><br><br>`;
  const defaultLeading = `.`;
  const [email, setEmail] = React.useState(null);
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
    <div className="p-4 flex flex-row justify-between gap-8">
      {emailTemplate && (
        <div className="flex flex-col gap-4 flex-shrink-0">
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
            onChange={setEmail}
          />
        </div>
        <div className="flex flex-row justify-between ">
          <div className="bg-blue-700 p-2 rounded-b-lg w-full flex justify-center">
            <CopyToClipboard text={email} options={{format:'text/html'}}>
              <button className="text-white w-full">Copy to clipboard</button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailPiecer;
