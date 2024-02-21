import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCategory, setPriceRange } from "../redux/Slices/filterSlice";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const Filter = () => {
  const dispatch = useDispatch();
  const { selectedCategories, priceRange } = useSelector(
    (state) => state.filterData
  );

  const handleCheckboxChange = (label, isChecked) => {
    dispatch(toggleCategory({ category: label, isChecked }));
  };

  const handlePriceRangeChange = (event, newValue) => {
    dispatch(setPriceRange(newValue));
  };

  return (
    <div style={{ width: "30%" }} className="sidebar">
      <h3>Filter Options</h3>
      <div className="filter-category">
        <h4 style={{ marginTop: "2em" }}>Category</h4>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedCategories.includes("Casual")}
                onChange={(e) =>
                  handleCheckboxChange("Casual", e.target.checked)
                }
              />
            }
            label="Casual"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedCategories.includes("Office")}
                onChange={(e) =>
                  handleCheckboxChange("Office", e.target.checked)
                }
              />
            }
            label="Office"
          />
        </FormGroup>
      </div>
      <div className="filter-price">
        <h4 style={{ marginTop: "1em" }}>Price Range</h4>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Typography variant="body1">${priceRange[0]}</Typography>
          </Grid>
          <Grid item xs>
            <Slider
              value={priceRange}
              onChange={handlePriceRangeChange}
              min={0}
              max={500}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item>
            <Typography variant="body1">${priceRange[1]}</Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Filter;
