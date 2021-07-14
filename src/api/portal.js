import { fetchApi } from "@/utils/ajax";
import URL from "./urlConfig";

//获取权限
export const getPermission = (data) => fetchApi(URL.PERMISSION, data, "GET");
