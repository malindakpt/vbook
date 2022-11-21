import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { FC, useState } from "react";
import { removeSpecialCharactorsAndCapitalize } from "../../util/helper";
import { IconButton } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
      "&:focus": {
        width: "35ch",
      },
    },
  },
}));

interface Props {
  searchKey: string;
  onSearch: (key: string) => void;
}
export const SearchBox: FC<Props> = ({ searchKey, onSearch }) => {
  const [keyword, setKeyword] = useState(searchKey);

  return (
    <Search>
      {/* <SearchIconWrapper> */}
      {/* <SearchIcon
          onClick={() => removeSpecialCharactorsAndCapitalize(keyword)}
        /> */}
      {/* </SearchIconWrapper> */}
      <StyledInputBase
        value={keyword}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        // onBlur={invokeSearch}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyPress={(ev) => {
          if (ev.key === "Enter") {
            // Do code here
            ev.preventDefault();
            onSearch(removeSpecialCharactorsAndCapitalize(keyword));
          }
        }}
        endAdornment={
          <IconButton
            style={{
              color: "white",
            }}
            onClick={() =>
              onSearch(removeSpecialCharactorsAndCapitalize(keyword))
            }
          >
            <SearchIcon />
          </IconButton>
        }
      />
    </Search>
  );
};
