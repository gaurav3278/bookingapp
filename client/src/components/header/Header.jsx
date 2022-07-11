import './header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendarDays, faCar, faPeopleGroup, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range'
import { useState } from 'react'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

const Header = ({ type }) => {
    const [destination, setDestination] = useState("")
    const [openDate, setOpenDate] = useState(false)
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [openOption, setOpenOption] = useState(false)
    const [options, setOptions] = useState({
        adults: 0,
        children: 0,
        rooms: 0
    })

    const navigate = useNavigate();
    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
            }
        })
    }

    const handleSearch = () => {
        navigate('/hotels', { state: { destination, date, options } })
    }

    return (
        <div className="header">
            <div className={type === 'list' ? 'headerContainer listMode' : 'headerContainer'}>
                <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car Rentals</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPeopleGroup} />
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport Taxis</span>
                    </div>
                </div>
                {type !== 'list' &&
                    <>
                        <h1 className="headerTitle">
                            A lifetime of discounts? It's Genius.
                        </h1>
                        <p className="headerDesc">
                            Get rewarded for your travels – unlock instant savings of 10% or
                            more with a free Lamabooking account
                        </p>
                        <button className="headerBtn">Sign in / Register</button>
                        <div className="headerSearch">
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faBed} className='headerIcon' />
                                <input type="text"
                                    placeholder='Where are you going?'
                                    className="headerSearchInput 1"
                                    onChange={e => setDestination(e.target.value)} />
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
                                <span className="headerSearchText" onClick={() => setOpenDate(!openDate)}>{`${format(date[0].startDate, 'dd/MM/yyyy')} to ${format(date[0].endDate, 'dd/MM/yyyy')}`}</span>
                                {openDate && <DateRange
                                    editableDateInputs={true}
                                    onChange={item => setDate([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    minDate = {new Date()}
                                    ranges={date}
                                    className='date'
                                />}
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faPerson} className='headerIcon' />
                                <span onClick={() => setOpenOption(!openOption)} className="headerSearchText">{`${options.adults} Adults · ${options.children}  Children · ${options.rooms} Rooms`}</span>
                                {openOption && (<div className="option">
                                    <div className="optionItem">
                                        <span className="optionText">Adults</span>
                                        <div className="optionCounter">
                                            <button
                                                disabled={options.adults < 1}
                                                className='optionCounterButton'
                                                onClick={() => handleOption("adults", "d")}
                                            >
                                                -
                                            </button>
                                            <span className="optionCounterNumber">{options.adults}</span>
                                            <button
                                                className='optionCounterButton'
                                                onClick={() => handleOption("adults", "i")}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="optionItem">
                                        <span className="optionText">Childrens</span>
                                        <div className="optionCounter">
                                            <button
                                                disabled={options.children < 1}
                                                className='optionCounterButton'
                                                onClick={() => handleOption("children", "d")}
                                            >
                                                -
                                            </button>
                                            <span className="optionCounterNumber">{options.children}</span>
                                            <button
                                                className='optionCounterButton'
                                                onClick={() => handleOption("children", "i")}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="optionItem">
                                        <span className="optionText">Rooms</span>
                                        <div className="optionCounter">
                                            <button
                                                disabled={options.rooms < 1}
                                                className='optionCounterButton'
                                                onClick={() => handleOption("rooms", "d")}
                                            >
                                                -
                                            </button>
                                            <span className="optionCounterNumber">{options.rooms}</span>
                                            <button
                                                className='optionCounterButton'
                                                onClick={() => handleOption("rooms", "i")}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>)}
                            </div>
                            <div className="headerSearchItem">
                                <button className="headerBtn" onClick={handleSearch}>Search</button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Header