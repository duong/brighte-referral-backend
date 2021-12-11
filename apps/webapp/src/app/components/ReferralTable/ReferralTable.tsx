import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { ReactComponent as DeleteIcon } from '../../../assets/delete-24px.svg';
import { deleteReferralById } from '../../managers/api';
import { Referral } from '../../types/referral';
import { IconButton } from '../IconButton';
import { ReferralAddModal } from '../ReferralAddModal';
import { ReferralEditModal } from '../ReferralEditModal';
import style from './ReferralTable.module.css';

const TableHeadCell: React.FC = ({ children }) => (
  <TableCell classes={{ root: style.tableHeadCell }}>{children}</TableCell>
);

const TableBodyCell: React.FC = ({ children }) => (
  <TableCell classes={{ root: style.tableBodyCell }}>{children}</TableCell>
);

interface ActionBodyCellProps {
  onEditClick: () => void;
  onDeleteClick: () => void;
  referrals: Referral[];
  setReferrals: React.Dispatch<React.SetStateAction<Referral[]>>;
  referralId: number;
}

const ActionBodyCell: React.FC<ActionBodyCellProps> = ({
                                                         onEditClick,
                                                         onDeleteClick,
                                                         referrals,
                                                         setReferrals,
                                                         referralId,
                                                       }) => (
  <TableCell classes={{ root: style.actionBodyCell }}>
    <IconButton onClick={onEditClick}>
      <ReferralEditModal referrals={referrals} setReferrals={setReferrals} referralId={referralId} />
    </IconButton>
    <IconButton onClick={onDeleteClick}>
      <DeleteIcon />
    </IconButton>
  </TableCell>
);

interface ReferralTableProps {
  referrals: Referral[];
  setReferrals: React.Dispatch<React.SetStateAction<Referral[]>>;
}

const ReferralTable: React.FC<ReferralTableProps> = ({ referrals, setReferrals }) => {
  return (
    <TableContainer classes={{ root: style.container }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Given Name</TableHeadCell>
            <TableHeadCell>Surname</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Phone</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {referrals.map((referral) => (
            <TableRow key={referral.id}>
              <TableBodyCell>{referral.givenName}</TableBodyCell>
              <TableBodyCell>{referral.surName}</TableBodyCell>
              <TableBodyCell>{referral.email}</TableBodyCell>
              <TableBodyCell>{referral.phone}</TableBodyCell>
              <ActionBodyCell
                referrals={referrals}
                setReferrals={setReferrals}
                referralId={referral.id}
                onEditClick={() => {
                  console.log(`Edit referral ${referral.id} clicked`);
                }
                }
                onDeleteClick={() => {
                  console.log(`Delete referral ${referral.id} clicked`);
                  Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      console.log('submitting referral', referral);
                      let res
                      try {
                        res = await deleteReferralById(referral.id)
                      } catch (error) {
                        console.error(error)
                        Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          text: 'Something went wrong when trying to delete the referral. Please try again another time.',
                        })
                        return 
                      }

                      Swal.fire(
                        'Deleted!',
                        'Referral has been deleted.',
                        'success'
                      )
                      setReferrals(referrals.filter(e => e.id !== referral.id))
                    }
                  })
                }
                }
              />
            </TableRow>
          ))}
          <TableRow key="add-modal">
            <TableBodyCell>
              <ReferralAddModal referrals={referrals} setReferrals={setReferrals} />
            </TableBodyCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { ReferralTable };
