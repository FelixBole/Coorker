import React from 'react'

import styles from './card-close-btn.module.scss';

type Props = {
    deleteFc: () => void;
}

const CardCloseBtn = ({deleteFc}: Props) => {
  return (
		<div
			className={styles.closeBtn}
			onClick={() => {
				deleteFc();
			}}
		>
            <div>
                <div>
                    <span></span>
                    <span></span>
                </div>
            </div>
		</div>
	);
}

export default CardCloseBtn