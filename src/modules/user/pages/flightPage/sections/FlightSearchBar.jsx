import { FlightSearchBarShared } from "../../../components";

export const FlightSearchBar = ({ onSearch, initialValues }) => {
  return (
    <FlightSearchBarShared
      mode="flights"
      onSearch={onSearch}
      initialValues={initialValues}
    />
  );
};
