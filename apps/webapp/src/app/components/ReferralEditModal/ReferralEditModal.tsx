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
import { ReactComponent as EditIcon } from '../../../assets/create-24px.svg';
import { ReferralInput } from '../../types/referralInput';
import { Referral } from '../../types/referral';
import { IconButton } from '../IconButton';

interface ReferralEditModalProps {
  referrals: Referral[];
  setReferrals: React.Dispatch<React.SetStateAction<Referral[]>>;
  referralId: number;
}

const ReferralEditModal: React.FC<ReferralEditModalProps> = ({ referrals, setReferrals, referralId }) => {
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const referralInit = referrals && referrals.length > 0 ? referrals.find(e => e.id === referralId) : null

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
      res = await axios.put(`http://localhost:3333/referrals/${referralId}`, { referralInput: referral })
    } catch (error) {
      console.error(error)
      setOpen(false);
      setSubmitting(false)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong when trying to update your referral. Please try again another time.',
      })
      return 
    }
    console.log(res)
    Swal.fire(
      'Success',
      `Successfully updated referral ${referral.email}`,
      'success'
    )
    setOpen(false);
    setSubmitting(false);
    const newReferrals = referrals.map(e => e.id === referralId ? referral : e)
    setReferrals(newReferrals)
  };

  const handleChange =
    (prop: keyof ReferralInput) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setReferral({ ...referral, [prop]: event.target.value });
    };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit referral</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit a referral, please update their details here.
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
              value={referral.givenName}
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
              value={referral.surName}
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
              value={referral.email}
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
              value={referral.phone}
            />
          </FormControl>
          <DialogContentText>
            You can still edit their details later.
          </DialogContentText>
          </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={submitting}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export { ReferralEditModal };
