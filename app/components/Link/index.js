/**
*
* Link
*
*/

import React from 'react';
import FontAwesome from 'react-fontawesome';
import styles from './styles.css';

function Link({ link }) {
  return (
    <div className={styles.link}>
      <div className={styles.iconContainer}>
        <FontAwesome
          className={styles.icon}
          name={'link'}
        />
      </div>
      <div
        className={styles.detailsContainer}
      >
        <div>
          <a
            href={link.url}
            className={styles.linkAnchor}
          >
            {link.url}
          </a>
        </div>
        <div
          className={styles.description}
        >
          {link.description}
        </div>
      </div>
    </div>
  );
}

Link.propTypes = {
  link: React.PropTypes.shape({
    voteCount: React.PropTypes.number.isRequired,
    description: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
  }),
};

export default Link;
