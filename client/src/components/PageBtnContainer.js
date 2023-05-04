import { useAppContext } from "../context/appContext"
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import Wrapper from "../assets/wrappers/PageBtnContainer"

export default function PageBtnContainer() {
  const { numOfPages, page } = useAppContext()

  const prevPage = () => {
    console.log("Previous page")
  }

  const nextPage = () => {
    console.log("Next Page")
  }

  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">buttons</div>
      <button className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}
