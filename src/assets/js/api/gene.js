import http from "./http-common";
import qs from "qs";

export default {
  find(query = {}) {
    return http.get(`/genes`, { params: query });
  },
  findByNoList(queryNo) {
    return http.get(`/genes/active`, {
      params: {
        q: queryNo,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params);
      },
    });
  },
  findByNo(No) {
    return http.get(`/gene/${No}`);
  },
};
