import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import './list.css'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/serachItem/SearchItem'
const List = () => {
  const location = useLocation()
  const [destination, setDestination] = useState(location.state.destination)
  const [date, setdate] = useState(location.state.date)
  const [openDate, setOpenDate] = useState(false)
  const [options, setOptions] = useState(location.state.options)
  return (
    <div>
      <Navbar />
      <Header type='list' />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="isTitle">Search</h1>
            <div className="isItem">
              <label>Destination</label>
              <input placeholder={destination} type='text' />
            </div>
            <div className="isItem">
              <label>Check-in Date </label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(date[0].startDate, 'dd/MM/yyyy')} to ${format(date[0].endDate, 'dd/MM/yyyy')}`}</span>
              {openDate && (<DateRange onChange={(item) => setdate([item.selection])}
                minDate={new Date()}
                ranges={date} />)}
            </div>
            <div className="isItem">
              <label>Options</label>
              <div className="isOptions">

                <div className="OptionItem">
                  <span className="isOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className='isOptionInput' />
                </div>
                <div className="OptionItem">
                  <span className="isOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className='isOptionInput' />
                </div>
                <div className="OptionItem">
                  <span className='isOptionText'>Adult</span>
                  <input type="number" className='isOptionInput' min={0} placeholder={options.adult} />
                </div>
                <div className="OptionItem">
                  <span className='isOptionText'>Children</span>
                  <input type="number" className='isOptionInput' min={0} placeholder={options.children} />
                </div>
                <div className="OptionItem">
                  <span className='isOptionText'>Rooms</span>
                  <input type="number" className='isOptionInput' min={0} placeholder={options.room} />
                </div>
              </div>
            </div>
            <button>Search</button>
          </div>
          <div className="listResult">
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default List