import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { setSelected } from "../stores/slices/mainslice";
// import { convertFromRaw } from "draft-js";
 
function EmailPiecer() {
  const Editor = dynamic(
    () => {
      return import("react-draft-wysiwyg").then((mod) => mod.Editor);
    },
    { ssr: false }
  );
  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // const [editorState, setEditorState] = React.useState(null);
  // const [contentState, setContentState] = React.useState(null);
  const dispatch = useDispatch();
  const emailTemplate = useSelector((state) => state.mainSlice.emailTemplate);
  // const content = {
  //   entityMap: {},
  //   blocks: [],
  // };
  const [email, setEmail] = React.useState(null);
  // console.log(content);

  return (
    <div className="p-4 flex flex-row justify-between gap-8">
      {/* Show each key and value of emailTemplate */}
      {emailTemplate && (
        <div className="flex flex-col gap-4 flex-shrink-0">
          {emailTemplate.map((item, index) => {
            // content.blocks.push({
            //   key: makeid(5),
            //   text: `-${key}-`,
            //   type: "unstyled",
            //   depth: 0,
            //   inlineStyleRanges: [],
            //   entityRanges: [],
            //   data: {},
            // });
            console.log(item.type);
            return (
              <div className="flex flex-col gap-2" key={item.type}>
                <span className="font-bold text-white">
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </span>
                <div className="flex flex-row">
                  {emailTemplate[index].selection.map((value,selindex) => (
                    <div
                      onClick={(e) => {
                        // content.blocks[index].text = `${value}`;
                        // setContentState(convertFromRaw(content));
                        dispatch(setSelected({index,selindex}));
                      }}
                      key={value}
                      className=" rounded-lg p-2 bg-slate-500 hover:bg-slate-600 cursor-pointer"
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
      <div className=" w-1/2">
        {/* Array with only the items that have selected = true */}
        <div className="flex flex-row justify-between">
          <button>Copy to clipboard</button>
        </div>
        <textarea
        className=" rounded-lg p-4 w-full"
        readOnly
          value={(emailTemplate && emailTemplate.filter((item) => item.selected != null).map((item) => item.selection[item.selected]).join(" ")) || ""}
        ></textarea>
        {/* <Editor
          // onEditorStateChange={(editorState) => {
          //   setEditorState(editorState);
          // }}
          editorState={editorState}
          contentState={contentState}
          // onContentStateChange={(contentState) => {
          //   setContentState(contentState);
          // }}
          toolbarClassName="toolbarClassName bg-slate-300"
          wrapperClassName="w-full h-full bg-white rounded-lg overflow-hidden bg-slate-300"
          editorClassName="h-full overflow-hidden"
        /> */}
      </div>
    </div>
  );
}

export default EmailPiecer;
