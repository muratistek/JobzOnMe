import { useSelector, useDispatch } from 'react-redux'
import { changePageThunk } from '../redux/slices/stat/statThunk'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import Wrapper from "../assets/wrappers/PageBtnContainer"

export default function PageBtnContainer() {
  const dispatch = useDispatch();
  const { numOfPages, page } = useSelector(state => state.stat)

  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1)

  const prevPage = () => {
    let newPage = page - 1

    if (newPage < 1) newPage = numOfPages

    changePageThunk(dispatch, newPage)
  }

  const nextPage = () => {
    let newPage = page + 1

    if (newPage > numOfPages) newPage = 1

    changePageThunk(dispatch, newPage)
  }

  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNum) => (
          <button
            key={pageNum}
            type="button"
            className={pageNum === page ? 'pageBtn active' : 'pageBtn'}
            onClick={() => changePageThunk(dispatch, pageNum)}
          >
            {pageNum}
          </button>))}
      </div>
      <button className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}
