import React, { useState, useEffect } from 'react';

const ServicesMarketplace = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    priceRange: 'all',
    rating: 'all',
    distance: 'all'
  });

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'shopping', name: 'Shopping' },
    { id: 'rental', name: 'Rental' },
    { id: 'volunteer', name: 'Volunteer' },
    { id: 'event', name: 'Events' },
    { id: 'lost-found', name: 'Lost & Found' }
  ];

  // Mock services data
  useEffect(() => {
    const mockServices = [
      {
        id: 1,
        title: 'Vintage Jewelry Collection',
        description: 'Handcrafted vintage jewelry with authentic designs',
        category: 'shopping',
        subcategory: 'jewelry',
        price: 45,
        rating: 4.8,
        reviews: 124,
        location: 'Colombo, Sri Lanka',
        provider: 'Sri Lanka Crafts',
        image: 'https://via.placeholder.com/300x200',
        distance: '0.5 km'
      },
      {
        id: 2,
        title: 'Car Rental Service',
        description: 'Comfortable sedan for city and intercity travel',
        category: 'rental',
        subcategory: 'vehicle',
        price: 50,
        rating: 4.5,
        reviews: 89,
        location: 'Kandy, Sri Lanka',
        provider: 'ABC Rentals',
        image: 'https://via.placeholder.com/300x200',
        distance: '12 km'
      },
      {
        id: 3,
        title: 'Cultural Tour Guide',
        description: 'Expert guide for temple and cultural site visits',
        category: 'volunteer',
        subcategory: 'tourism',
        price: 30,
        rating: 4.9,
        reviews: 210,
        location: 'Galle, Sri Lanka',
        provider: 'Local Guides Co.',
        image: 'https://via.placeholder.com/300x200',
        distance: '3.2 km'
      },
      {
        id: 4,
        title: 'Yoga Retreat Weekend',
        description: 'Rejuvenating yoga sessions in nature',
        category: 'event',
        subcategory: 'wellness',
        price: 120,
        rating: 4.7,
        reviews: 67,
        location: 'Unawatuna, Sri Lanka',
        provider: 'Serenity Yoga',
        image: 'https://via.placeholder.com/300x200',
        distance: '8.7 km',
        date: '2024-02-15'
      },
      {
        id: 5,
        title: 'Antique Silver Ornaments',
        description: 'Rare antique silver pieces from the colonial era',
        category: 'shopping',
        subcategory: 'ornaments',
        price: 80,
        rating: 4.6,
        reviews: 54,
        location: 'Kandy, Sri Lanka',
        provider: 'Heritage Collectibles',
        image: 'https://via.placeholder.com/300x200',
        distance: '15 km'
      }
    ];
    
    setServices(mockServices);
    setFilteredServices(mockServices);
  }, []);

  useEffect(() => {
    let result = services;

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(service => service.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(service =>
        service.title.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.provider.toLowerCase().includes(query)
      );
    }

    // Apply other filters
    if (filters.priceRange !== 'all') {
      if (filters.priceRange === 'low') {
        result = result.filter(service => service.price <= 25);
      } else if (filters.priceRange === 'medium') {
        result = result.filter(service => service.price > 25 && service.price <= 75);
      } else if (filters.priceRange === 'high') {
        result = result.filter(service => service.price > 75);
      }
    }

    if (filters.rating !== 'all') {
      const minRating = parseInt(filters.rating);
      result = result.filter(service => service.rating >= minRating);
    }

    setFilteredServices(result);
  }, [services, selectedCategory, searchQuery, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="services-marketplace-container">
      <div className="container">
        <h1>Services Marketplace</h1>
        <p>Discover local services, rentals, events, and more</p>
        
        <div className="marketplace-filters">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search services, providers, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-search">Search</button>
          </div>
          
          <div className="filter-options">
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            
            <select 
              value={filters.priceRange} 
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="low">Under $25</option>
              <option value="medium">$25 - $75</option>
              <option value="high">Over $75</option>
            </select>
            
            <select 
              value={filters.rating} 
              onChange={(e) => handleFilterChange('rating', e.target.value)}
            >
              <option value="all">All Ratings</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
            </select>
          </div>
        </div>
        
        <div className="services-grid">
          {filteredServices.map(service => (
            <div key={service.id} className="service-card">
              <div className="service-image">
                <img src={service.image} alt={service.title} />
                <div className="service-category-badge">
                  {service.subcategory || service.category}
                </div>
              </div>
              
              <div className="service-details">
                <h3>{service.title}</h3>
                <p className="service-description">{service.description}</p>
                
                <div className="service-meta">
                  <div className="provider-info">
                    <span className="provider-name">{service.provider}</span>
                    <span className="location">{service.location}</span>
                  </div>
                  
                  <div className="service-stats">
                    <span className="rating">
                      ★ {service.rating} ({service.reviews})
                    </span>
                    <span className="distance">{service.distance}</span>
                  </div>
                </div>
                
                <div className="service-footer">
                  <div className="price">${service.price}<span>/service</span></div>
                  <button className="btn btn-primary">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredServices.length === 0 && (
          <div className="no-results">
            <h3>No services found</h3>
            <p>Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesMarketplace;