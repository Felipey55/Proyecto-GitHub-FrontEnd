import React, { useState } from 'react';
import axios from 'axios';
import './FlightSearch.css';

function FlightSearch() {
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        origin: '',
        destination: '',
        maxPrice: '',
        classType: '',
        typeLuggage :''
    });
    const [flights, setFlights] = useState([]);
    const [filters, setFilters] = useState({
        filterByOrigin: false,
        filterByDestination: false,
        filterByMaxPrice: false,
        filterByClassType: false,
        filterByTypeLuggage: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFilters({ ...filters, [name]: checked });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const searchFlights = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/flights/search', {
                params: {
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                    origin: filters.filterByOrigin ? formData.origin : '',
                    destination: filters.filterByDestination ? formData.destination : '',
                    maxPrice: filters.filterByMaxPrice ? formData.maxPrice : '',
                    classType: filters.filterByClassType ? formData.classType : '',
                    typeLuggage: filters.filterByTypeLuggage ? formData.typeLuggage : ''
                }
            });
            setFlights(response.data);
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    };

    return (
        <div className="container">
            <h2>Search Flights</h2>
            <form onSubmit={(e) => { e.preventDefault(); searchFlights(); }}>

                <label>Start Date:
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} />
                </label>
                <br />

                <label>End Date:
                    <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} />
                </label>
                <br />

                <label>
                    <input type="checkbox" name="filterByOrigin" checked={filters.filterByOrigin} onChange={handleInputChange} />
                    Filter by Origin
                </label>
                {filters.filterByOrigin && (
                    <input type="text" name="origin" placeholder="Enter Origin" value={formData.origin} onChange={handleInputChange} />
                )}
                <br />

                <label>
                    <input type="checkbox" name="filterByDestination" checked={filters.filterByDestination} onChange={handleInputChange} />
                    Filter by Destination
                </label>
                {filters.filterByDestination && (
                    <input type="text" name="destination" placeholder="Enter Destination" value={formData.destination} onChange={handleInputChange} />
                )}
                <br />

                <label>
                    <input type="checkbox" name="filterByMaxPrice" checked={filters.filterByMaxPrice} onChange={handleInputChange} />
                    Filter by Max Price
                </label>
                {filters.filterByMaxPrice && (
                    <input type="number" name="maxPrice" placeholder="Enter Max Price" value={formData.maxPrice} onChange={handleInputChange} />
                )}
                <br />

                <label>
                    <input type="checkbox" name="filterByClassType" checked={filters.filterByClassType} onChange={handleInputChange} />
                    Filter by Class Type
                </label>
                {filters.filterByClassType && (
                    <input type="text" name="classType" placeholder="Enter Class Type" value={formData.classType} onChange={handleInputChange} />
                )}
                <br />


                <label>
                    <input type="checkbox" name="filterByTypeLuggage" checked={filters.filterByTypeLuggage} onChange={handleInputChange} />
                    Filter by Type Luggage
                </label>
                {filters.filterByTypeLuggage && (
                    <input type="text" name="typeLuggage" placeholder="Enter Type Luggage" value={formData.typeLuggage} onChange={handleInputChange} />
                )}
                <br />

                

                <button type="submit">Search Flights</button>
            </form>

            <div>
                <h3>Available Flights</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Origin</th>
                            <th>Destination</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Class Type</th>
                            <th>Type Luggage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flights.length > 0 ? flights.map(flight => (
                            <tr key={flight.id}>
                                <td>{flight.origin}</td>
                                <td>{flight.destination}</td>
                                <td>{flight.date}</td>
                                <td>${flight.price}</td>
                                <td>{flight.classType}</td>
                                <td>{flight.typeLuggage}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4">No flights found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default FlightSearch;
