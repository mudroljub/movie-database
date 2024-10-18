const btnStyle = {
  background: '#1A1A1A',
  border: 0,
  color: 'inherit',
  cursor: 'pointer',
  height: 40,
  marginRight: 8,
  marginBottom: 8,
  width: 40,
}

const Pagination = ({ data, pageSize, currentPage, setCurrentPage }) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(data.length / pageSize); i++) {
    pageNumbers.push(i)
  }

  return (
    <div style={{ marginTop: 8 }}>
      {pageNumbers.map(num => (
        <button
          key={num}
          style={{ ...btnStyle, outline: currentPage === num ? '2px solid #5799EF' : 'none' }}
          onClick={() => setCurrentPage(num)}
          tabIndex="-1"
        >
          {num}
        </button>
      ))}
    </div>
  )
}

export default Pagination
