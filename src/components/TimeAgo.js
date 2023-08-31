import React, { useEffect, useState } from "react";

const TimeAgo = ({ timestamp }) => {
    const [timeAgo, setTimeAgo] = useState('');

    useEffect(() => {
        const updateTimeAgo = () => {
            const currentTime = new Date();
            const diff = currentTime - new Date(timestamp);
            const seconds = Math.floor(diff / 1000);

            if (seconds < 10) {
                setTimeAgo('Just Now');
            } else if (seconds < 60) {
                setTimeAgo('Less than 1 min ago');
            } else if (seconds < 3600) {
                const minutes = Math.floor(seconds / 60);
                setTimeAgo(`${minutes} min ago`);
            } else if (seconds < 86400) {
                const hours = Math.floor(seconds / 3600);
                setTimeAgo(`${hours} hr ago`);
            } else if (seconds < 604800) {
                const days = Math.floor(seconds / 86400);
                setTimeAgo(`${days} day${days > 1 ? 's' : ''} ago`);
            } else if (seconds < 1209600) {
                setTimeAgo('1 week ago');
            } else if (seconds < 2592000) {
                const weeks = Math.floor(seconds / 604800);
                setTimeAgo(`${weeks} week${weeks > 1 ? 's' : ''} ago`);
            } else if (seconds < 5184000) {
                setTimeAgo('1 month ago');
            } else if (seconds < 31536000) {
                const months = Math.floor(seconds / 2592000);
                setTimeAgo(`${months} month${months > 1 ? 's' : ''} ago`);
            } else {
                const years = Math.floor(seconds / 31536000);
                setTimeAgo(`${years} yr${years > 1 ? 's' : ''} ago`);
            }
        };

        updateTimeAgo();

        const interval = setInterval(updateTimeAgo, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [timestamp]);

    return <span>{timeAgo}</span>;
}

export default TimeAgo
