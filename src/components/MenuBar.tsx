import React from 'react';
import { Card } from './ui/card';

interface MenuBarProps {
  onPostsClick: () => void;
  onReviewsClick: () => void;
  onRecommendationsClick: () => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ onPostsClick, onReviewsClick, onRecommendationsClick }) => {
  return (
    <Card className="flex w-full overflow-hidden">
      <button 
        className="flex-1 text-lg p-4 border-r border-gray-200 hover:bg-gray-100" 
        onClick={onPostsClick}
      >
        Posts
      </button>
      <button 
        className="flex-1 text-lg p-4 border-r border-gray-200 hover:bg-gray-100" 
        onClick={onReviewsClick}
      >
        Reviews
      </button>
      <button 
        className="flex-1 text-lg p-4 hover:bg-gray-100" 
        onClick={onRecommendationsClick}
      >
        Recommendations
      </button>
    </Card>
  );
};

export default MenuBar;
