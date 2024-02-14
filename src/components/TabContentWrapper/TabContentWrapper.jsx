import Box from '@mui/material/Box';

const TabContentWrapper = (props) => {
  const { children, selectedTab, index, ...other } = props;

  return (
    <div hidden={selectedTab !== index} {...other}>
      {selectedTab === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export default TabContentWrapper;
