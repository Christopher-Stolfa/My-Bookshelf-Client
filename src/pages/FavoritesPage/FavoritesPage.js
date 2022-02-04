import React, { useEffect } from "react";
import { connect } from "react-redux";
import { routes } from "../../config";
import PropTypes from "prop-types";
import { getUserSelector } from "../../selectors/userSelectors";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { getTotalFavoritesSelector } from "../../selectors/bookSelector";
import { CustomPagination } from "../../components/Pagination/";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LoadingCard from "../../components/Loaders/LoadingCard";

const FavoritesPage = ({ totalItems, user: { loggedIn } }) => {
  const { pageNum, bookId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    !loggedIn && navigate(routes.sign);
  }, [loggedIn]);

  return (
    <Box>
      {!pageNum && (
        <Box>
          <Typography variant="h4">Loading...</Typography>
          <Stack spacing={2}>
            {Array.from(
              { length: totalItems >= 10 ? 10 : totalItems },
              () => new Date().getTime() + Math.random()
            ).map((key, i) => (
              <div key={`${key}-${i}`}>
                <LoadingCard key={`${key}-${i}-favorite-card`} />
                <Divider
                  sx={{ marginTop: "8px", marginBottom: "8px" }}
                  key={`${key}-${i}-divider`}
                />
              </div>
            ))}
          </Stack>
        </Box>
      )}
      <Outlet />
      {!bookId && <CustomPagination totalItems={totalItems} />}
    </Box>
  );
};

FavoritesPage.propTypes = {
  favorites: PropTypes.arrayOf(
    PropTypes.shape({ googleBooksId: PropTypes.string })
  ),
  user: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  totalItems: getTotalFavoritesSelector(state),
  user: getUserSelector(state)
});

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(FavoritesPage);
