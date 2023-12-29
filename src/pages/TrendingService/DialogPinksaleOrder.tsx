import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import * as yup from 'yup';
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import useOrders from "../../hooks/useOrders";
import { IOrderItem } from '../../utils/interfaces'

interface IProps {
  isOpened: boolean;
  handleClose: Function;
  orderData: IOrderItem;
}

const validSchema = yup.object().shape({
  lunchpad_link: yup.string().required('Please input the link of pinksale lunchpad.')
});

export default function DialogPinksaleOrder({ isOpened, handleClose, orderData }: IProps) {
  const { addOrderItemToCart } = useOrders()

  const formik = useFormik({
    initialValues: {
      lunchpad_link: ''
    },
    validationSchema: validSchema,
    onSubmit: (values) => {
      let { lunchpad_link } = values
      addOrderItemToCart({
        ...orderData,
        lunchpad_link
      })
      handleClose()
    }
  })

  return (
    <Dialog open={isOpened} onClose={() => handleClose()} fullWidth maxWidth="sm">
      <DialogTitle sx={{ py: 2, px: 3 }}>
        Please fill in the input fields
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} py={2}>
          <TextField
            name="lunchpad_link"
            label="Pinksale lunchpad link"
            placeholder="https://www.pinksale.finance/launchpad/0x020d4f67581c95bf9916592024b475410791b55b?chain=BSC"
            value={formik.values.lunchpad_link}
            onChange={formik.handleChange}
            error={formik.touched.lunchpad_link && Boolean(formik.errors.lunchpad_link)}
            helperText={
              formik.touched.lunchpad_link && formik.errors.lunchpad_link ? (
                <Typography
                  component="span"
                  sx={{ display: 'flex', alignItems: 'center', mx: 0 }}
                >
                  <Icon icon="bxs:error-alt" />&nbsp;
                  {formik.touched.lunchpad_link && formik.errors.lunchpad_link}
                </Typography>
              ) : (<></>)
            }
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ py: 2, px: 3 }}>
        <Button onClick={() => formik?.handleSubmit()} variant="contained">
          Order
        </Button>
      </DialogActions>
    </Dialog>
  )
}