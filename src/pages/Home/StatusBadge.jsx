import React from 'react';
import PropTypes from 'prop-types';

const StatusBadge = ({ Icon, href }) => {
     return (
          <a
               href={href}
               target="_blank"
               rel="noopener noreferrer"
               className="d-flex align-items-center justify-content-center bg-light shadow-sm rounded-circle p-3 transition-all hover:bg-primary hover:text-white"
               style={{ width: '50px', height: '50px' }}
          >
               <Icon size={22} />
          </a>
     );
};

StatusBadge.propTypes = {
     Icon: PropTypes.oneOfType([PropTypes.elementType, PropTypes.func]).isRequired,
     href: PropTypes.string.isRequired,
};

export default StatusBadge;
