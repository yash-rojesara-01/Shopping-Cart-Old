import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function DetailModal({ item, open, handleClose }) {
  // const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(false);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <React.Fragment>
      {/* <Button variant="outlined">open max-width dialog</Button> */}
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <DialogContentText>
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={4}>
                  <div className="">
                    <img src={item.image} className="object-cover p-4" />
                  </div>
                </Grid>
                <Grid item xs={8}>
                  <div className="p-8 space-y-4">
                    <div className="font-black text-lg">{item.title}</div>
                    <div className="text-blue-500">
                      <p>{item.category}</p>
                    </div>
                    <div className="text-2xl font-black text-green-700">
                      ${Number.parseInt(item.price)}
                    </div>
                    <div className="text-gray-700">{item.description}</div>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className="border border-red-700 rounded-md bg-red-200">
            <Button onClick={handleClose}>Close</Button>
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
