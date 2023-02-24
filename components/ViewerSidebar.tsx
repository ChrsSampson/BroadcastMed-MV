// side bar for adding encoders to the viewer
import {Box, Button, TextField, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import EncoderManager from "./EncoderManager";

export default function ({toggleDrawer, addEncoder, laptops, radius, desktops, enclosures} : {toggleDrawer: () => void, addEncoder: Function, laptops: Object[], radius: Object[], desktops: Object[], enclosures: Object[]} ) {
    return (
        <Box sx={{
                width: '30em',
                height: '100vh'
            }}
            onMouseLeave={() => toggleDrawer()}
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                padding: '1rem'
            }}>
                <Button color="error" variant="contained" onClick={() => toggleDrawer()}>
                    <CloseIcon />
                </Button>
            </Box>
            {/* managers */}
            <Box>
                <EncoderManager encoders={desktops} tag="Desktop Encoders" addEncoder={addEncoder} />
                <EncoderManager encoders={laptops} tag="Laptop Encoders" addEncoder={addEncoder} />
                <EncoderManager encoders={radius} tag="Radius" addEncoder={addEncoder} />
                <EncoderManager encoders={enclosures} tag="Enclosures" addEncoder={addEncoder} />
            </Box>
        </Box>
    )
}
