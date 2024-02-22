import { Response } from "express";
export default {
    successResponseWithoutData(res : Response, message : string, code :number) {
        const response = {
          data: null,
          meta: {
            code,
            message,
          },
        };
        return res.send(response);
      },
      errorResponseWithoutData(res : Response, message : string, code = 0) {
        const response = {
          data: null,
          meta: {
            code,
            message,
          },
        };
        return res.send(response);
      },
}