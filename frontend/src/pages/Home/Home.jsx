import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRandomImage,
  reset,
  uploadImage,
} from "../../features/image/imageSlice";
import Dropzone, { useDropzone } from "react-dropzone";
import ProgressBar from "@ramonak/react-progress-bar";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [sec, setSec] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [close, setClose] = useState(false);

  const { isLoading, isSuccess } = useSelector((state) => state.image);
  const resetComp = () => {
    dispatch(reset());
    setImageUrl(null);
    setProgress(0);
    setFileName(null);
    setSec(null);
    setClose(false);
    URL.revokeObjectURL(sec);
    console.log("reset");
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImageUrl(fileReader.result);
      };
      fileReader.readAsDataURL(acceptedFiles[0]);
      setSec(acceptedFiles[0]);
      setFileName(acceptedFiles[0].name);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", sec, "random");
    dispatch(uploadImage(formData));
  };

  return (
    <>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px] bg-white">
          <form className="py-6 px-9" onSubmit={handleSubmit}>
            <div className="mb-6 pt-4">
              <div className="mb-5 flex flex-col text-center gap-4 font-semibold text-[#07074D]">
                <div className="text-2xl"> Upload Your Image </div>
                <div className="text-base text-[#828282]">
                  {" "}
                  File should be Jpeg, Png,...
                </div>
              </div>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-1 text-center"
                />
              ) : (
                <>
                  <div {...getRootProps()} className="mb-8">
                    <input type="file" {...getInputProps()} className="sr-only" accept="image/*"/>
                    <label
                      htmlFor="file"
                      className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                    >
                      <div>
                        <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                          Drop files here
                        </span>
                        <span className="mb-2 block text-base font-medium text-[#6B7280]">
                          Or
                        </span>
                        <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                          Browse
                        </span>
                      </div>
                    </label>
                  </div>
                </>
              )}
              {( isSuccess) && !close && (
                <div className="rounded-md bg-[#F5F7FB] py-4 px-8 mt-3">
                  <div className="flex items-center justify-between">
                    <span className="truncate pr-3 text-base font-medium text-[#07074D]">
                      {fileName}
                    </span>
                    <button
                      className="text-[#07074D]"
                      onClick={() => {
                        setClose(true);
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                          fill="currentColor"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="relative mt-5 h-[6px] w-full rounded-lg bg-[#E2E5EF]">
                    <div
                      className={`absolute left-0 right-0 h-full w-[${progress}%] rounded-lg bg-[#6A64F1]`}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div>
              {isSuccess ? (
                <button
                  className="hover:shadow-form w-full rounded-md bg-[#3328fa] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                  onClick={() => resetComp()}
                  type="button"
                >
                  Upload Another Image
                </button>
              ) : (
                <button
                  className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none disabled:bg-[#3328fa]"
                  disabled={!sec}
                >
                  Send File
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Home;
