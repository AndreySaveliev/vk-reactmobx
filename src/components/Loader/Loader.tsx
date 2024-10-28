import { Box, CircularProgress } from "@mui/joy";
import { useEffect, useRef } from "react";
import { PhotoList } from "../../mobx/store";
import { observer } from "mobx-react-lite";

const Loader = observer(({ store }: { store: PhotoList }) => {
  const pageRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (pageRef.current) {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          store.fetchPhotos();
        }
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [pageRef.current]);

  return (
    <Box
      ref={pageRef}
      sx={{
        width: "500px",
        height: "200px",
        alignContent: "center",
        mx: "auto",
        transform: "translateX(50%)",
      }}
    >
      {store.isLoading && <CircularProgress />}
    </Box>
  );
});

export default Loader;
