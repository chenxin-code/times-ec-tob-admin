import * as login from "./login";
import * as portal from "./portal";
import * as cmsManagement from "./cmsManagement";
import * as market from "./market";
import * as suppiler from "./suppiler";

// 由一体化携带的token，当天有效- 4/25
let SmAuthorization =
  "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxMzcxOTI0OTk3NCIsInNjb3BlIjpbImFsbCJdLCJpZCI6MjI1ODI0NjAwOTg0MDczMDUxOCwiZXhwIjoxNjE5MzU2NjI5LCJhdXRob3JpdGllcyI6WyJidXRsZXJfZGlyZWN0b3IiLCJidXRsZXIiLCJzeXNfYWRtaW4iLCJhbnl0aW1lcyJdLCJqdGkiOiJkNjE1YTUyNC1kZTMzLTRlMmItYjgzMC1lNTk4Y2Y1MDhjMDEiLCJjbGllbnRfaWQiOiJ3ZWJfYiJ9.kOSbNRC-TT2TtcFCq0mcq6tr3nr3lelL0jexrYsKyBZdg0d7Aa_fUfHCKP2eLEWW0cNGBsxTR2ZANSrV-hqJPoG6ybdGs82u-JLGEswoeno1hpHh9jdp1bByKi02XGTpt7k9FUmX4pxsGLpk09hDZqT5zobDATAQlx2jX5IPqb-lqv70bN3emWnxPhag4msolDCoHDdF3P32ZyPUuOkMNbT0dh18V057lad8CQGzP913GcrR2-vku-Obv9puXQ86mX_opybA0iAQ6VOdxipHbduuGZoZFuLWUWuj7lsOeOLIuhxiroyssaKE2cANMSV8EDHcFHV6VZNweu63PF7JUg";

export default {
  ...login,
  ...portal,
  ...cmsManagement,
  ...market,
  ...suppiler,
  SmAuthorization,
};
