import { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { snackbarActions } from "../../actions/snackbarActions";
import { getSnackbarSelector } from "../../selectors/snackbarSelectors";

let displayed = [];

const SnackbarNotifier = ({ notifications, removeSnackbar, children }) => {
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
  }, [notifications, closeSnackbar, enqueueSnackbar, removeSnackbar]);
  return { ...children };
};

SnackbarNotifier.propTypes = {
  notifications: PropTypes.array.isRequired,
  removeSnackbar: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

const mapStateToProps = state => ({
  notifications: getSnackbarSelector(state)
});

const actionCreators = {
  removeSnackbar: snackbarActions.removeSnackbar
};

export default connect(mapStateToProps, actionCreators)(SnackbarNotifier);
