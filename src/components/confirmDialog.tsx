import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { FC } from "react";

interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({ isOpen, title, message, onConfirm, onCancel }) => {
    const handleConfirm = () => {
        onConfirm();
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <Dialog open={isOpen} >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {message}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
