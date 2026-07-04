const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

// #region agent log
fetch('http://127.0.0.1:7688/ingest/48fa31b3-06f2-4b31-be74-84d918315c47',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'7985e6'},body:JSON.stringify({sessionId:'7985e6',location:'constant.js:init',message:'API base URL resolved',data:{baseUrl:BASE_URL,envUrl:import.meta.env.VITE_API_URL||null},timestamp:Date.now(),hypothesisId:'D',runId:'pre-fix'})}).catch(()=>{});
// #endregion

export const USER_API_END_POINT = `${BASE_URL}/api/v1/user`;
export const JOB_API_END_POINT = `${BASE_URL}/api/v1/job`;
export const APPLICATION_API_END_POINT = `${BASE_URL}/api/v1/application`;
export const COMPANY_API_END_POINT = `${BASE_URL}/api/v1/company`;
