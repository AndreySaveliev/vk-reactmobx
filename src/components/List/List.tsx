import { AspectRatio, Button, Card, CardOverflow, Grid } from "@mui/joy";
import { observer } from "mobx-react-lite";
import { PhotoList } from "../../mobx/store";

const List = observer(({ store }: { store: PhotoList }) => {
  return (
    <Grid
      container
      columns={{ xs: 2, sm: 4, md: 8 }}
      sx={{
        mx: "auto",
        height: "auto",
        width: "auto",
        justifyContent: "center",
      }}
      spacing={1}
    >
      {store.photos &&
        store.photos.map((photo) => {
          return (
            <Grid
              key={photo.id}
              sx={{
                display: "flex",
                maxHeight: "700px",
                overflow: "hidden",
                width: "fit-content",
              }}
            >
              <Card sx={{ minWidth: 300 }}>
                <CardOverflow>
                  <AspectRatio>
                    <img
                      src={photo.url}
                      alt={photo.slug}
                      className="photo__img"
                    />
                  </AspectRatio>
                </CardOverflow>
              </Card>
              <Button onClick={() => store.deletePhoto(photo.id)}>
                Delete
              </Button>
            </Grid>
          );
        })}
    </Grid>
  );
});

export default List;
