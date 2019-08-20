import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { Chip } from "@material-ui/core"

const ChipList = ({ chips }) => {
  const [chipData, setChipData] = React.useState(chips);

  const handleDelete = chipToDelete => () => {
    setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
  };

  return chipData.map(data => {
    return (
      <Chip
        key={data.key}
        label={data.label}
        onDelete={handleDelete(data)}
      />
    );
  })
}

ChipList.propTypes = {
  chips: PropTypes.arrayOf(PropTypes.object),
}

ChipList.defaultProps = {
  chips: [],
}

export default ChipList
