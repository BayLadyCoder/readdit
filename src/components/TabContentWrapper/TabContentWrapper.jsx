import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const TabContentWrapper = (props) => {
  const { children, selectedTab, index, ...other } = props;

  return (
    <div hidden={selectedTab !== index} {...other}>
      {selectedTab === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default TabContentWrapper;
