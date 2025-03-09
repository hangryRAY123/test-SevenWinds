function getEntityId(): number {
  const entityId = localStorage.getItem("entityId");
  if (!entityId) {
    throw new Error(
      "ENTITY_ID is not initialized. Please create an entity first."
    );
  }
  return Number(entityId);
}

export default getEntityId;
