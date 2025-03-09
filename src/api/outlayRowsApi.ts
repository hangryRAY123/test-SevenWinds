import httpClient from "./httpClient";
import getEntityId from "../helpers/getEntityId";
import { FormData } from "../types";

const outlayRowsApi = {
  deleteRow: async function (rID: number) {
    const eID = getEntityId();
    const response = await httpClient.delete(
      `/v1/outlay-rows/entity/${eID}/row/${rID}/delete`
    );
    return response.data;
  },
  updateRow: async function (rID: number, data: FormData) {
    const eID = getEntityId();
    const response = await httpClient.post(
      `/v1/outlay-rows/entity/${eID}/row/${rID}/update`,
      data
    );
    return response.data;
  },
  createRowInEntity: async function (data: FormData) {
    const eID = getEntityId();
    const response = await httpClient.post(
      `/v1/outlay-rows/entity/${eID}/row/create`,
      data
    );
    return response.data;
  },
  getTreeRows: async function () {
    const eID = getEntityId();
    const response = await httpClient.get(
      `/v1/outlay-rows/entity/${eID}/row/list`
    );
    return response.data;
  },
  createEntity: async function () {
    const response = await httpClient.post("/v1/outlay-rows/entity/create");
    return response.data.id;
  },
};

export default outlayRowsApi;
