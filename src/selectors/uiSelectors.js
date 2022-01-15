export const checkIfLoading = (store, ...actionsToCheck) =>
  store.uiState.loader.actions.some((action) =>
    actionsToCheck.includes(action.name)
  );

export const checkIfRefreshing = (store, actionToCheck) =>
  store.ui.loader.refreshing.some((action) => action === actionToCheck);

export const getUpdatingItemIds = (store, actionToCheck) => {
  const updatingIds = store.ui.loader.actions
    .filter(
      (action) =>
        action.name === actionToCheck &&
        (Number.isInteger(action.params?.id) ||
          typeof action.params?.id === "string")
    )
    .map((action) => action.params.id);
  return updatingIds;
};
