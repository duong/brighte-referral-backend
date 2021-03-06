import { DialogTitle, FormControl } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import Swal from 'sweetalert2';

import { ReactComponent as EditIcon } from '../../../assets/create-24px.svg';
import { updateReferral } from '../../managers/api';
import { errorMessage } from '../../types/errorMessage';
import { Referral } from '../../types/referral';
import { ReferralInput } from '../../types/referralInput';
import { IconButton } from '../IconButton';

interface ReferralEditModalProps {
  referrals: Referral[];
  setReferrals: React.Dispatch<React.SetStateAction<ReferralInput[]>>;
  referralId: number;
}

const ReferralEditModal: React.FC<ReferralEditModalProps> = ({ referrals, setReferrals, referralId }) => {
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [errorMessages, setErrorMessages] = React.useState({});

  const referralInit = referrals && referrals.length > 0 ? referrals.find(e => e.id === referralId) : null

  const [referral, setReferral] = React.useState<ReferralInput>(referralInit);
  
  const updateErrorMessages = (errors: errorMessage[] ) => {
    const newErrorMessages = {}
    for (let i = 0; i < errors.length; i++) {
      const error = errors[i]
      const parts = error.param.split('.')
      const param = parts[1]
      newErrorMessages[param] = error.msg
    }
    setErrorMessages(newErrorMessages)
  }

  const handleClickOpen = () => {
    setSubmitted(false)
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
    
    console.log('submitting referral', referral);
    let res
    try {
      res = await updateReferral(referral, referralId)
    } catch (e) {
      const { response: { status, data: { errors }}} = e
      console.log(errors)
      if (status === 400) {
        updateErrorMessages(errors)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong when trying to update your referral. Please try again another time.',
        })
        setOpen(false);
      }
      setSubmitting(false)
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
              error={submitted && errorMessages['givenName']}
              helperText={errorMessages['givenName'] || "Required"}
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
              error={submitted && errorMessages['surName']}
              helperText={errorMessages['surName'] || "Required"}
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
              error={submitted && errorMessages['email']}
              helperText={errorMessages['email'] || "Required"}
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
              error={submitted && errorMessages['phone']}
              helperText={errorMessages['phone'] || "Required"}
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
