import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = ({ categories }) => {
    return (
        <aside className="bg-secondary-color p-4 w-1/4">
            <h2 className="font-bold">الفئات</h2>
            <ul>
                {categories.map((category, index) => (
                    <li key={index}>
                        <a 
                            href="#" 
                            className="block py-1 hover:underline"
                            aria-label={`انتقل إلى ${category}`}
                        >
                            {category}
                        </a>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

Sidebar.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Sidebar;