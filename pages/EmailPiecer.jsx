import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelected } from "../stores/slices/mainSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { dynamic } from "next/dynamic";
function EmailPiecer() {
  dynamic(() => import("react-quill/dist/quill.js"), { ssr: false });
  const dispatch = useDispatch();
  const emailTemplate = useSelector((state) => state.mainSlice.emailTemplate);

  const [email, setEmail] = React.useState(null);
  useEffect(() => {
    setEmail(
      emailTemplate
        .filter((item) => item.selected != null)
        //.map((item) => item.selection[item.selected])
        .map((item) => {
          return item.selection[item.selected] + (item.newline ? "<br>" : "");
        })
        .join("")
    );
  }, [emailTemplate]);

  return (
    <div className="p-4 flex flex-row justify-between gap-8">
      {emailTemplate && (
        <div className="flex flex-col gap-4 flex-shrink-0">
          {emailTemplate.map((item, index) => {
            return (
              <div className="flex flex-col gap-2" key={item.type}>
                <span className="font-bold text-white">
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </span>
                <div className="flex flex-row gap-2">
                  {emailTemplate[index].selection.map((value, selindex) => (
                    <div
                      onClick={() => {
                        dispatch(setSelected({ index, selindex }));
                      }}
                      key={value}
                      className={` rounded-lg p-2 ${
                        emailTemplate[index].selected == selindex
                          ? `bg-slate-700`
                          : `bg-slate-500 hover:bg-slate-600`
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
      <div className=" w-1/2 flex flex-col gap-2">
        <div className="bg-white rounded-lg overflow-hidden h-full">
          <ReactQuill theme="snow" value={email} onChange={setEmail} />
        </div>
        <div className="flex flex-row justify-between">
          <div className="bg-green-500 p-2 rounded-lg">
            <CopyToClipboard text={email}>
              <button className="font-semibold text-white">
                Copy to clipboard
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailPiecer;
