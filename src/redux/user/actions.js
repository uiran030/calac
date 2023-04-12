import { SET_HAS_SID_COOKIE } from "./types";

export const setHasSidCookie = (hasSidCookie) => ({
  type: SET_HAS_SID_COOKIE,
  payload: hasSidCookie,
});
