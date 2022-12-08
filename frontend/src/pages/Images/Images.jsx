import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { getRandomImage, reset } from "../../features/image/imageSlice";

function Images() {
  const dispatch = useDispatch();
  const { image, isLoading,isError,message } = useSelector((state) => state.image);
  const [hover, isHover] = useState(false);
  useEffect(() => {
    dispatch(getRandomImage());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);
  if (isLoading || (!image && !isError)) {
    return <Loading />;
  }
  if(isError){
    return <div> {message}</div>
  }

  return (
    <div className="flex flex-wrap flex-col justify-center relative mt-6 bg-white border rounded m-2">


      <div className="flex flex-wrap justify-center mt-6 bg-white border rounded m-2">
        <img
          src={URL.createObjectURL(image)}
          className="p-1  max-w-sm object-fill"
          alt="..."
        />
      </div>

      <div className="md:flex md:items-center mb-6 flex justify-center">
        <button
          type="button"
          className="inline-block text-sm px-6 py-4 mt-4 font-bold  bg-[#3328fa] leading-none border rounded text-white   hover:text-white hover:bg-purple-500"
          onClick={() => {
            dispatch(getRandomImage());
          }}
        >
          <span className="relative ">get another one</span>
        </button>
      </div>
    </div>
  );
}

export default Images;
