// imports of responses
// import { success, dataFound, noData, failed, servError, invalidInput, sentData, resp } from '@/app/api/responses' 
// import { resp } from '@/app/api/responses' 

export function success(message = "Done!", data = [], others = {}) {
  return Response.json(
    { data, message, success: true, others: { ...others } },
    { status: 200 }
  );
}

export function dataFound(data = [], message = "Data Found", others = {}) {
  return Response.json(
    { data, message, success: true, others: { ...others } },
    { status: 200 }
  );
}

export function noData(message = "No data", others = {}) {
  return Response.json(
    { data: [], message, success: true, others: { ...others } },
    { status: 200 }
  );
}

export function failed(message = "Something Went Wrong! Please Try Again", others = {}) {
  return Response.json(
    { data: [], message, success: false, others: { ...others } },
    { status: 400 }
  );
}

export function servError(e, message = "Request Failed", others = {}) {
  console.error(e);
  return Response.json(
    { data: [], message, success: false, others: { Error: e, ...others } },
    { status: 500 }
  );
}

export function invalidInput(message = "Invalid request", others = {}) {
  return Response.json(
    { data: [], message, success: false, others: { ...others } },
    { status: 400 }
  );
}

export function sentData(data = []) {
  return data.length > 0 ? dataFound(data) : noData();
}

export const resp = {
  success, dataFound, noData, failed, servError, invalidInput, sentData
}


