import outlayRowsApi from "./outlayRowsApi";

async function initializeEntity() {
  try {
    const entityId = await outlayRowsApi.createEntity();
    localStorage.setItem("entityId", entityId.toString()); //
    return entityId;
  } catch (error) {
    console.error("Failed to create entity:", error);
    throw error;
  }
}

export default initializeEntity;
