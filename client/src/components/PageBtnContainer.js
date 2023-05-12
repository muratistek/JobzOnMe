import { useSelector, useDispatch } from 'react-redux'
import { changePageThunk } from '../redux/slices/job/jobThunk'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import Wrapper from "../assets/wrappers/PageBtnContainer"

export default function PageBtnContainer() {
  const dispatch = useDispatch();
  const { numOfPages, page } = useSelector(state => state.job)
  const { theme } = useSelector(state => state.theme)

  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1)

  const prevPage = () => {
    let newPage = page - 1

    if (newPage < 1) newPage = numOfPages

    changePageThunk(dispatch, { page: newPage })
  }

  const nextPage = () => {
    let newPage = page + 1

    if (newPage > numOfPages) newPage = 1

    changePageThunk(dispatch, { page: newPage })
  }

  return (
    <Wrapper bgColor={theme === "dark" ? "#353535" : "#fff"} textColorHover={theme === "dark" ? "#353535" : "#fff"} pageBtnColor={theme === "dark" ? "#57b4f2" : "#a0d5f8"} btnTextColor={theme === 'dark' ? "#0074D9" : "#209CEE"}>
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
            onClick={() => changePageThunk(dispatch, { page: pageNum })}
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
