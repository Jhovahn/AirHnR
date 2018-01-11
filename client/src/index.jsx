import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import css from './styles/styles.css';
// import 'typeface-roboto';
import { BrowserRouter } from 'react-router-dom';
import ListingDetails from './components/listingDetails.jsx'
<<<<<<< HEAD
=======

import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
// import SearchBar from 'material-ui-search-bar'
// import AutoComplete from 'material-ui/AutoComplete';


>>>>>>> added date functionality
import SearchResults from './components/SearchResults'
import Search from './components/Search.jsx'
import NavBar from './components/NavBar.jsx'
import $ from 'jquery'
import Checkout from './components/Checkout.jsx';



var sampleData = {
  //added city and pool
  beds: 1,
  address: 'Jalan Pantai Kuta, Banjar Pande Mas, Kuta, Kabupaten Badung, Bali 80361, Indonesia',
  city: 'San Francisco',
  id: Number,
  name: 'Beautiful SOMA Condo/Moscone/Downtown',
  price: 300,
  reviews_count: 32,
  room_type: 'Entire loft',
  star_rating: 5,
  image_url: 'https://a0.muscache.com/im/pictures/7ce1579c-4c8b-424c-99cd-23cab046adce.jpg?aki_policy=xx_large',

  bathrooms: 2,
  maxGuests: 2,
  tagline: 'Enjoy your relaxation time from SF life in this newly renovated Dream House decorated with modern artwork and new furniture throughout, walk to EVERYTHING in Downtown / SOMA San Francisco!',
  description: `Enjoy your relaxation time from SF life in this newly renovated Dream House decorated with modern artwork and new furniture throughout, walk to EVERYTHING in Downtown / SOMA San Francisco! The space A bright and beautiful designed home! The the living are is large with tall ceilings which brings in the sunshine accentuate the colors in the space. Towels and Linens are fresh and available for you. Cozy up on a beautiful bed and mattress. Easily work from home with a huge desk in living area ( High-Speed Wi-Fi Available)!`,
  amenities: {
    wifi: true,
    kitchen: true,
    hotTub: false,
    pool: true
  },
  houseRules: {
    pets: false,
    smoking: false,
    checkIn: '3pm',
    checkOut: '12pm',
  },
  cancellation: true,
  host: {
    id: Number,
    name: 'Lucas'
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'default',
      query: '',
      results: [],
      startDate: null,
      endDate: null
    }

    this.searchTerm = this.searchTerm.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleListingClick = this.handleListingClick.bind(this);
     
    }

  searchTerm(term) {
    console.log('value: ', term);
    this.setState({
      query: term 
    });
  }

  handleSearchClick() {
    const options = {
      method: 'GET',
      contentType: "application/json",
      mode: 'cors',
      cache: 'default'
    }
    fetch(`/api/listings?q=${this.state.query}`, options)
    .then((response) => response.json())
    .then((listings) => {
      console.log(listings)
    })
    this.setState({view: 'searchResults'})
  }

  handleListingClick(listingID) {
    // console.log(listingID + ' clicked in App');
    // const options = {
    //   method: 'GET',
    //   contentType: "application/json",
    //   mode: 'cors',
    //   cache: 'default'
    // }
    // fetch(`/api/listing?id=${listingID}`, options)
    //   .then((response) => response.json())
    //   .then((listing) => {
    //     console.log(listing)
    //    this.setState({view: 'listingDetails'})
    // })
    this.setState({view: 'listingDetails'})
  }

  render() {
    const currentView = this.state.view;
    let showPage = null;
    if (currentView === 'searchResults') {
      showPage = <SearchResults handleListingClick={this.handleListingClick} />;
    } else if (currentView === 'listingDetails') {
      showPage = <ListingDetails listing={sampleData} />;
    } else if (currentView === 'checkout') {
      showPage = <Checkout />;
    }

    return (

      <div>
      <NavBar/>
      <br />
      <div>
      <DateRangePicker
        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
      />
      </div>
      <div>

      {/* <SearchBar
        onChange={() => console.log('onChange')}
        onRequestSearch={() => console.log('onRequestSearch')}
        style={{
        margin: '0 auto',
        maxWidth: 800
      }}
    /> */}

      </div>
      {console.log("ready",this.state)}
      <div>
        <Search onClick={this.handleClickFunction}/>
      </div>
      <br/>
      <div>
        <NavBar/>
        <Search searchTerm={this.searchTerm} handleSearchClick={this.handleSearchClick}/>
        <br/>
        <div>
          {showPage}
        </div>
      </div>
    )
  }


}
render(<App />, document.getElementById('app'));