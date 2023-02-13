import { Dialog, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { resetErrorRequest } from "../../store/weather/actions";
import { getErrorSelector } from "../../store/weather/selectors";


import './error-modal.css'

const ErrorModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const error = useSelector(getErrorSelector);
  const dispatch = useDispatch();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) {
      dispatch(resetErrorRequest());
    }
  };

  useEffect(() => {
    setIsModalOpen(error !== undefined && error !== null && error.length > 0);
  }, [error])

  return (
    <>
      {isModalOpen && (
        <Dialog onClose={toggleModal} open={isModalOpen}>
          <DialogTitle>An error occured</DialogTitle>
          <div className="modal-content">
            <p>{error}</p>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default ErrorModal;