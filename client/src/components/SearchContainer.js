import React, { useState, useMemo } from 'react'
import { FormRow, FormRowSelect } from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'

export default function SearchContainer() {
  const { isLoading, search, searchStatus, searchType, sort, sortOptions, handleChange, clearFilters, jobTypeOptions, statusOptions } = useAppContext()

  const [localSearchValue, setLocalSearchValue] = useState('')

  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    clearFilters()
  }

  // const debounce = () => {

  // }

  return (
    <Wrapper>
      <form className='form'>
        <h4>Search Form</h4>
        <div className='form-center'>
          {/* Search by position */}
          <FormRow type='text' name='search' value={localSearchValue} handleChange={(e) => setLocalSearchValue(e.target.value)} />
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
