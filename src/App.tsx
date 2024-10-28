import { useEffect } from "react";
import { PhotoList } from "./mobx/store";
import { observer } from "mobx-react-lite";
import { Box } from "@mui/joy";
import Sort from "./components/Sort/Sort";
import Loader from "./components/Loader/Loader";
import List from "./components/List/List";
const store = new PhotoList();
const App = observer(() => {
  useEffect(() => {
    store.fetchPhotos();
  }, []);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", position: "relative" }}
    >
      <Sort store={store} />
      <List store={store} />
      <Loader store={store} />
    </Box>
  );
});

export default App;
