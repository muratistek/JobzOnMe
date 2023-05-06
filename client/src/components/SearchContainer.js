import React, { useState, useMemo } from 'react'
import { FormRow, FormRowSelect } from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'

export default function SearchContainer() {
  const { isLoading, searchStatus, searchType, sort, sortOptions, handleChange, clearFilters, jobTypeOptions, statusOptions } = useAppContext()

  const [localSearchValue, setLocalSearchValue] = useState('')

  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLocalSearchValue('')
    clearFilters()
  }

  // Set debounce callback to implement new search functionality. 
  // Here we are using JS Debounce functionality where we trigger a function (in our case "handleChange()") only once per use case. This way we won't make unneeded requests. Only once 1 second passed from the last keystroke, we will make an API request to the server
  // NOTE: We cannot use "localSearchValue" as a "value" property because initially it will be an empty string and stay like that (since we are using useMemo()). We only use it for a two-way binding
  const debounce = () => {
    let timeoutID;
    return (e) => {
      setLocalSearchValue(e.target.value)
      clearTimeout(timeoutID)
      timeoutID = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value })
      }, 1000)
    }
  }

  // We need to use "useMemo" to run the debounce() once only to get the callback function from the debounce() one time (when the application loads, not on every render)
  // eslint-disable-next-line
  const debounceHelper = useMemo(() => debounce(), [])

  return (
    <Wrapper>
      <form className='form'>
        <h4>Search Form</h4>
        <div className='form-center'>
          {/* Search by position */}
          <FormRow type='text' name='search' value={localSearchValue} handleChange={debounceHelper} />
          {/* Search by status */}
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          />
          {/* Search by a job type  */}
          <FormRowSelect
            labelText="Job Type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          />
          {/* Sort */}
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button className='btn btn-danger btn-block' disabled={isLoading} onClick={handleSubmit}>clear filters</button>
        </div>
      </form>
    </Wrapper>
  )
}
