import { Info, PlayCircleFilled } from '@material-ui/icons'
import { useState } from 'react'
import { requests } from '../../api/requests'
import useModal from '../../store/useModal'
import useVideo from '../../store/useVideo'
import Modal from '../Modal/Modal'
import Video from '../Video/Video'
import './MovieCard.scss'

export default function MovieCard({data}) {
    const [movieId, setMovieId] = useState([])
    const [openModal, setOpenModal] = useModal()
    const [openVideo, setOpenVideo] = useVideo()

    return (
        <>
            <div className='movie-card'>
                <img 
                    className="image"
                    src={requests.billboardImage + data?.backdrop_path} 
                    alt={data?.name || data?.title}
                />
                <div className="button-box">
                    <PlayCircleFilled 
                        className="play" 
                        onClick={() => {
                            setOpenVideo(true)
                            setMovieId(data)
                        }} 
                    />
                    <Info 
                        className="info" 
                        type="button" 
                        onClick={() => {
                            setOpenModal(true)
                            setMovieId(data)
                        }} 
                    />
                </div>
            </div>
            {openModal && <Modal data={movieId} setOpenModal={setOpenModal} />}
            {openVideo && <Video setOpenVideo={setOpenVideo} data={data} /> }
        </>
    )
}