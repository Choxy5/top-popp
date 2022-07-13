import { useEffect, useState } from 'react';
import './style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal } from '../../components/Modal/Index';
import axios from 'axios';

const url = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart';

export function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [popupContent, setPopupContent] = useState([]);
  const [sortType, setSortType] = useState('');

  const close = () => setModalOpen(false);

  const changeContent = (song) => {
    setPopupContent([song]);
    setModalOpen(true);
  };

  // Fetching data
  useEffect(() => {
    const doFetch = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setData(res.data.tracks.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    doFetch();
  }, []);

  // Sorting data
  useEffect(() => {
    const handleSort = (value) => {
      if (value === 'longest') {
        let longest = [...data].sort((a, b) => b.duration - a.duration);
        setData(longest);
      } else if (value === 'shortest') {
        let shortest = [...data].sort((a, b) => a.duration - b.duration);
        setData(shortest);
      } else {
        return 0;
      }
    };
    handleSort(sortType);
  }, [sortType]);

  if (loading) return <h3 className="loading">Loading...</h3>;

  if (error) return <h3 className="error">Something went wrong!</h3>;

  return (
    <div className="app">
      <h1>Top 10 trending songs on Deezer</h1>
      <div className="container">
        <div className="select">
          <h3>Duration songs:</h3>
          <select
            disabled={loading}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="default">-</option>
            <option value="longest">Longest</option>
            <option value="shortest">Shortest</option>
          </select>
        </div>

        {data.map((song) => (
          <div className="container_flex" key={song.id}>
            <motion.div
              className="container_songs"
              onClick={() => changeContent(song)}
              key={song.id}
            >
              <span>#{song.position}</span>
              <p key={song.id}>{song.title}</p>
            </motion.div>

            <AnimatePresence
              initial={false}
              exitBeforeEnter={true}
              onExitComplete={() => null}
            >
              {modalOpen && (
                <Modal popupContent={popupContent} handleClose={close} />
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
