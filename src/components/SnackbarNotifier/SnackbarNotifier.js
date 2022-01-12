import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { snackbarActions } from "../../actions/snackbarActions";
import { getSnackbarSelector } from "../../selectors/snackbarSelectors";
import { getUserSelector } from "../../selectors/userSelectors";
import { getErrorsSelector } from "../../selectors/errorSelectors";

let displayed = [];

const SnackbarNotifier = ({
  notifications,
  user,
  removeSnackbar,
  errors,
  children
}) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = id => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = id => {
    displayed = [...displayed.filter(key => id !== key)];
  };

  useEffect(() => {
    notifications.forEach(
      ({ key, message, options = {}, dismissed = false }) => {
        if (dismissed) {
          // dismiss snackbar using notistack
          closeSnackbar(key);
          return;
        }

        // do nothing if snackbar is already displayed
        if (displayed.includes(key)) return;

        // display snackbar using notistack
        enqueueSnackbar(message, {
          key,
          ...options,
          onClose: (event, reason, myKey) => {
            if (options.onClose) {
              options.onClose(event, reason, myKey);
            }
          },
          onExited: (event, myKey) => {
            // remove this snackbar from redux store
            removeSnackbar(myKey);
            removeDisplayed(myKey);
          }
        });

        // keep track of snackbars that we've displayed
        storeDisplayed(key);
      }
    );
  }, [notifications, closeSnackbar, enqueueSnackbar]);
  return { ...children };
};

const mapStateToProps = state => ({
  user: getUserSelector(state),
  notifications: getSnackbarSelector(state),
  errors: getErrorsSelector(state)
});

const actionCreators = {
  removeSnackbar: snackbarActions.removeSnackbar
};

export default connect(mapStateToProps, actionCreators)(SnackbarNotifier);
