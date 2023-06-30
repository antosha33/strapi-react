import ReactModal from 'react-modal';
import './style.css'

function Modal({ isOpen, title, children, closeModal }) {


    return (

        <ReactModal
            ariaHideApp={false}
            isOpen={isOpen}
            overlayRef={(sd) => { console.log(sd) }}
            onRequestClose={closeModal}
            style={{
                overlay: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(	114, 112, 112, 0.6)',
                    overflow:'auto',
                    zIndex:10
                },
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '0px',
                    border: '0px',
                    background: 'transparent',
                    overflow: 'visible'
                }
            }}

        >
            <div
                onClick={(ev) => ev.stopPropagation()}
                className='ReactModal__Content  bg-white w-[100%]  relative'>
                <span
                    onClick={closeModal}
                    className='w-[4rem] h-[4rem] absolute right-[1.8rem] top-[1.8rem]'>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M29.4281 27.071L22.357 20L29.4281 12.9289C29.7407 12.6164 29.9162 12.1924 29.9162 11.7504C29.9162 11.3084 29.7407 10.8844 29.4281 10.5719C29.1155 10.2593 28.6916 10.0837 28.2496 10.0837C27.8076 10.0837 27.3836 10.2593 27.0711 10.5719L20 17.643L12.9289 10.5719C12.6164 10.2593 12.1924 10.0837 11.7504 10.0837C11.3084 10.0837 10.8845 10.2593 10.5719 10.5719C10.2593 10.8844 10.0838 11.3084 10.0838 11.7504C10.0838 12.1924 10.2593 12.6164 10.5719 12.9289L17.643 20L10.5719 27.071C10.2593 27.3836 10.0838 27.8075 10.0838 28.2496C10.0838 28.6916 10.2593 29.1155 10.5719 29.4281C10.8845 29.7406 11.3084 29.9162 11.7504 29.9162C12.1924 29.9162 12.6164 29.7406 12.9289 29.4281L20 22.357L27.0711 29.4281C27.3836 29.7406 27.8076 29.9162 28.2496 29.9162C28.6916 29.9162 29.1155 29.7406 29.4281 29.4281C29.7407 29.1155 29.9162 28.6916 29.9162 28.2496C29.9162 27.8075 29.7407 27.3836 29.4281 27.071Z" fill="#727070" />
                    </svg>
                </span>
            
                {children}
            </div>
        </ReactModal>
    );
}

export default Modal;