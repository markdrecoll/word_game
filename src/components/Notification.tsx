import Toast from 'react-bootstrap/Toast';
import ToastContainer, { ToastPosition } from 'react-bootstrap/ToastContainer';

const Notification = (props: {
    variant?: string,
    header?: boolean,
    headerText?: string,
    message: string,
    position?: ToastPosition,
    class?: string,
    delay?: number,
    show?: boolean,
    setShow: any
}) => {

    return (
        <ToastContainer
          className={props.class}
          position={props.position}
          style={{ zIndex: 1 }}
        >
          <Toast
            onClose={props.setShow}
            show={props.show}
            delay={props.delay}
            autohide
            bg={props.variant}
          >
            {props.header &&
              <Toast.Header closeButton={false}>
                <strong className="text-center">{props.headerText}</strong>
              </Toast.Header>
            }
            <Toast.Body className="text-white text-center">{props.message}</Toast.Body>
          </Toast>
        </ToastContainer>
    )
}

export default Notification;