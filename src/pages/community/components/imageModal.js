import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

const ImageModal = ({ show, image, handlehide }) => {
  return (
    <>
      <Dialog open={show} onClose={handlehide}>
        <DialogContent>
          <img src={image}></img>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handlehide}
            className='text-white font-bold bg-teal-600 rounded-md p-2 mt-2 mb-2 transition duration-500 ease-in-out hover:bg-teal-800 
            transform hover:-translate-y-1 hover:scale-110 subpixel-antialiased'>
            Close
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ImageModal;
