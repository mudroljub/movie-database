const style = {
  background: 'transparent',
  border: 0,
  cursor: 'pointer',
}

const Favorite = ({ inFavorites, onClick }) => {

  const star = inFavorites
    ? <span className="star-full">&#9733;</span>
    : <span className="star-empty">&#9734;</span>

  return (
    <button style={style} onClick={onClick}>
      {star}
    </button>
  )
}

export default Favorite