import outlayRowsApi from "./outlayRowsApi";

async function initializeEntity() {
  try {
    const entityId = await outlayRowsApi.createEntity();
    localStorage.setItem("entityId", entityId.toString()); //
    return entityId;
  } catch (error) {
    return Promise.reject(error);
  }
}

export default initializeEntity;
