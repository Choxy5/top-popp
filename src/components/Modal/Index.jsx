import './style.css';
import { motion } from 'framer-motion';
import { Overlay } from '../Overlay/Index';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import PlayAudio from 'react-simple-audio-player';

// Animation for Modal component
const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 100,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
};

// Converting seconds to minutes and seconds
const formatter = (seconds = 0) => {
  const d = Number(seconds);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);
  const mDisplay =
    m > 0 ? `${m.toString().length > 1 ? `${m}` : `${0}${m}`}` : '00';
  const sDisplay =
    s > 0 ? `${s.toString().length > 1 ? `${s}` : `${0}${s}`}` : '00';
  return `${mDisplay}:${sDisplay}`;
};

export function Modal({ handleClose, popupContent }) {
  return (
    <Overlay onClick={handleClose}>
      {popupContent.map((pop) => (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="modal"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          key={pop.id}
        >
          <div className="left">
            <img src={pop.album.cover_big} alt="" />
          </div>
          <div className="right">
            <div className="right_top">
              <p>#{pop.position}</p>
              <AiOutlineCloseCircle
                cursor="pointer"
                fontSize={25}
                onClick={handleClose}
              ></AiOutlineCloseCircle>
            </div>
            <h1>{pop.title}</h1>
            <p>{pop.artist.name}</p>
            <span>Duration: {formatter(pop.duration)}</span>

            <PlayAudio width="40px" url={pop.preview} />
          </div>
        </motion.div>
      ))}
    </Overlay>
  );
}
