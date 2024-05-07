import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Daily.css';

const Daily = ({ day, handleSubmmit }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [outfits, setOutfits] = useState([]);
    const [selectedOutfitIndex, setSelectedOutfitIndex] = useState(0);

    useEffect(() => {
        const fetchOutfitsForDay = async () => {
            try {
                const response = await axios.get(`${apiUrl}user/clothings/aed01e26-1d1b-479e-a2aa-c8acc92f03c0`);
                setOutfits(response.data.outfits);
            } catch (error) {
                console.error('Error fetching outfits for the day:', error);
            }
        };

        fetchOutfitsForDay();
    }, [apiUrl]);


    const handleSelectOutfit = (index) => {
        setSelectedOutfitIndex(index);
    };

    return (
        <div className='daily-container'>
            <h3>Outfits for {day.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
            <div className='outfit-list'>
                {outfits.map((outfit, index) => (
                    <div
                        key={index}
                        className={`outfit-item ${index === selectedOutfitIndex ? 'selected' : ''}`}
                        onClick={() => handleSelectOutfit(index)}
                    >
                        <img src={`data:image/jpeg;base64,${outfit.image}`} alt={`Outfit ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Daily;
