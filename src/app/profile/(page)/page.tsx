"use client"
import React, { useState, useEffect } from 'react';
import ProfilePicture from '../ProfilePicture';
import { ProfileNavbar } from '../ProfileNavbar';
// import { TopNavBar } from './TopNavBar'; // This line is commented out as we no longer use TopNavBar
import MenuBar from '@/components/MenuBar';
import CreatePost from '../CreatePost';
type Props = {};

const Page = (props: Props) => {
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll event
    const handleScroll = () => {
        const scrolled = window.scrollY > 200;
        setIsScrolled(scrolled);
    };

    // Add and remove event listener for scroll
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Define dummy functions for MenuBar click events, adjust as necessary
    const handlePostsClick = () => console.log("Posts clicked");
    const handleReviewsClick = () => console.log("Reviews clicked");
    const handleRecommendationsClick = () => console.log("Recommendations clicked");

    return (
        <div style={{ minHeight: '150vh' }}>
            <div className="flex items-start relative ml-96">
                <div className="flex-none">
                    <ProfilePicture />
                </div>
                <div className="flex-grow ml-5 mr-5 mt-5">
                    {/* Replacing TopNavBar with MenuBar */}
                    <MenuBar 
                        onPostsClick={handlePostsClick} 
                        onReviewsClick={handleReviewsClick} 
                        onRecommendationsClick={handleRecommendationsClick} 
                    />
                    <CreatePost title={'Create Post'}/>
                </div>
            </div>
            {isScrolled && (
                <div>
                    <ProfileNavbar />
                </div>
            )}
        </div>
    );
};

export default Page;
