import * as React from 'react';
import axios from 'axios'
import Swal from 'sweetalert2'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { DialogTitle, FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';
import { ReactComponent as AddIcon } from '../../../assets/add-24px.svg';
import { ReferralInput } from '../../types/referralInput';

const referralInit = {
  givenName: '',
  surName: '',
  email: '',
  phone: '',
}

export default function ReferralAddModal() {
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [referral, setReferral] = React.useState<ReferralInput>(referralInit);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setReferral(referralInit)
    setOpen(false);
  };

  const handleSubmit = async () => {
    setSubmitted(true)
    setSubmitting(true)

    const { givenName, surName, email, phone } = referral

    // Check fields are filled
    if (!givenName || !surName || !email || !phone) {
      setSubmitting(false)
      return
    }
    
    console.log('submitting referral', referral);
    let res
    try {
      res = await axios.post('http://localhost:3333/referrals', { referral })
    } catch (error) {
      console.error(error)
      setOpen(false);
      setSubmitting(false)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong when trying to create your referral. Please try again another time.',
      })
      return 
    }
    console.log(res)
    setOpen(false);
    setSubmitting(false)
    setReferral(referralInit)
  };

  const handleChange =
    (prop: keyof ReferralInput) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setReferral({ ...referral, [prop]: event.target.value });
    };

  return (
    <div>
      <Button onClick={handleClickOpen} variant="outlined" endIcon={<AddIcon />}>
        Create new
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create new referral</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new referral, please enter their details here.
          </DialogContentText>
          <FormControl fullWidth>
            <TextField
              autoFocus
              margin="dense"
              id="givenName"
              label="Given Name"
              variant="outlined"
              onChange={handleChange('givenName')}
              error={submitted && !referral.givenName}
              helperText="Required"
              disabled={submitting}
            />
            <TextField
              autoFocus
              margin="dense"
              id="surName"
              label="Surname"
              variant="outlined"
              onChange={handleChange('surName')}
              error={submitted && !referral.surName}
              helperText="Required"
              disabled={submitting}
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              onChange={handleChange('email')}
              error={submitted && !referral.email}
              helperText="Required"
              disabled={submitting}
            />
            <TextField
              autoFocus
              margin="dense"
              id="phone"
              label="Phone Number"
              fullWidth
              variant="outlined"
              onChange={handleChange('phone')}
              error={submitted && !referral.phone}
              helperText="Required"
              disabled={submitting}
            />
            </FormControl>
          <DialogContentText>
            You can still edit their details later.
          </DialogContentText>
          </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={submitting}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export { ReferralAddModal };