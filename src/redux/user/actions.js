import { POST_DATA } from "./types";

// 리덕스 상태에 로그인한 회원 정보를 저장하기 위함.
export const postData = (data) => {
  return {
    type: POST_DATA,
    payload: data,
  };
};
