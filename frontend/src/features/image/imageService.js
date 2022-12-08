import axios,{axiosPrivate} from "../../api/axios";
import Cookies from "js-cookie";
// uplaod image to server
const upload = async (data) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  };
  const response = await axiosPrivate.post("/images/", data, config);
  return response.data;
};

const getRandomImage = async () => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
    responseType: "blob"
  };
  const response = await axiosPrivate.get("/images/",config);
  return response.data;
};

const imageServices = { upload, getRandomImage };

export default imageServices;
