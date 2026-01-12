import React, { useState } from 'react';

const TripPlanner = () => {
  const [tripDetails, setTripDetails] = useState({
    startPoint: '',
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: ''
  });

  const [itinerary, setItinerary] = useState([]);
  const [activeTab, setActiveTab] = useState('planning');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTripDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlanTrip = (e) => {
    e.preventDefault();
    
    // Simulate planning a trip
    const mockItinerary = [
      { day: 1, activities: ['Arrive at destination', 'Check into hotel', 'Evening walk'] },
      { day: 2, activities: ['Morning tour', 'Lunch at local restaurant', 'Afternoon shopping'] },
      { day: 3, activities: ['Full day excursion', 'Evening cultural show'] },
      { day: 4, activities: ['Free morning', 'Departure'] }
    ];
    
    setItinerary(mockItinerary);
    setActiveTab('itinerary');
  };

  return (
    <div className="trip-planner-container">
      <div className="container">
        <h1>Trip Planner</h1>
        <p>Plan your perfect journey with our interactive trip planner</p>
        
        <div className="trip-planner-tabs">
          <button 
            className={`tab-btn ${activeTab === 'planning' ? 'active' : ''}`}
            onClick={() => setActiveTab('planning')}
          >
            Plan Trip
          </button>
          <button 
            className={`tab-btn ${activeTab === 'itinerary' ? 'active' : ''}`}
            onClick={() => setActiveTab('itinerary')}
            disabled={itinerary.length === 0}
          >
            Itinerary
          </button>
          <button 
            className={`tab-btn ${activeTab === 'map' ? 'active' : ''}`}
            onClick={() => setActiveTab('map')}
          >
            Map View
          </button>
        </div>
        
        {activeTab === 'planning' && (
          <div className="trip-planning-form">
            <form onSubmit={handlePlanTrip}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="startPoint">Starting Point</label>
                  <input
                    type="text"
                    id="startPoint"
                    name="startPoint"
                    value={tripDetails.startPoint}
                    onChange={handleInputChange}
                    placeholder="Enter starting location"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="destination">Destination</label>
                  <input
                    type="text"
                    id="destination"
                    name="destination"
                    value={tripDetails.destination}
                    onChange={handleInputChange}
                    placeholder="Enter destination"
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="startDate">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={tripDetails.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="endDate">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={tripDetails.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="travelers">Number of Travelers</label>
                  <select
                    id="travelers"
                    name="travelers"
                    value={tripDetails.travelers}
                    onChange={handleInputChange}
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="budget">Budget Range (USD)</label>
                  <select
                    id="budget"
                    name="budget"
                    value={tripDetails.budget}
                    onChange={handleInputChange}
                  >
                    <option value="">Select budget</option>
                    <option value="0-500">Less than $500</option>
                    <option value="500-1000">$500 - $1000</option>
                    <option value="1000-2000">$1000 - $2000</option>
                    <option value="2000+">$2000+</option>
                  </select>
                </div>
              </div>
              
              <button type="submit" className="btn btn-primary">Plan My Trip</button>
            </form>
            
            <div className="map-placeholder">
              <div className="map-container">
                <p>Interactive Map View</p>
                <p>Enter your locations to see the route and nearby attractions</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'itinerary' && itinerary.length > 0 && (
          <div className="itinerary-view">
            <h2>Your Planned Itinerary</h2>
            <div className="itinerary-days">
              {itinerary.map((day, index) => (
                <div key={index} className="itinerary-day">
                  <h3>Day {day.day}</h3>
                  <ul>
                    {day.activities.map((activity, actIndex) => (
                      <li key={actIndex}>{activity}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="itinerary-actions">
              <button className="btn btn-secondary">Save Itinerary</button>
              <button className="btn btn-outline">Export PDF</button>
              <button className="btn btn-primary">Book Services</button>
            </div>
          </div>
        )}
        
        {activeTab === 'map' && (
          <div className="map-view">
            <h2>Interactive Map</h2>
            <div className="map-container-large">
              <p>Google Maps Integration</p>
              <p>Visualize your route and find nearby services</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripPlanner;