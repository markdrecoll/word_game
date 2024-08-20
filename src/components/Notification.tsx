import Toast from 'react-bootstrap/Toast';
import ToastContainer, { ToastPosition } from 'react-bootstrap/ToastContainer';

const Notification = (props: {
    variant: string,
    header: string,
    message: string,
    position?: ToastPosition,
    show: boolean,
    setShow: any
}) => {

    return (
        <ToastContainer
          className="mt-4 pt-5"
          position={props.position}
          style={{ zIndex: 1 }}
        >
          <Toast
            onClose={props.setShow}
            show={props.show}
            delay={3000}
            autohide
            bg={props.variant}
          >
            <Toast.Header closeButton={false}>
              <strong className="text-center">{props.header}</strong>
            </Toast.Header>
            <Toast.Body className="text-white text-center">{props.message}</Toast.Body>
          </Toast>
        </ToastContainer>
    )
}

export default Notification;