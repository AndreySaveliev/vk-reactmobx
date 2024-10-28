import { Option, Select } from "@mui/joy";
import React from "react";
import { PhotoList } from "../../mobx/store";

function Sort({ store }: { store: PhotoList }) {
  const handleChangeSort = (
    e: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    console.log(newValue);
    if (newValue == "old") {
      store.sortFromOldToNew();
    } else {
      store.sortFromNewToOld();
    }
    console.log(store.photos);
  };

  return (
    <Select
      sx={{ width: "250px", my: "25px" }}
      onChange={handleChangeSort}
      placeholder="select sort"
    >
      <Option value="old">Date: Old to New</Option>
      <Option value="new">Date: New to Old</Option>
    </Select>
  );
}

export default Sort;
