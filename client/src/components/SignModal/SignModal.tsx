import { useEffect, useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { Trip } from '../../api/trip.api';
import { dateToString } from '../../util/dateToString';

interface SignModalProps {
  trip?: Trip;
  isOpen: boolean;
  setIsOpen: (newVal: boolean) => void;
}

// TODO: Move this to a type defs area
interface Signature {
  startDate: string;
  endDate: string;
  file?: File;
}

const SignModal = ({ trip, isOpen, setIsOpen }: SignModalProps) => {
  const [signature, setSignature] = useState<Signature>({
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    if (trip) {
      setSignature({
        startDate: dateToString(new Date(trip.startDate)),
        endDate: dateToString(new Date(trip.endDate)),
      });
    } else {
      setSignature({
        startDate: '',
        endDate: '',
      });
    }
  }, [trip]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Sign Guestbook</ModalHeader>
      <ModalBody>
        <Form action={`/api/trip/${trip?.id ?? ''}/sign`} method="POST">
          <FormGroup>
            <Label for="startDate">When did you arrive?</Label>
            <Input
              required
              id="startDate"
              name="startDate"
              type="date"
              value={signature.startDate}
              onChange={(e) => {
                setSignature({
                  ...signature,
                  startDate: e.target.value,
                });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="endDate">When did you leave?</Label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              value={signature.endDate}
              onChange={(e) => {
                setSignature({
                  ...signature,
                  endDate: e.target.value,
                });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="guestbookImage">Guestbook Image</Label>
            <Input
              id="guestbookImage"
              name="guestbookImage"
              type="file"
              onChange={(e) => {
                console.log(e.target.files);
              }}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>
          Submit
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default SignModal;
