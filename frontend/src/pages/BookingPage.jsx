import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookingPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    time: '',
    participants: 1,
    transportation: false,
    photography: false,
    specialRequests: ''
  });
  const [priceBreakdown, setPriceBreakdown] = useState({
    basePrice: 0,
    transportationFee: 10,
    photographyFee: 15,
    tax: 0,
    total: 0
  });

  useEffect(() => {
    // Simulate fetching service data
    setTimeout(() => {
      const mockService = {
        id: serviceId,
        title: 'Cultural Heritage Tour',
        description: 'Explore ancient temples, traditional crafts, and authentic cuisine with expert local guides.',
        provider: 'Heritage Tours Co.',
        location: 'Kandy, Sri Lanka',
        duration: '6 hours',
        price: 50,
        rating: 4.8,
        image: 'https://via.placeholder.com/600x400',
        included: ['Guided tour', 'Lunch', 'Traditional craft demonstration'],
        highlights: ['Visit ancient temples', 'Learn traditional crafts', 'Authentic cuisine tasting']
      };
      
      setService(mockService);
      setPriceBreakdown(prev => ({
        ...prev,
        basePrice: mockService.price,
        total: mockService.price
      }));
    }, 1000);
  }, [serviceId]);

  useEffect(() => {
    // Update total price when booking details change
    let total = priceBreakdown.basePrice;
    
    if (bookingDetails.transportation) {
      total += priceBreakdown.transportationFee;
    }
    
    if (bookingDetails.photography) {
      total += priceBreakdown.photographyFee;
    }
    
    // Add tax (10%)
    const tax = total * 0.1;
    const grandTotal = total + tax;
    
    setPriceBreakdown(prev => ({
      ...prev,
      tax: parseFloat(tax.toFixed(2)),
      total: parseFloat(grandTotal.toFixed(2))
    }));
  }, [bookingDetails, priceBreakdown.basePrice, priceBreakdown.transportationFee, priceBreakdown.photographyFee]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingDetails(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBookNow = (e) => {
    e.preventDefault();
    
    // Simulate booking process
    alert(`Booking confirmed!\nService: ${service?.title}\nDate: ${bookingDetails.date}\nTotal: $${priceBreakdown.total}`);
    
    // Navigate to booking confirmation page
    navigate('/booking-success');
  };

  if (!service) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading service details...</p>
      </div>
    );
  }

  return (
    <div className="booking-page-container">
      <div className="container">
        <h1>Book Service</h1>
        <p>Complete your booking for {service.title}</p>
        
        <div className="booking-layout">
          <div className="booking-form-section">
            <div className="service-preview">
              <img src={service.image} alt={service.title} />
              <div className="service-info">
                <h2>{service.title}</h2>
                <p className="service-provider">by {service.provider}</p>
                <p className="service-location">{service.location}</p>
                <p className="service-rating">★ {service.rating} • {service.duration}</p>
              </div>
            </div>
            
            <form className="booking-form" onSubmit={handleBookNow}>
              <div className="form-section">
                <h3>Booking Details</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">Select Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={bookingDetails.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="time">Select Time</label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={bookingDetails.time}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="participants">Number of Participants</label>
                  <select
                    id="participants"
                    name="participants"
                    value={bookingDetails.participants}
                    onChange={handleInputChange}
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                    ))}
                  </select>
                </div>
                
                <div className="extras-section">
                  <h4>Additional Services</h4>
                  
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="transportation"
                      name="transportation"
                      checked={bookingDetails.transportation}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="transportation">
                      <strong>Transportation</strong>
                      <span>$10 per person</span>
                    </label>
                  </div>
                  
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="photography"
                      name="photography"
                      checked={bookingDetails.photography}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="photography">
                      <strong>Professional Photography</strong>
                      <span>$15 per session</span>
                    </label>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="specialRequests">Special Requests</label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={bookingDetails.specialRequests}
                    onChange={handleInputChange}
                    placeholder="Any special requests or requirements?"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              
              <button type="submit" className="btn btn-primary btn-full">
                Confirm Booking - ${priceBreakdown.total.toFixed(2)}
              </button>
            </form>
          </div>
          
          <div className="booking-summary-section">
            <div className="price-breakdown">
              <h3>Price Breakdown</h3>
              
              <div className="price-item">
                <span>Base Price</span>
                <span>${priceBreakdown.basePrice.toFixed(2)}</span>
              </div>
              
              {bookingDetails.transportation && (
                <div className="price-item">
                  <span>Transportation</span>
                  <span>${(bookingDetails.participants * priceBreakdown.transportationFee).toFixed(2)}</span>
                </div>
              )}
              
              {bookingDetails.photography && (
                <div className="price-item">
                  <span>Photography</span>
                  <span>${priceBreakdown.photographyFee.toFixed(2)}</span>
                </div>
              )}
              
              <div className="price-item">
                <span>Tax (10%)</span>
                <span>${priceBreakdown.tax.toFixed(2)}</span>
              </div>
              
              <div className="price-total">
                <span>Total</span>
                <span>${priceBreakdown.total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="service-details">
              <h3>What's Included</h3>
              <ul>
                {service.included.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              
              <h3>Highlights</h3>
              <ul>
                {service.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;